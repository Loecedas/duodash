import React from 'react';
import type { UserData } from '../../types';
import { AppIcon, type IconMode } from '../icons/AppIcon';

interface PageHeaderProps {
  userData: UserData | null;
  viewData: UserData;
  iconMode: IconMode;
}

export function PageHeader({ userData, viewData, iconMode }: PageHeaderProps): React.ReactElement {
  return (
    <div className="mb-10 animate-fade-in-up delay-1">
      <h1 className="mb-2 text-4xl font-extrabold text-gray-800">学习数据概览</h1>
      <p className="mb-4 text-base text-gray-600">
        {userData ? (
          <>
            已加入多邻国 <span className="font-semibold text-gray-800">{viewData.accountAgeDays}</span> 天 · 当前重点：
            <span className="font-semibold text-[#58cc02]"> {viewData.learningLanguage}</span>
          </>
        ) : (
          <>正在加载你的学习数据…</>
        )}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        {viewData.isPlus && (
          <div className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1.5 shadow-sm">
            <AppIcon name="crown" mode={iconMode} className="text-white" />
            <span className="text-sm font-bold text-white">Super</span>
          </div>
        )}
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5">
          <AppIcon name="flame" mode={iconMode} className="text-red-500" />
          <span className="text-sm font-bold text-gray-700">{userData ? viewData.streak : '—'}</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5">
          <AppIcon name="gem" mode={iconMode} className="text-blue-400" />
          <span className="text-sm font-bold text-gray-700">{userData ? viewData.gems.toLocaleString() : '—'}</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5">
          <AppIcon name="trophy" mode={iconMode} className="text-yellow-500" />
          <span className="max-w-[150px] truncate text-sm font-bold text-gray-700" title={viewData.league}>
            {viewData.league}
          </span>
          {userData && viewData.leagueTier >= 0 && (
            <span className="text-xs font-semibold text-gray-600">T{viewData.leagueTier + 1}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
