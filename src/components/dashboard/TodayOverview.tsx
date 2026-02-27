import React from 'react';
import type { UserData } from '../../types';

interface TodayOverviewProps {
  userData: UserData | null;
  seq: number;
}

export function TodayOverview({ userData, seq }: TodayOverviewProps): React.ReactElement {
  const todayTime = userData?.dailyTimeHistory?.length
    ? userData.dailyTimeHistory[userData.dailyTimeHistory.length - 1].time || '-'
    : '-';

  function renderTodayStatus(): React.ReactNode {
    if (!userData) {
      return <div className="text-sm text-center text-gray-600">⏰ 今日还未学习</div>;
    }

    // 优先检查是否使用了冻结卡（当 xpToday 为 0 或未定义时）
    if (userData.streakExtendedToday && (!userData.xpToday || userData.xpToday === 0)) {
      return <div className="text-sm text-center text-blue-500">❄️ 使用了连胜冻结卡</div>;
    }

    if (userData.xpToday && userData.xpToday > 0) {
      return (
        <div className="text-sm text-center">
          <div className="text-gray-700 font-semibold">🔥 今日已学习 {userData.xpToday} XP</div>
          {userData.streakExtendedTime && (
            <div className="text-xs text-gray-600 mt-1">{userData.streakExtendedTime} 保住连胜</div>
          )}
        </div>
      );
    }

    return <div className="text-sm text-center text-gray-600">⏰ 今日还未学习</div>;
  }

  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm border-2 border-b-4 border-gray-200 animate-seq seq-${seq}`}>
      <h2 className="text-gray-700 font-bold text-lg mb-3">今日概览</h2>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#58cc02]/10 dark:bg-[#58cc02]/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-extrabold text-[#58cc02]">
              {userData ? (userData.xpToday ?? '-') : '—'}
            </div>
            <div className="text-xs text-gray-500 font-bold mt-1">今日 XP</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 text-center">
            <div className="text-2xl font-extrabold text-blue-500">
              {userData ? (userData.lessonsToday ?? '-') : '—'}
            </div>
            <div className="text-xs text-gray-500 font-bold mt-1">今日课程</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-3 text-center">
            <div className="text-2xl font-extrabold text-orange-500">
              {userData ? userData.streak : '—'}
            </div>
            <div className="text-xs text-gray-500 font-bold mt-1">连胜天数</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-3 text-center">
            <div className="text-2xl font-extrabold text-purple-500">{todayTime}</div>
            <div className="text-xs text-gray-500 font-bold mt-1">学习分钟</div>
          </div>
        </div>

        {renderTodayStatus()}
      </div>
    </div>
  );
}

export default TodayOverview;
