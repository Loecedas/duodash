import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { UserData } from '../../types';
import { MilestoneCard, WeeklySummaryCard } from './cards';
import { useScreenshot } from './useScreenshot';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
  cardRef: React.RefObject<HTMLDivElement | null>;
  dashboardRef: React.RefObject<HTMLElement | null>;
  onPrepareFull?: () => void;
}

const CARD_OPTIONS = [
  { type: 'milestone-streak', label: '连胜成就', icon: '🔥' },
  { type: 'milestone-xp', label: '经验突破', icon: '⭐' },
  { type: 'weekly', label: '本周报告', icon: '📊' },
  { type: 'full', label: '全屏数据', icon: '📱' },
] as const;

type CardType = (typeof CARD_OPTIONS)[number]['type'];

export function ShareModal({
  isOpen,
  onClose,
  userData,
  cardRef,
  dashboardRef,
  onPrepareFull,
}: ShareModalProps) {
  const [selectedCard, setSelectedCard] = useState<CardType>('milestone-streak');
  const { isExporting, capture } = useScreenshot();

  const handleExport = useCallback(async () => {
    const filenames: Record<CardType, string> = {
      'milestone-streak': 'streak-milestone',
      'milestone-xp': 'xp-milestone',
      'weekly': 'weekly-report',
      'full': 'duodash-full',
    };

    const isFull = selectedCard === 'full';
    const targetRef = isFull ? dashboardRef : cardRef;

    if (!targetRef.current) return;

    if (isFull && onPrepareFull) {
      onPrepareFull();
      // Wait longer for rendering and lazy components
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    await capture(targetRef.current, {
      filename: filenames[selectedCard],
      pixelRatio: isFull ? 2 : 3,
      backgroundColor: isFull 
        ? (document.documentElement.dataset.theme === 'dark' ? '#0b1220' : '#f7f7f7')
        : 'transparent',
      width: isFull ? undefined : 400,
      height: isFull ? undefined : 500,
      style: isFull ? { padding: '40px' } : undefined
    });
  }, [selectedCard, cardRef, dashboardRef, onPrepareFull, capture]);

  const getWeeklyData = useCallback(() => {
    const xpHistory = userData.dailyXpHistory || [];
    const timeHistory = userData.dailyTimeHistory || [];
    
    if (xpHistory.length === 0) return null;

    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysToMonday);
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const weekXpStats = xpHistory.filter(stat => {
      const d = new Date(stat.date);
      return d >= monday && d <= sunday;
    });

    const weekTimeStats = timeHistory.filter(stat => {
      const d = new Date(stat.date);
      return d >= monday && d <= sunday;
    });

    const daysLearned = weekXpStats.filter(s => s.xp > 0).length;
    const totalXp = weekXpStats.reduce((sum, s) => sum + s.xp, 0);
    const totalTimeValue = Math.round(weekTimeStats.reduce((sum, s) => sum + (s.time || 0), 0) / 60);
    const totalTime = `${totalTimeValue}分`;

    const dailyXp = [0, 0, 0, 0, 0, 0, 0];
    const isFutureFlags = [false, false, false, false, false, false, false];

    weekXpStats.forEach(stat => {
      const d = new Date(stat.date);
      let dayIdx = d.getDay();
      dayIdx = dayIdx === 0 ? 6 : dayIdx - 1;
      if (dayIdx >= 0 && dayIdx < 7) {
        dailyXp[dayIdx] = stat.xp;
      }
    });

    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        if (d > today) isFutureFlags[i] = true;
    }

    const dateRange = `${monday.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })} - ${sunday.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })}`;

    return { daysLearned, totalXp, totalTime, dailyXp, dateRange, isFutureFlags };
  }, [userData]);

  if (!isOpen) return null;

  const weeklyData = getWeeklyData();

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      style={{ width: '100vw', height: '100vh', left: 0, top: 0 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-[480px] max-w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden relative"
        style={{ scrollbarWidth: 'none' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Loading Overlay during Export */}
        {isExporting && (
          <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl transition-all duration-300">
             <div className="relative">
                <div className="w-16 h-16 border-4 border-[#58cc02]/20 border-t-[#58cc02] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl">🦜</span>
                </div>
             </div>
             <p className="mt-4 font-bold text-[#58cc02] animate-pulse">正在为您生成分享图...</p>
             <p className="text-xs text-gray-500 mt-1">为了保证图表完整，请稍等片刻</p>
          </div>
        )}

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
              <span>📤</span> 分享卡片
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer border border-gray-200"
              aria-label="关闭"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Card Type Selector */}
          <div className="grid grid-cols-3 gap-2 mb-6 sm:flex sm:flex-wrap">
            {CARD_OPTIONS.map(opt => (
              <button
                key={opt.type}
                onClick={() => setSelectedCard(opt.type)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer border-2 ${selectedCard === opt.type
                  ? 'bg-[#58cc02] text-white border-[#58cc02]'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
              >
                {opt.icon}
                <span className="whitespace-nowrap">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Card Preview Area */}
          <div className="flex justify-center mb-6 py-2 px-1 relative">
            <div className="w-full max-w-[320px] h-[400px] sm:h-[400px] overflow-hidden flex items-center justify-center rounded-3xl relative bg-gray-50/30 border border-gray-100/50">
              <div 
                className="w-full h-full flex items-center justify-center p-0"
              >
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
                  <div className="flex flex-col items-center justify-center p-8 text-gray-400 w-full h-full bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <svg className="w-12 h-12 mb-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                    <p className="font-bold text-sm text-center">全屏仪表盘模式</p>
                    <p className="text-xs mt-1 text-center">将截取整个数据页面</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full py-3.5 bg-[#58cc02] hover:bg-[#4caf00] text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border-2 border-b-4 border-[#4caf00] cursor-pointer flex items-center justify-center gap-2"
          >
            {isExporting ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                导出中...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
