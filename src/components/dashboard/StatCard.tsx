import React from 'react';
import { StatCardColors } from '../../styles/duolingoColors';
import { AppIcon, type IconMode } from '../icons/AppIcon';

const ICON_COLOR_MAP = {
  bolt: StatCardColors.totalXp,
  calendar: StatCardColors.accountAge,
  books: StatCardColors.courses,
  stopwatch: StatCardColors.learningTime,
  flame: StatCardColors.streak,
  gem: StatCardColors.gems,
};

type StatCardIconName = keyof typeof ICON_COLOR_MAP;

interface StatCardProps {
  iconName: StatCardIconName;
  iconMode: IconMode;
  value: string | number;
  label: string;
  colorClass?: string;
  color?: string;
  seq: number;
  isLargeText?: boolean;
}

export function StatCard({
  iconName,
  iconMode,
  value,
  label,
  colorClass,
  color,
  seq,
  isLargeText = true,
}: StatCardProps): React.ReactElement {
  const iconColor = ICON_COLOR_MAP[iconName];
  const valueColor = color || iconColor;

  return (
    <div className={`animate-seq seq-${seq} rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-4 shadow-sm`}>
      <div
        className="mb-1"
        style={iconColor ? { color: iconColor, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' } : undefined}
      >
        <AppIcon name={iconName} mode={iconMode} size="lg" />
      </div>
      <div
        className={`${isLargeText ? 'text-2xl' : 'text-lg'} font-extrabold ${!valueColor ? colorClass : ''}`}
        style={valueColor ? { color: valueColor } : undefined}
      >
        {value}
      </div>
      <div className="text-xs font-bold text-gray-500">{label}</div>
    </div>
  );
}

export default StatCard;
