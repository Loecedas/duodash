import React from 'react';

export type IconMode = 'emoji' | 'svg';

export type AppIconName =
  | 'palette'
  | 'share'
  | 'refresh'
  | 'shapes'
  | 'smile'
  | 'bolt'
  | 'calendar'
  | 'books'
  | 'stopwatch'
  | 'crown'
  | 'flame'
  | 'gem'
  | 'trophy'
  | 'owl'
  | 'hourglass'
  | 'clock'
  | 'snowflake'
  | 'sad'
  | 'star'
  | 'chart'
  | 'monitor'
  | 'warning';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AppIconProps {
  name: AppIconName;
  mode: IconMode;
  size?: IconSize;
  className?: string;
}

const EMOJI_ICON_MAP: Record<AppIconName, string> = {
  palette: '🎨',
  share: '📤',
  refresh: '🔄',
  shapes: '🧩',
  smile: '🙂',
  bolt: '⚡',
  calendar: '📅',
  books: '📚',
  stopwatch: '⏱️',
  crown: '👑',
  flame: '🔥',
  gem: '💎',
  trophy: '🏆',
  owl: '🦉',
  hourglass: '⏳',
  clock: '⏰',
  snowflake: '❄️',
  sad: '😢',
  star: '⭐',
  chart: '📊',
  monitor: '🖥️',
  warning: '⚠️',
};

const SIZE_CLASS_MAP: Record<IconSize, { box: string; emoji: string; svg: string }> = {
  xs: { box: 'h-4 w-4', emoji: 'text-sm', svg: 'h-[1.12rem] w-[1.12rem]' },
  sm: { box: 'h-5 w-5', emoji: 'text-base', svg: 'h-[1.42rem] w-[1.42rem]' },
  md: { box: 'h-6 w-6', emoji: 'text-xl', svg: 'h-[1.72rem] w-[1.72rem]' },
  lg: { box: 'h-7 w-7', emoji: 'text-2xl', svg: 'h-[2rem] w-[2rem]' },
  xl: { box: 'h-16 w-16', emoji: 'text-6xl', svg: 'h-[4.6rem] w-[4.6rem]' },
};

