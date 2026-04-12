import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import type { UserData } from '../../types';
import { MilestoneCard, WeeklySummaryCard } from './cards';
import { useScreenshot } from './useScreenshot';
import { AppIcon, type IconMode } from '../icons/AppIcon';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
  cardRef: React.RefObject<HTMLDivElement | null>;
  dashboardRef: React.RefObject<HTMLElement | null>;
  onPrepareFull?: () => void;
  iconMode: IconMode;
}

const CARD_OPTIONS = [
  { type: 'milestone-streak', label: '连胜成就', iconName: 'flame' },
  { type: 'milestone-xp', label: '经验突破', iconName: 'star' },
  { type: 'weekly', label: '本周报告', iconName: 'chart' },
  { type: 'full', label: '全屏数据', iconName: 'monitor' },
] as const;

type CardType = (typeof CARD_OPTIONS)[number]['type'];

function formatWeeklyDuration(totalMinutes: number): string {
  if (totalMinutes < 60) return `${totalMinutes}分`;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) return `${hours}小时`;

  return `${hours}小时${minutes}分`;
}

export function ShareModal({
  isOpen,
  onClose,
  userData,
  cardRef,
  dashboardRef,
  onPrepareFull,
  iconMode,
}: ShareModalProps) {
  const [selectedCard, setSelectedCard] = useState<CardType>('milestone-streak');
  const { isExporting, capture } = useScreenshot();

  const handleExport = useCallback(async () => {
    const filenames: Record<CardType, string> = {
      'milestone-streak': 'streak-milestone',
      'milestone-xp': 'xp-milestone',
      weekly: 'weekly-report',
      full: 'duodash-full',
    };

    const isFull = selectedCard === 'full';
    const targetRef = isFull ? dashboardRef : cardRef;

    if (!targetRef.current) return;

    if (isFull && onPrepareFull) {
      onPrepareFull();
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    await capture(targetRef.current, {
      filename: filenames[selectedCard],
      pixelRatio: isFull ? 2 : 3,
      backgroundColor: isFull
        ? document.documentElement.dataset.theme === 'dark'
          ? '#0b1220'
          : '#f7f7f7'
        : 'transparent',
      width: isFull ? undefined : 400,
      height: isFull ? undefined : 500,
      style: isFull ? { padding: '40px' } : undefined,
    });
  }, [selectedCard, cardRef, dashboardRef, onPrepareFull, capture]);

  const getWeeklyData = useCallback(() => {
    const xpHistory = userData.weeklyXpHistory || [];
    const timeHistory = userData.weeklyTimeHistory || [];

    if (xpHistory.length === 0) return null;

    const dailyXp = xpHistory.map(s => s.xp);
    const isFutureFlags = xpHistory.map(s => s.isFuture);
    const daysLearned = xpHistory.filter(s => s.xp > 0 && !s.isFuture).length;
    const totalXp = xpHistory.reduce((sum, s) => sum + s.xp, 0);
    const totalMinutes = timeHistory.reduce((sum, s) => sum + (s.time || 0), 0);
    const totalTime = formatWeeklyDuration(totalMinutes);

    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysToMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const dateRange = `${monday.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })} - ${sunday.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })}`;

    return { daysLearned, totalXp, totalTime, dailyXp, dateRange, isFutureFlags };
  }, [userData]);

  if (!isOpen) return null;

  const weeklyData = getWeeklyData();

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      style={{ width: '100vw', height: '100vh', left: 0, top: 0 }}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-[480px] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl bg-white shadow-xl [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
        onClick={e => e.stopPropagation()}
      >
        {isExporting && (
          <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300">
            <div className="relative">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#58cc02]/20 border-t-[#58cc02]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <AppIcon name="hourglass" mode={iconMode} size="md" className="text-[#58cc02]" />
              </div>
            </div>
            <p className="mt-4 animate-pulse font-bold text-[#58cc02]">正在生成分享图片...</p>
            <p className="mt-1 text-xs text-gray-500">为了保证图表完整，请稍等片刻</p>
          </div>
        )}

        <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-700">
              <AppIcon name="share" mode={iconMode} size="md" className="text-gray-700" />
              分享卡片
            </h2>
            <button
              onClick={onClose}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="关闭"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
            {CARD_OPTIONS.map(option => (
              <button
                key={option.type}
                onClick={() => setSelectedCard(option.type)}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 px-2 py-2 text-xs font-bold transition-all duration-200 sm:flex-row sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${selectedCard === option.type
                  ? 'border-[#58cc02] bg-[#58cc02] text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <AppIcon
                  name={option.iconName}
                  mode={iconMode}
                  className={selectedCard === option.type ? 'text-white' : 'text-gray-700'}
                />
                <span className="whitespace-nowrap">{option.label}</span>
              </button>
            ))}
          </div>

          <div className="relative mb-6 flex justify-center px-1 py-2">
            <div className="relative flex h-[400px] w-full max-w-[320px] items-center justify-center overflow-hidden rounded-3xl border border-gray-100/50 bg-gray-50/30 sm:h-[400px]">
              <div className="flex h-full w-full items-center justify-center p-0">
                {selectedCard === 'milestone-streak' && (
                  <MilestoneCard ref={cardRef} type="streak" value={userData.streak} />
                )}
                {selectedCard === 'milestone-xp' && (
                  <MilestoneCard ref={cardRef} type="xp" value={userData.totalXp} />
                )}
                {selectedCard === 'weekly' && weeklyData && (
                  <WeeklySummaryCard
                    ref={cardRef}
                    daysLearned={weeklyData.daysLearned}
                    totalXp={weeklyData.totalXp}
                    totalTime={weeklyData.totalTime}
                    dailyXp={weeklyData.dailyXp}
                    dateRange={weeklyData.dateRange}
                    isFutureFlags={weeklyData.isFutureFlags}
                  />
                )}
                {selectedCard === 'full' && (
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-white p-8 text-gray-400">
                    <svg className="mb-3 h-12 w-12 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                    <p className="text-center text-sm font-bold">全屏仪表盘模式</p>
                    <p className="mt-1 text-center text-xs">将截取整个数据页面</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-b-4 border-[#4caf00] bg-[#58cc02] py-3.5 font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#4caf00] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                导出中...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                保存高清图片
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ShareModal;
