import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAchievementStats } from '../../hooks/useAchievementStats';
import { AchievementIconMap, type AchievementIconType } from './AchievementIcons';
import { DuoColors, AchievementTiers } from '../../styles/duolingoColors';

interface Achievement {
  id: string;
  icon: AchievementIconType;
  name: string;
  description: string;
  threshold: number;
  unit: string;
  category: 'streak' | 'dailyXp' | 'totalDays' | 'totalXp';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

interface BadgeStatus extends Achievement {
  current: number;
  unlocked: boolean;
  progress: number;
  unlockedDate: string | null;
}

interface AchievementsSectionProps {
  data: { date: string; xp: number; time?: number }[];
}

type TierKey = Achievement['tier'];

const ACHIEVEMENTS: Achievement[] = [
  { id: 'streak7', icon: 'ember', name: '初露锋芒', description: '连续学习 7 天', threshold: 7, unit: '天', category: 'streak', tier: 'bronze' },
  { id: 'streak30', icon: 'torch', name: '持之以恒', description: '连续学习 30 天', threshold: 30, unit: '天', category: 'streak', tier: 'silver' },
  { id: 'streak60', icon: 'orbit', name: '坚韧不拔', description: '连续学习 60 天', threshold: 60, unit: '天', category: 'streak', tier: 'gold' },
  { id: 'streak100', icon: 'gauntlet', name: '百日征程', description: '连续学习 100 天', threshold: 100, unit: '天', category: 'streak', tier: 'platinum' },
  { id: 'streak365', icon: 'sundial', name: '全年无休', description: '连续学习 365 天', threshold: 365, unit: '天', category: 'streak', tier: 'diamond' },
  { id: 'xp500', icon: 'spark', name: '小试牛刀', description: '单日获得 500 XP', threshold: 500, unit: 'XP', category: 'dailyXp', tier: 'bronze' },
  { id: 'xp1000', icon: 'surge', name: '势如破竹', description: '单日获得 1000 XP', threshold: 1000, unit: 'XP', category: 'dailyXp', tier: 'silver' },
  { id: 'xp2000', icon: 'meteor', name: '一日千里', description: '单日获得 2000 XP', threshold: 2000, unit: 'XP', category: 'dailyXp', tier: 'gold' },
  { id: 'xp3500', icon: 'nova', name: '势不可挡', description: '单日获得 3500 XP', threshold: 3500, unit: 'XP', category: 'dailyXp', tier: 'platinum' },
  { id: 'xp5000', icon: 'regalCrown', name: '登峰造极', description: '单日获得 5000 XP', threshold: 5000, unit: 'XP', category: 'dailyXp', tier: 'diamond' },
  { id: 'days50', icon: 'bookmark', name: '学海泛舟', description: '累计学习 50 天', threshold: 50, unit: '天', category: 'totalDays', tier: 'bronze' },
  { id: 'days100', icon: 'library', name: '百日积累', description: '累计学习 100 天', threshold: 100, unit: '天', category: 'totalDays', tier: 'silver' },
  { id: 'days200', icon: 'owlGem', name: '学富五车', description: '累计学习 200 天', threshold: 200, unit: '天', category: 'totalDays', tier: 'gold' },
  { id: 'days365', icon: 'compass', name: '一年之约', description: '累计学习 365 天', threshold: 365, unit: '天', category: 'totalDays', tier: 'platinum' },
  { id: 'days730', icon: 'mountain', name: '两年征途', description: '累计学习 730 天', threshold: 730, unit: '天', category: 'totalDays', tier: 'diamond' },
  { id: 'totalXp10000', icon: 'ribbon', name: '万里长征', description: '累计获得 1 万 XP', threshold: 10000, unit: 'XP', category: 'totalXp', tier: 'bronze' },
  { id: 'totalXp50000', icon: 'medallion', name: '五万大关', description: '累计获得 5 万 XP', threshold: 50000, unit: 'XP', category: 'totalXp', tier: 'silver' },
  { id: 'totalXp100000', icon: 'laurel', name: '十万雄师', description: '累计获得 10 万 XP', threshold: 100000, unit: 'XP', category: 'totalXp', tier: 'gold' },
  { id: 'totalXp250000', icon: 'globe', name: '语言精英', description: '累计获得 25 万 XP', threshold: 250000, unit: 'XP', category: 'totalXp', tier: 'platinum' },
  { id: 'totalXp500000', icon: 'prism', name: '语言大师', description: '累计获得 50 万 XP', threshold: 500000, unit: 'XP', category: 'totalXp', tier: 'diamond' },
];

const TIER_STYLES: Record<TierKey, { bg: string; bgLight: string; border: string; text: string; label: string }> = {
  bronze: { bg: AchievementTiers.bronze.primary, bgLight: AchievementTiers.bronze.bg, border: AchievementTiers.bronze.secondary, text: AchievementTiers.bronze.text, label: '青铜' },
  silver: { bg: AchievementTiers.silver.primary, bgLight: AchievementTiers.silver.bg, border: AchievementTiers.silver.secondary, text: AchievementTiers.silver.text, label: '白银' },
  gold: { bg: AchievementTiers.gold.primary, bgLight: AchievementTiers.gold.bg, border: AchievementTiers.gold.secondary, text: AchievementTiers.gold.text, label: '黄金' },
  platinum: { bg: AchievementTiers.platinum.primary, bgLight: AchievementTiers.platinum.bg, border: AchievementTiers.platinum.secondary, text: AchievementTiers.platinum.text, label: '铂金' },
  diamond: { bg: AchievementTiers.diamond.primary, bgLight: AchievementTiers.diamond.bg, border: AchievementTiers.diamond.secondary, text: AchievementTiers.diamond.text, label: '钻石' },
};

function renderIcon(iconName: AchievementIconType, className?: string): React.ReactNode {
  const IconComponent = AchievementIconMap[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
}

function getIconVariantStyle(): React.CSSProperties {
  return {
    filter: 'saturate(1.04) contrast(1.02)',
  };
}

function resolveAchievementStatus(
  achievement: Achievement,
  stats: ReturnType<typeof useAchievementStats>
): BadgeStatus {
  let current = 0;
  let unlockedDate: string | null = null;

  if (achievement.category === 'streak') {
    current = stats.maxStreak;
    unlockedDate = stats.streakMilestones[achievement.threshold] || null;
  }

  if (achievement.category === 'dailyXp') {
    current = stats.maxDailyXp;
    unlockedDate = stats.dailyXpMilestones[achievement.threshold] || null;
  }

  if (achievement.category === 'totalDays') {
    current = stats.totalDays;
    unlockedDate = stats.totalDaysMilestones[achievement.threshold] || null;
  }

  if (achievement.category === 'totalXp') {
    current = stats.totalXp;
    unlockedDate = stats.totalXpMilestones[achievement.threshold] || null;
  }

  return {
    ...achievement,
    current,
    unlocked: current >= achievement.threshold,
    progress: Math.min(current / achievement.threshold, 1),
    unlockedDate,
  };
}

export function AchievementsSection({ data }: AchievementsSectionProps): React.ReactElement {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [displayedId, setDisplayedId] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const achievementStats = useAchievementStats(data);

  const badgeStatus = useMemo(
    () => ACHIEVEMENTS.map(achievement => resolveAchievementStatus(achievement, achievementStats)),
    [achievementStats]
  );

  const totalUnlocked = badgeStatus.filter(badge => badge.unlocked).length;
  const totalBadges = badgeStatus.length;
  const displayedBadge = displayedId ? badgeStatus.find(badge => badge.id === displayedId) ?? null : null;
  const isExpanded = selectedId !== null;
  const iconVariantStyle = useMemo(() => getIconVariantStyle(), []);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (selectedId) {
      setDisplayedId(selectedId);
      return;
    }

    timeoutRef.current = setTimeout(() => setDisplayedId(null), 220);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [selectedId]);

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8" style={iconVariantStyle}>{renderIcon('trophy')}</div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">奖项</h2>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            {achievementStats.currentStreak > 0 && (
              <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: DuoColors.foxOrange }}>
                <div className="h-5 w-5" style={iconVariantStyle}>{renderIcon('ember')}</div>
                <span>{achievementStats.currentStreak} 天</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {totalUnlocked}/{totalBadges}
              </span>
              <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(totalUnlocked / totalBadges) * 100}%`,
                    backgroundColor: DuoColors.featherGreen,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {badgeStatus.map(badge => {
              const isSelected = selectedId === badge.id;

              return (
                <button
                  key={badge.id}
                  onClick={() => setSelectedId(isSelected ? null : badge.id)}
                  className="group flex flex-col items-center gap-2 focus:outline-none"
                >
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center transition-all duration-200 sm:h-[72px] sm:w-[72px] lg:h-20 lg:w-20 ${
                      isSelected ? 'scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <div className={`h-full w-full ${badge.unlocked ? '' : 'opacity-30 grayscale'}`} style={iconVariantStyle}>
                      {renderIcon(badge.icon)}
                    </div>

                    <div
                      className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-sm dark:border-slate-900"
                      style={{ backgroundColor: badge.unlocked ? DuoColors.featherGreen : '#AFAFAF' }}
                    >
                      {badge.unlocked ? (
                        <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
                        </svg>
                      ) : (
                        <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18 8h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2ZM9 6a3 3 0 1 1 6 0v2H9V6Zm9 14H6V10h12v10Z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-center text-xs font-medium leading-tight ${
                      badge.unlocked ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'
                    }`}
                  >
                    {badge.name}
                  </span>

                  {!badge.unlocked && (
                    <span className="text-[10px] text-gray-400 dark:text-gray-600">{Math.round(badge.progress * 100)}%</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isExpanded ? 'grid-rows-[1fr] border-t border-gray-100 opacity-100 dark:border-slate-700' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            {displayedBadge && (
              <div className="bg-gray-50/80 p-4 dark:bg-slate-800/80 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center">
                      <div className={`h-12 w-12 ${displayedBadge.unlocked ? '' : 'opacity-30 grayscale'}`} style={iconVariantStyle}>
                        {renderIcon(displayedBadge.icon)}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-gray-800 dark:text-white">{displayedBadge.name}</h3>
                        <span
                          className="rounded-full px-2 py-0.5 text-xs text-white"
                          style={{ backgroundColor: TIER_STYLES[displayedBadge.tier].bg }}
                        >
                          {TIER_STYLES[displayedBadge.tier].label}
                        </span>
                        {displayedBadge.unlocked && (
                          <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: DuoColors.featherGreen }}>
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
                            </svg>
                            已解锁
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{displayedBadge.description}</p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 sm:w-64">
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">进度</span>
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {displayedBadge.current.toLocaleString()} / {displayedBadge.threshold.toLocaleString()} {displayedBadge.unit}
                      </span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(displayedBadge.progress * 100, 100)}%`,
                          backgroundColor: displayedBadge.unlocked ? DuoColors.featherGreen : DuoColors.beeYellow,
                        }}
                      />
                    </div>

                    {displayedBadge.unlocked && displayedBadge.unlockedDate && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                        <div className="h-4 w-4" style={iconVariantStyle}>{renderIcon('calendar')}</div>
                        <span>达成于 {displayedBadge.unlockedDate}</span>
                      </div>
                    )}

                    {!displayedBadge.unlocked && (
                      <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                        还差 {(displayedBadge.threshold - displayedBadge.current).toLocaleString()} {displayedBadge.unit}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AchievementsSection;