function joinClasses(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function renderSvg(name: AppIconName): React.ReactElement {
  switch (name) {
    case 'palette':
      return (
        <>
          <path d="M12 3.75c-4.7 0-8.5 3.58-8.5 8 0 3.59 2.88 6.38 6.56 6.38h1.19a.92.92 0 0 1 .92.9 1.4 1.4 0 0 0 1.41 1.37c3.8 0 6.92-3 6.92-7.05 0-5.23-3.93-9.6-8.5-9.6Z" />
          <circle cx="7.8" cy="11.15" r="1" fill="currentColor" stroke="none" />
          <circle cx="10.35" cy="7.95" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.05" cy="7.55" r="1" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="10.35" r="1" fill="currentColor" stroke="none" />
        </>
      );
    case 'share':
      return (
        <>
          <path d="M12 14.75V5.25" />
          <path d="m8.75 8.5 3.25-3.25 3.25 3.25" />
          <path d="M5.25 14.5v2.25a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25V14.5" />
        </>
      );
    case 'refresh':
      return (
        <>
          <path d="M19.25 11a7.25 7.25 0 0 0-12.38-5.13L5 7.75" />
          <path d="M5 4.75v3h3" />
          <path d="M4.75 13a7.25 7.25 0 0 0 12.38 5.13L19 16.25" />
          <path d="M19 19.25v-3h-3" />
        </>
      );
    case 'shapes':
      return (
        <>
          <rect x="3.5" y="4" width="6" height="6" rx="1.5" />
          <circle cx="16.75" cy="7" r="3.25" />
          <path d="m7 13.75 3.5 6.25h-7L7 13.75Z" />
          <rect x="14.25" y="14.25" width="5.5" height="5.5" rx="1.25" />
        </>
      );
    case 'smile':
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="9.25" cy="10.25" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="14.75" cy="10.25" r="0.8" fill="currentColor" stroke="none" />
          <path d="M8.5 13.9c.95 1.5 2.25 2.1 3.5 2.1s2.55-.6 3.5-2.1" />
        </>
      );
    case 'bolt':
      return <path d="M13.25 2.5 5.75 13H10l-1.1 8.5L18.25 10.75H14L15 2.5h-1.75Z" fill="currentColor" stroke="none" />;
    case 'calendar':
      return (
        <>
          <rect x="3.5" y="4.75" width="17" height="15.75" rx="2.5" />
          <path d="M8 3.5v3.5" />
          <path d="M16 3.5v3.5" />
          <path d="M3.5 9.5h17" />
          <circle cx="8.25" cy="13" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="12" cy="13" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="15.75" cy="13" r="0.9" fill="currentColor" stroke="none" />
        </>
      );
    case 'books':
      return (
        <>
          <path d="M5 5.75A2.75 2.75 0 0 1 7.75 3H18.5v14.25H7.75A2.75 2.75 0 0 0 5 20V5.75Z" />
          <path d="M5 18.25A2.75 2.75 0 0 1 7.75 15.5H18.5v5.5H7.75A2.75 2.75 0 0 1 5 18.25Z" />
          <path d="M8.75 7h6.5" />
          <path d="M8.75 10h5.25" />
        </>
      );
    case 'stopwatch':
      return (
        <>
          <circle cx="12" cy="13" r="7" />
          <path d="M12 13V9.5" />
          <path d="m12 13 2.75 1.75" />
          <path d="M9.25 3.25h5.5" />
          <path d="M12 6V3.25" />
          <path d="m16.75 6.25 1.5-1.5" />
        </>
      );
    case 'crown':
      return (
        <>
          <path d="m4.25 18 1.5-9 4.25 3.5L12 6.5l2 6 4.25-3.5 1.5 9H4.25Z" fill="currentColor" stroke="none" />
          <path d="M5.25 18.25h13.5" />
          <circle cx="8.25" cy="11.25" r="0.7" fill="#ffffff" stroke="none" />
          <circle cx="12" cy="9.25" r="0.7" fill="#ffffff" stroke="none" />
          <circle cx="15.75" cy="11.25" r="0.7" fill="#ffffff" stroke="none" />
        </>
      );
    case 'flame':
      return (
        <>
          <path
            d="M12.25 3.2c.22 2.1-.5 3.72-1.73 5.08-1.52 1.68-3.07 3.22-3.07 5.72 0 3.43 2.21 6.04 5.02 6.04 3.02 0 5.08-2.3 5.08-5.4 0-1.92-.76-3.44-2.13-5.05-.95-1.11-1.7-2.53-1.63-5.36"
          />
          <path
            d="M12.15 10.9c-.18 1.12-.74 1.9-1.3 2.56-.55.66-1.04 1.28-1.04 2.18 0 1.35.98 2.38 2.29 2.38 1.38 0 2.38-1.05 2.38-2.4 0-.9-.42-1.58-.95-2.23-.53-.63-.97-1.33-1.12-2.49"
          />
        </>
      );
    case 'gem':
      return (
        <>
          <path d="M6.25 8.25 9.25 4.5h5.5l3 3.75L12 20 6.25 8.25Z" />
          <path d="M6.25 8.25h11.5" />
          <path d="m9.25 4.5 2.75 3.75 2.75-3.75" />
          <path d="m12 8.25-1.8 11.75" />
          <path d="M12 8.25 13.8 20" />
        </>
      );
    case 'trophy':
      return (
        <>
          <path d="M8 4.5h8v3.75a4 4 0 0 1-8 0V4.5Z" />
          <path d="M8 6H5.5A1.75 1.75 0 0 0 7.25 9.5H8" />
          <path d="M16 6h2.5a1.75 1.75 0 0 1-1.75 3.5H16" />
          <path d="M12 12.25V16.5" />
          <path d="M9.25 19.5h5.5" />
          <path d="M9.5 16.5h5" />
        </>
      );
    case 'owl':
      return (
        <>
          <path d="m7.5 6 2 1.75L12 5.5l2.5 2.25L16.5 6l1.75 3.5v4.25a6.25 6.25 0 0 1-12.5 0V9.5L7.5 6Z" />
          <circle cx="9.4" cy="12" r="2.1" />
          <circle cx="14.6" cy="12" r="2.1" />
          <circle cx="9.4" cy="12" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="14.6" cy="12" r="0.75" fill="currentColor" stroke="none" />
          <path d="m12 13.25-1.25 1.75h2.5L12 13.25Z" fill="currentColor" stroke="none" />
        </>
      );
    case 'hourglass':
      return (
        <>
          <path d="M6.5 4h11" />
          <path d="M6.5 20h11" />
          <path d="M8 4c0 3.75 4 4.5 4 8s-4 4.25-4 8" />
          <path d="M16 4c0 3.75-4 4.5-4 8s4 4.25 4 8" />
          <path d="m10 14 2-2 2 2-2 2-2-2Z" fill="currentColor" stroke="none" />
        </>
      );
    case 'clock':
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5v5.25" />
          <path d="m12 12.75 3.25 1.75" />
          <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
        </>
      );
    case 'snowflake':
      return (
        <>
          <path d="M12 3v18" />
          <path d="m5 7 14 10" />
          <path d="M19 7 5 17" />
          <path d="m9.25 4.5 2.75 1.75 2.75-1.75" />
          <path d="m9.25 19.5 2.75-1.75 2.75 1.75" />
          <path d="m4.75 10.75 2.75 1.25-2.75 1.25" />
          <path d="m19.25 10.75-2.75 1.25 2.75 1.25" />
        </>
      );
    case 'sad':
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="9.25" cy="10.25" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="14.75" cy="10.25" r="0.8" fill="currentColor" stroke="none" />
          <path d="M8.4 16.15c.95-1.2 2.25-1.8 3.6-1.8s2.65.6 3.6 1.8" />
        </>
      );
    case 'star':
      return <path d="m12 3.5 2.35 4.8 5.3.77-3.83 3.73.9 5.27L12 15.55l-4.72 2.52.9-5.27-3.83-3.73 5.3-.77L12 3.5Z" fill="currentColor" stroke="none" />;
    case 'chart':
      return (
        <>
          <path d="M4.5 19.5h15" />
          <path d="M7.25 19.5v-5.75" />
          <path d="M12 19.5V9.5" />
          <path d="M16.75 19.5V6.5" />
        </>
      );
    case 'monitor':
      return (
        <>
          <rect x="3.5" y="4.5" width="17" height="11.75" rx="2.25" />
          <path d="M9 19.5h6" />
          <path d="M12 16.25v3.25" />
        </>
      );
    case 'warning':
      return (
        <>
          <path d="M12 4.75 4.25 18.5h15.5L12 4.75Z" />
          <path d="M12 9.25v4.25" />
          <circle cx="12" cy="15.9" r="0.85" fill="currentColor" stroke="none" />
        </>
      );
  }
}

export function AppIcon({ name, mode, size = 'sm', className }: AppIconProps): React.ReactElement {
  const sizeClasses = SIZE_CLASS_MAP[size];

  if (mode === 'emoji') {
    return (
      <span className={joinClasses('inline-flex shrink-0 items-center justify-center align-middle', sizeClasses.box, className)} aria-hidden="true">
        <span className={joinClasses('inline-flex items-center justify-center leading-none', sizeClasses.emoji)}>
          {EMOJI_ICON_MAP[name]}
        </span>
      </span>
    );
  }

  return (
    <span className={joinClasses('inline-flex shrink-0 items-center justify-center align-middle', sizeClasses.box, className)} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={joinClasses('overflow-visible', sizeClasses.svg)}
        aria-hidden="true"
      >
        {renderSvg(name)}
      </svg>
    </span>
  );
}

export default AppIcon;
