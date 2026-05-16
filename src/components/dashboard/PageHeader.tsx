import React from 'react';
import type { UserData } from '../../types';
import { AppIcon, type AppIconName, type IconMode } from '../icons/AppIcon';

interface PageHeaderProps {
  userData: UserData | null;
  viewData: UserData;
  iconMode: IconMode;
}

export function PageHeader({ userData, viewData, iconMode }: PageHeaderProps): React.ReactElement {
  return (
    <div className="mb-4 animate-fade-in-up delay-1">
      <h1 className="mb-2 text-4xl font-extrabold text-gray-800">学习数据概览</h1>
      <p className="mb-4 text-base text-gray-600">
        {userData ? (
          <span className="flex items-center gap-1.5 flex-wrap">
            已加入多邻国 <span className="font-semibold text-gray-800">{viewData.accountAgeDays}</span> 天 · 当前重点：
            <span className="inline-flex items-center gap-1 font-semibold text-[#58cc02]">
              {(viewData.learningSubject || viewData.learningLanguage) && (
                <AppIcon 
                  name={viewData.learningSubject ? (viewData.learningSubject as AppIconName) : undefined} 
                  flag={!viewData.learningSubject ? (viewData.learningLanguageCode || viewData.learningLanguage) : undefined}
                  mode={iconMode} 
                  size="xs" 
                  className="text-[#58cc02]" 
                />
              )}
              {viewData.learningLanguage}
            </span>
          </span>
        ) : (
          <>正在加载你的学习数据…</>
        )}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        {viewData.isPlus && (
          <div className="flex items-center gap-1.5 rounded-2xl bg-[#f7fff2] border border-[#e1f3d8] px-4 py-2 shadow-sm transition-all hover:shadow-md">
            <AppIcon name="crown" mode={iconMode} className="text-[#58cc02]" />
            <span className="text-sm font-bold text-[#58cc02]">Super</span>
          </div>
        )}
        <div className="flex items-center gap-2 rounded-2xl border border-[#ffe7cc] bg-[#fff8f0] px-4 py-2 shadow-sm transition-all hover:shadow-md">
          <AppIcon name="flame" mode={iconMode} className="text-[#ff9600]" />
          <span className="text-sm font-bold text-[#ff9600]">
            {userData ? viewData.streak : '—'} <span className="opacity-90">天连胜</span>
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-[#d0ebff] bg-[#f0f9ff] px-4 py-2 shadow-sm transition-all hover:shadow-md">
          <AppIcon name="gem" mode={iconMode} className="text-[#1cb0f6]" />
          <span className="text-sm font-bold text-[#1cb0f6]">
            {userData ? viewData.gems.toLocaleString() : '—'} <span className="opacity-90">宝石</span>
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-[#fff4cc] bg-[#fffdf0] px-4 py-2 shadow-sm transition-all hover:shadow-md">
          <AppIcon name="trophy" mode={iconMode} className="text-[#a67c00]" />
          <span className="max-w-[150px] truncate text-sm font-bold text-[#a67c00]" title={viewData.league}>
            {viewData.league}
          </span>
          {userData && viewData.leagueTier >= 0 && (
            <span className="text-xs font-bold text-[#a67c00]/80 bg-[#fff4cc]/50 px-1.5 rounded-md">T{viewData.leagueTier + 1}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
