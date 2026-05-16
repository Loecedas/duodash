import React, { useEffect, useRef } from 'react';
import { AppIcon, type IconMode } from '../icons/AppIcon';

interface NavbarProps {
  loading: boolean;
  lastUpdated: number | null;
  isStale?: boolean;
  onRefresh: () => void;
  onShare?: () => void;
  themeMode: 'light' | 'dark' | 'system';
  onThemeChange: (mode: 'light' | 'dark' | 'system') => void;
  iconMode: IconMode;
  onIconModeToggle: () => void;
}

function getUpdateStatusText(loading: boolean, lastUpdated: number | null, isStale?: boolean): string {
  if (loading) return '正在更新…';
  if (lastUpdated) {
    const timeStr = new Date(lastUpdated).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const isOld = Date.now() - lastUpdated > 30 * 60 * 1000;
    if (isStale || isOld) {
      return `缓存数据 (${timeStr})`;
    }
    return `更新于 ${timeStr}`;
  }
  return '尚未更新';
}

export function Navbar({
  loading,
  lastUpdated,
  isStale,
  onRefresh,
  onShare,
  themeMode,
  onThemeChange,
  iconMode,
  onIconModeToggle,
}: NavbarProps): React.ReactElement {
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

  const iconToggleLabel = iconMode === 'emoji' ? 'SVG' : 'Emoji';
  const iconToggleTitle = iconMode === 'emoji' ? '切换为 SVG 图标' : '切换为 Emoji 图标';

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-gray-200 bg-white" aria-label="主导航">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center gap-2">
            <img src="/duo-owl.svg" alt="Duo Owl" className="h-8 w-8 rounded-lg" />
            <span className="hidden text-2xl font-extrabold tracking-tight text-[#58cc02] sm:block">DuoDash</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden flex-col items-end leading-tight sm:flex">
              <span className={`text-xs font-semibold ${isStale ? 'text-amber-600' : 'text-gray-600'}`} aria-live="polite">
                {getUpdateStatusText(loading, lastUpdated, isStale)}
              </span>
            </div>
            <details ref={themeMenuRef} className="relative" aria-label="主题切换">
              <summary className="list-none cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 transition-colors hover:bg-gray-100">
                <span className="flex items-center gap-1.5">
                  <AppIcon name="palette" mode={iconMode} className="text-gray-700" />
                  <span className="hidden text-sm font-semibold text-gray-700 sm:inline">主题</span>
                  <span className="hidden text-xs text-gray-500 sm:inline">
                    {themeMode === 'light' ? '浅色' : themeMode === 'dark' ? '深色' : '跟随系统'}
                  </span>
                  <span className="text-xs text-gray-500" aria-hidden="true">▾</span>
                </span>
              </summary>
              <div className="absolute right-0 z-50 mt-2 w-36 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                <button
                  onClick={() => handleThemeSelect('light')}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm font-semibold transition-colors ${
                    themeMode === 'light' ? 'bg-[#1cb0f6] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={themeMode === 'light'}
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center" aria-hidden="true">
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
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm font-semibold transition-colors ${
                    themeMode === 'dark' ? 'bg-[#1cb0f6] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={themeMode === 'dark'}
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.7 2.3c.4 0 .6.5.3.8A7.5 7.5 0 0 0 19 15.5c.3-.3.8-.1.8.3A9 9 0 1 1 12.7 2.3z" />
                    </svg>
                  </span>
                  深色
                </button>
                <button
                  onClick={() => handleThemeSelect('system')}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm font-semibold transition-colors ${
                    themeMode === 'system' ? 'bg-[#1cb0f6] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={themeMode === 'system'}
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center" aria-hidden="true">
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
                className="flex h-[2.375rem] items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 transition-colors hover:bg-gray-100"
                title="分享卡片"
                aria-label="分享卡片"
              >
                <AppIcon name="share" mode={iconMode} className="text-gray-700" />
                <span className="hidden text-sm font-semibold text-gray-700 sm:inline">分享</span>
              </button>
            )}
            <button
              onClick={onIconModeToggle}
              className="flex h-[2.375rem] w-[5.8rem] items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 transition-colors hover:bg-gray-100"
              title={iconToggleTitle}
              aria-label={iconToggleTitle}
            >
              <AppIcon name={iconMode === 'emoji' ? 'shapes' : 'smile'} mode={iconMode} className="text-gray-700" />
              <span className="hidden text-sm font-semibold text-gray-700 sm:inline">{iconToggleLabel}</span>
            </button>
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex h-[2.375rem] items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              title="刷新数据"
              aria-label={loading ? '正在刷新数据' : '刷新数据'}
            >
              <AppIcon name="refresh" mode={iconMode} className={`text-gray-700 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden text-sm font-semibold text-gray-700 sm:inline">刷新</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
