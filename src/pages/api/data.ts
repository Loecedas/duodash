import type { APIRoute } from 'astro';
import type { CacheEntry, UserData } from '../../types';
import { transformDuolingoData } from '../../services/duolingoService';
import { getEnv, jsonResponse, createAuthChecker } from '../../utils/api-helpers';
import { writeFileSync } from 'node:fs';

export const prerender = false;

const DUOLINGO_BASE_URL = 'https://www.duolingo.com';
const CACHE_TTL = 30 * 60 * 1000;
const MAX_CACHE_SIZE = 100;
const DEFAULT_TIMEOUT = 10000;

const cache = new Map<string, CacheEntry<UserData>>();

const checkToken = createAuthChecker(() => getEnv('API_SECRET_TOKEN'));

async function fetchWithTimeout(url: string, headers: HeadersInit, timeoutMs = DEFAULT_TIMEOUT, options: RequestInit = {}): Promise<{ data: unknown; status: number; text?: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers,
      signal: controller.signal,
      ...options
    });
    clearTimeout(timeoutId);
    const text = await res.text();
    let data = null;
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
    return { data, status: res.status, text: text.substring(0, 1000) };
  } catch (err: any) {
    clearTimeout(timeoutId);
    return { data: null, status: 0, text: err.message };
  }
}

export const GET: APIRoute = async ({ request }) => {
  if (!checkToken(request)) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  const username = getEnv('DUOLINGO_USERNAME');
  const jwt = getEnv('DUOLINGO_JWT');

  if (!username) {
    return jsonResponse({ error: 'Not configured' }, 400);
  }

  const url = new URL(request.url);
  const forceRefresh = url.searchParams.get('force') === 'true';

  const cacheKey = `user:${username}`;
  const cached = cache.get(cacheKey);
  if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return jsonResponse({ data: cached.data, cached: true }, 200, { cacheControl: 'private, max-age=60' });
  }

  const publicHeaders: HeadersInit = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Referer': 'https://www.duolingo.com/',
  };

  const cleanJwt = jwt ? jwt.trim() : '';
  const decodedJwt = cleanJwt ? (() => { try { return decodeURIComponent(cleanJwt); } catch { return cleanJwt; } })() : '';

  const authHeaders: HeadersInit = decodedJwt
    ? {
      ...publicHeaders,
      'Cookie': `jwt_token=${decodedJwt}`,
      'Referer': 'https://www.duolingo.com/learn',
      'Origin': 'https://www.duolingo.com',
    }
    : publicHeaders;

  try {
    // 1. 获取公开基础数据
    const v2Url = `${DUOLINGO_BASE_URL}/2017-06-30/users?username=${username}`;
    const v2Result = await fetchWithTimeout(v2Url, publicHeaders);

    const v2Raw = v2Result.data as any;
    const publicData = v2Raw?.users?.[0] || (v2Raw && !v2Raw.users ? v2Raw : null);

    if (!publicData) {
      return jsonResponse({ error: `Failed to fetch user data. Duolingo returned status ${v2Result.status}` }, 500);
    }

    let userData: any = { ...publicData };
    const userId = publicData.id || publicData.user_id;

    // 如果配置了 JWT，尝试获取 XP 历史
    if (decodedJwt && userId) {
      const xpResult = await fetchWithTimeout(
        `${DUOLINGO_BASE_URL}/2017-06-30/users/${userId}/xp_summaries?startDate=1970-01-01`,
        authHeaders,
        12000
      );

      if (xpResult.status === 200 && xpResult.data) {
        userData._xpSummaries = (xpResult.data as any).summaries;
      }

      /**
       * 注意：Duolingo 已加强 API 安全校验。
       * 目前 gems(钻石) 和 tier(联赛) 字段在公开接口已不可见，且在服务端直接访问认证路径常会被拦截。
       * 故目前 dashboard 优先显示 site_streak, courses 等公开数据，gems 和 league 暂按降级显示处理。
       */
    }

    const transformed = transformDuolingoData(userData);

    if (cache.size >= MAX_CACHE_SIZE) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey) cache.delete(oldestKey);
    }
    cache.set(cacheKey, { data: transformed, timestamp: Date.now() });

    return jsonResponse({ data: transformed }, 200, { cacheControl: 'private, max-age=60' });

  } catch (error: unknown) {
    console.error(`[FATAL] Global Error:`, error);
    return jsonResponse({ error: 'Internal Server Error' }, 500);
  }
};
