import React, { useEffect, useRef } from 'react';

interface NavbarProps {
  loading: boolean;
  lastUpdated: number | null;
  isStale?: boolean; // 数据是否可能过期（来自缓存）
  onRefresh: () => void;
  onShare?: () => void;
  themeMode: 'light' | 'dark' | 'system';
  onThemeChange: (mode: 'light' | 'dark' | 'system') => void;
}

function getUpdateStatusText(loading: boolean, lastUpdated: number | null, isStale?: boolean): string {
  if (loading) return '正在更新…';
  if (lastUpdated) {
    const timeStr = new Date(lastUpdated).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    // 检查数据是否超过 30 分钟
    const isOld = Date.now() - lastUpdated > 30 * 60 * 1000;
    if (isStale || isOld) {
      return `缓存数据 (${timeStr})`;
    }
    return `更新于 ${timeStr}`;
  }
  return '尚未更新';
}

export function Navbar({ loading, lastUpdated, isStale, onRefresh, onShare, themeMode, onThemeChange }: NavbarProps): React.ReactElement {
  const themeMenuRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!themeMenuRef.current || themeMenuRef.current.contains(target)) return;
      themeMenuRef.current.removeAttribute('open');
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleThemeSelect(mode: 'light' | 'dark' | 'system') {
    onThemeChange(mode);
    themeMenuRef.current?.removeAttribute('open');
  }

  return (
    <nav className="bg-white border-b-2 border-gray-200 sticky top-0 z-50" aria-label="主导航">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <img src="/duo-owl.svg" alt="Duo Owl" className="w-8 h-8 rounded-lg" />
            <span className="font-extrabold text-2xl text-[#58cc02] tracking-tight hidden sm:block">DuoDash</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className={`text-xs font-semibold ${isStale ? 'text-amber-600' : 'text-gray-600'}`} aria-live="polite">
                {getUpdateStatusText(loading, lastUpdated, isStale)}
              </span>
            </div>
            <details ref={themeMenuRef} className="relative" aria-label="主题切换">
              <summary className="list-none flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors cursor-pointer">
                <span className="text-base" role="img" aria-hidden="true">🎨</span>
                <span className="hidden sm:inline font-semibold text-gray-700 text-sm">主题</span>
                <span className="hidden sm:inline text-xs text-gray-500">
                  {themeMode === 'light' ? '浅色' : themeMode === 'dark' ? '深色' : '跟随系统'}
                </span>
                <span className="text-xs text-gray-500" aria-hidden="true">▾</span>
              </summary>
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white border border-gray-200 shadow-sm p-1 z-50">
                <button
                  onClick={() => handleThemeSelect('light')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${themeMode === 'light'
                    ? 'bg-[#1cb0f6] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  aria-pressed={themeMode === 'light'}
                >
                  <span className="inline-flex items-center justify-center w-4 h-4" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 3v2" />
                      <path d="M12 19v2" />
                      <path d="M3 12h2" />
                      <path d="M19 12h2" />
                      <path d="M5.6 5.6l1.4 1.4" />
                      <path d="M17 17l1.4 1.4" />
                      <path d="M5.6 18.4l1.4-1.4" />
                      <path d="M17 7l1.4-1.4" />
                    </svg>
                  </span>
                  浅色
                </button>
                <button
                  onClick={() => handleThemeSelect('dark')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${themeMode === 'dark'
                    ? 'bg-[#1cb0f6] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  aria-pressed={themeMode === 'dark'}
                >
                  <span className="inline-flex items-center justify-center w-4 h-4" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.7 2.3c.4 0 .6.5.3.8A7.5 7.5 0 0 0 19 15.5c.3-.3.8-.1.8.3A9 9 0 1 1 12.7 2.3z" />
                    </svg>
                  </span>
                  深色
                </button>
                <button
                  onClick={() => handleThemeSelect('system')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${themeMode === 'system'
                    ? 'bg-[#1cb0f6] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  aria-pressed={themeMode === 'system'}
                >
                  <span className="inline-flex items-center justify-center w-4 h-4" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="12" rx="2" />
                      <path d="M8 20h8" />
                      <path d="M12 16v4" />
                    </svg>
                  </span>
                  跟随系统
                </button>
              </div>
            </details>
            {onShare && (
              <button
                onClick={onShare}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors"
                title="分享卡片"
                aria-label="分享卡片"
              >
                <span className="text-base" role="img" aria-hidden="true">📤</span>
                <span className="hidden sm:inline font-semibold text-gray-700 text-sm">分享</span>
              </button>
            )}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="刷新数据"
              aria-label={loading ? '正在刷新数据' : '刷新数据'}
            >
              <span className={`text-base ${loading ? 'animate-spin' : ''}`} role="img" aria-hidden="true">🔄</span>
              <span className="hidden sm:inline font-semibold text-gray-700 text-sm">刷新</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
