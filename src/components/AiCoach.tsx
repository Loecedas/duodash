import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { UserData } from '../types';
import { analyzeUserStats } from '../services/geminiService';
import { AppIcon, type IconMode } from './icons/AppIcon';

interface AiCoachProps {
  userData: UserData;
  iconMode: IconMode;
}

export function AiCoach({ userData, iconMode }: AiCoachProps): React.ReactElement {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shouldAutoFetch, setShouldAutoFetch] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const isMountedRef = useRef(true);
  const hasAutoFetchedRef = useRef(false);
  const hasAnalysis = Boolean(analysis);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const refreshAnalysis = useCallback(async (preservePrevious: boolean) => {
    if (!isMountedRef.current) return;

    setLoading(true);

    try {
      const result = await analyzeUserStats(userData);
      if (!isMountedRef.current) return;
      setAnalysis(result);
    } catch {
      if (!isMountedRef.current) return;
      if (preservePrevious && hasAnalysis) return;
      setAnalysis('刷新失败，请稍后重试。');
    } finally {
      if (!isMountedRef.current) return;
      setLoading(false);
    }
  }, [hasAnalysis, userData]);

  useEffect(() => {
    if (!userData || !shouldAutoFetch || hasAutoFetchedRef.current) return;
    hasAutoFetchedRef.current = true;

    let cancelled = false;

    async function fetchAnalysis(): Promise<void> {
      if (cancelled) return;
      await refreshAnalysis(false);
    }

    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
    }).requestIdleCallback;
    const cic = (window as unknown as {
      cancelIdleCallback?: (id: number) => void
    }).cancelIdleCallback;

    if (ric) {
      const idleId = ric(() => void fetchAnalysis(), { timeout: 1500 });
      return () => {
        cancelled = true;
        cic?.(idleId);
      };
    }

    const timerId = window.setTimeout(() => void fetchAnalysis(), 300);
    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
    };
  }, [refreshAnalysis, shouldAutoFetch, userData]);

  useEffect(() => {
    if (shouldAutoFetch) return;

    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldAutoFetch(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldAutoFetch]);

  return (
    <div
      ref={rootRef}
      className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-700">
          <AppIcon name="owl" mode={iconMode} size="md" className="text-[#58cc02]" />
          <span>Duo 老师的点评</span>
        </h2>
        {loading && <span className="text-xs font-medium text-gray-500">刷新中...</span>}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="hidden flex-shrink-0 sm:block">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm">
              <img
                src="/duo-ai-coach.svg"
                alt="Duo"
                width="64"
                height="64"
                decoding="async"
                fetchPriority="high"
                className={`h-16 w-16 ${loading ? 'animate-bounce' : ''}`}
              />
            </div>
          </div>

          <div className="relative flex-1">
            {hasAnalysis ? (
              <div
                className={`prose prose-sm max-w-none min-h-[116px] text-gray-600 transition-opacity prose-headings:text-gray-700 prose-p:leading-8 prose-p:text-gray-600 ${loading ? 'opacity-75' : ''}`}
              >
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            ) : loading ? (
              <div className="min-h-[116px]">
              </div>
            ) : (
              <div className="min-h-[116px] text-sm leading-8 text-gray-500">
                暂无点评。
              </div>
            )}

            {loading && hasAnalysis && (
              <div className="pointer-events-none absolute inset-0 rounded-lg bg-white/30" />
            )}
          </div>
        </div>

        <div className="mt-auto pt-4 min-h-[60px]">
          <button
            onClick={() => void refreshAnalysis(true)}
            disabled={loading}
            className="w-full rounded-xl border-b-4 border-[#1480b3] bg-[#1cb0f6] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#1899d6] active:translate-y-1 active:border-b-0 disabled:opacity-50 sm:w-auto"
          >
            {loading ? '刷新中...' : '刷新点评'}
          </button>
        </div>
      </div>
    </div>
  );
}
