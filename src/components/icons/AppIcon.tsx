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
  | 'warning'
  | 'message'
  | 'chess'
  | 'math'
  | 'music';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AppIconProps {
  name?: AppIconName;
  flag?: string; // 语言代码，如 'en', 'zh'
  mode: IconMode;
  size?: IconSize;
  className?: string;
  style?: React.CSSProperties;
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
  message: '💬',
  chess: '♟️',
  math: '➕',
  music: '🎵',
};

const DUO_FLAG_MAP: Record<string, string> = {
  en: 'gb',
  zh: 'cn',
  'zh-hk': 'cn',
  zc: 'cn',
  zs: 'cn',
  es: 'es',
  fr: 'fr',
  de: 'de',
  ja: 'jp',
  ko: 'kr',
  it: 'it',
  pt: 'br',
  ru: 'ru',
  vi: 'vn',
  tr: 'tr',
  ar: 'sa',
  hi: 'in',
  el: 'gr',
  he: 'il',
  sv: 'se',
  nl: 'nl',
  pl: 'pl',
  hu: 'hu',
  uk: 'ua',
};

const SIZE_CLASS_MAP: Record<IconSize, { box: string; emoji: string; svg: string }> = {
  xs: { box: 'h-4 w-4', emoji: 'text-sm', svg: 'h-[1.12rem] w-[1.12rem]' },
  sm: { box: 'h-6 w-6', emoji: 'text-base', svg: 'h-[1.42rem] w-[1.42rem]' },
  md: { box: 'h-7 w-7', emoji: 'text-xl', svg: 'h-[1.72rem] w-[1.72rem]' },
  lg: { box: 'h-8 w-8', emoji: 'text-2xl', svg: 'h-[2rem] w-[2rem]' },
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
        <g transform="translate(0, 1.5)">
          <path d="M3 20L4 6l5 5 3-9 3 9 5-5 1 14H3z" fill="none" />
        </g>
      );
    case 'flame':
      return (
        <g transform="translate(0, 2.5)">
          <path d="M12 2c2.4 3.5 6 5.8 6 10.7a6 6 0 1 1-12 0c0-2.5 1.3-4.5 3-6.5.9 2.1 2.1 3.3 2.9 4 .7-2 .7-6 0-8.2z" />
        </g>
      );
    case 'gem':
      return (
        <>
          <path d="M12 21L2 9l4-6h12l4 6-10 12z" />
          <path d="M2 9h20" />
          <path d="M12 21l-4-12 4-6 4 6-4 12z" />
        </>
      );
    case 'trophy':
      return (
        <>
          <path d="M6 3h12v7c0 4.5-3 7.5-6 7.5S6 14.5 6 10V3z" />
          <path d="M12 17.5v3.5m-4 0h8" />
          <path d="M6 6H4a2 2 0 0 0 0 3h2" />
          <path d="M18 6h2a2 2 0 0 1 0 3h-2" />
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
    case 'message':
      return (
        <>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="8.5" cy="10" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="10" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="10" r="1.1" fill="currentColor" stroke="none" />
        </>
      );
    case 'chess':
      return (
        <path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM9 19c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2H9Zm6.5-9.33L12 8l-3.5 1.67c-.33.17-.5.5-.5.83v5c0 .33.17.67.5.83L12 18l3.5-1.67c.33-.17.5-.5.5-.83v-5c0-.33-.17-.67-.5-.83Z" />
      );
    case 'math':
      return (
        <>
          <path d="M12 5v14m-7-7h14" />
          <path d="M5 19l14-14" strokeOpacity="0.3" />
        </>
      );
    case 'music':
      return (
        <>
          <path d="M9 18V5l10 2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="16" cy="20" r="3" />
        </>
      );
  }
}

export function AppIcon({ name, flag, mode, size = 'sm', className, style }: AppIconProps): React.ReactElement {
  const sizeClasses = SIZE_CLASS_MAP[size];

  // 特殊处理国际象棋图标：始终显示 .ico 图像
  if (name === 'chess') {
    return (
      <span className={joinClasses('inline-flex shrink-0 items-center justify-center overflow-hidden', sizeClasses.box, className)} style={style} aria-hidden="true">
        <img 
          src="/chess.ico" 
          alt="Chess"
          className="w-[85%] h-[85%] object-contain"
        />
      </span>
    );
  }

  // 如果提供了 flag，渲染国旗图片
  if (flag) {
    const code = flag.toLowerCase();
    const countryCode = DUO_FLAG_MAP[code] || 'un';
    const flagUrl = `https://flagcdn.com/w40/${countryCode}.png`;
    
    return (
      <span className={joinClasses('inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm', sizeClasses.box, className)} style={style} aria-hidden="true">
        <img 
          src={flagUrl} 
          alt={flag}
          className="w-full h-auto object-cover"
          crossOrigin="anonymous"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://flagcdn.com/w40/un.png';
          }}
        />
      </span>
    );
  }

  if (mode === 'emoji' && name) {
    return (
      <span className={joinClasses('inline-flex shrink-0 items-center justify-center leading-none overflow-hidden', sizeClasses.box, className)} style={style} aria-hidden="true">
        <span className={joinClasses('inline-flex items-center justify-center leading-none', sizeClasses.emoji)}>
          {EMOJI_ICON_MAP[name]}
        </span>
      </span>
    );
  }

  return (
    <span className={joinClasses('inline-flex shrink-0 items-center justify-center leading-none overflow-hidden', sizeClasses.box, className)} style={style} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={joinClasses('overflow-visible', sizeClasses.svg)}
        style={{ transform: 'translateY(0.02em)' }}
        aria-hidden="true"
      >
        {name && renderSvg(name)}
      </svg>
    </span>
  );
}

export default AppIcon;
