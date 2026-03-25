import React from 'react';

interface IconProps {
  className?: string;
}

const C = {
  ink: '#21313C',
  white: '#FFFFFF',
  cream: '#FFF8E8',
  gold: '#FFC800',
  goldLight: '#FFE27A',
  amber: '#FFB020',
  orange: '#FF8F1F',
  orangeDeep: '#E46B00',
  green: '#58CC02',
  greenLight: '#8FE14B',
  teal: '#14B8A6',
  blue: '#1CB0F6',
  blueLight: '#90DFFF',
  navy: '#235390',
  red: '#FF5A5F',
  redDeep: '#D73B42',
  purple: '#9D6BFF',
  purpleLight: '#D7C0FF',
  pink: '#FF83C4',
  brown: '#B97939',
  brownDark: '#7F4F22',
  steel: '#C9D6E2',
  steelDark: '#8CA0B0',
} as const;

function IconBase({
  children,
  className = 'w-full h-full',
}: React.PropsWithChildren<IconProps>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const EmberIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="M33.2 8.5c1.9 9.2 8.8 11.8 8.8 21.1 0 8.7-6.1 15.1-14.3 15.1-7.7 0-13.7-5.8-13.7-13.5 0-6.8 3.7-11.4 9.2-16.7 1.2 4.1 4.1 7.2 7.5 8.9-1-4.9-.2-9.7 2.5-14.9Z" fill={C.orange} stroke={C.ink} strokeWidth="2.2" />
    <path d="M28.9 24.1c4 2.7 6.5 6.2 6.5 10.2 0 4.8-3.1 8.1-7.6 8.1-4.3 0-7.5-3.2-7.5-7.6 0-3.5 1.9-6.7 5.4-9.9.9 2.1 1.9 3.5 3.2 4.4Z" fill={C.goldLight} />
  </IconBase>
);

export const TorchIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="m22 39 11-20 10 6-11 20-10-6Z" fill={C.brown} stroke={C.ink} strokeWidth="2.2" />
    <path d="m23 45 9 5-2 5c-1 2.4-3.7 3.5-6.1 2.3-2.3-1.1-3.2-3.9-2.1-6.2l1.2-1.1 0-5.0Z" fill={C.brownDark} />
    <path d="M34.6 10.3c5.7 2.5 9.2 6.8 9.2 12 0 6.1-4.4 10.5-10.3 10.5-5.1 0-9.1-3.6-9.1-8.5 0-5.5 4.1-9.1 10.2-14Z" fill={C.orange} stroke={C.ink} strokeWidth="2.2" />
    <path d="M34 18c2.9 1.8 4.7 4 4.7 6.8 0 3-2.1 5.3-5 5.3-2.7 0-4.7-2.1-4.7-4.9 0-2.3 1.4-4.4 5-7.2Z" fill={C.goldLight} />
  </IconBase>
);

export const OrbitIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <ellipse cx="32" cy="33" rx="19" ry="11.5" stroke={C.blue} strokeWidth="4" transform="rotate(-18 32 33)" />
    <ellipse cx="32" cy="31" rx="12" ry="20" stroke={C.purple} strokeWidth="3.2" transform="rotate(24 32 31)" />
    <circle cx="21" cy="22" r="5.2" fill={C.gold} stroke={C.ink} strokeWidth="2" />
    <circle cx="45" cy="39" r="4.4" fill={C.blueLight} stroke={C.ink} strokeWidth="2" />
    <path d="m31.5 16 2.6 5.5 6 .8-4.4 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.4-4.1 6-.8 2.6-5.5Z" fill={C.cream} stroke={C.ink} strokeWidth="1.8" />
  </IconBase>
);

export const GauntletIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="M22 20h7v9h3v-10h7v11h3V20h6v16c0 8.3-6.7 15-15 15h-3c-8.8 0-16-7.2-16-16V20h8Z" fill={C.red} stroke={C.ink} strokeWidth="2.2" />
    <path d="M18 48h22v7c0 2.8-2.2 5-5 5H23c-2.8 0-5-2.2-5-5v-7Z" fill={C.redDeep} stroke={C.ink} strokeWidth="2.2" />
    <path d="M22 26h23" stroke={C.white} strokeWidth="2.8" opacity="0.9" />
  </IconBase>
);

export const SundialIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="M13 48c3.5-14.2 12.8-21.3 19-21.3S47.5 33.8 51 48H13Z" fill={C.goldLight} stroke={C.ink} strokeWidth="2.2" />
    <path d="M32 15c7.2 0 13 5.8 13 13H19c0-7.2 5.8-13 13-13Z" fill={C.gold} stroke={C.ink} strokeWidth="2.2" />
    <path d="M32 20v28" stroke={C.ink} strokeWidth="3.2" />
    <path d="m32 28 11 20" stroke={C.orangeDeep} strokeWidth="3" />
    <path d="M20 52h24" stroke={C.brownDark} strokeWidth="4" />
  </IconBase>
);

export const SparkIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="m32 9 4.5 11.6L48 25l-11.5 4.4L32 41l-4.5-11.6L16 25l11.5-4.4L32 9Z" fill={C.gold} stroke={C.ink} strokeWidth="2.2" />
    <circle cx="18" cy="17" r="3.2" fill={C.orange} />
    <circle cx="47" cy="14" r="2.6" fill={C.blue} />
    <circle cx="48" cy="42" r="3" fill={C.pink} />
    <circle cx="17" cy="41" r="2.5" fill={C.green} />
  </IconBase>
);

export const SurgeIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="m19 14 12 7-3 9 11-4 7 4-12 20 3-11-10 3 5-12-13 2 10-18Z" fill={C.blue} stroke={C.ink} strokeWidth="2.2" />
    <path d="m29 20 4 2-1 5 6-2 3 2-6 10 1-5-6 2 3-7-6 1 2-8Z" fill={C.blueLight} />
  </IconBase>
);

export const MeteorIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="M14 20c9 1.2 16.2 4 23.5 11.3" stroke={C.orange} strokeWidth="5" />
    <path d="M11 29c6.8.6 12.8 2.7 18.6 8.1" stroke={C.goldLight} strokeWidth="4" />
    <path d="M42 17c6.8 0 12 5.2 12 11.8S48.8 41 42 41s-12-5.4-12-12.2S35.2 17 42 17Z" fill={C.red} stroke={C.ink} strokeWidth="2.2" />
    <path d="M42 22c3.7 0 6.6 2.9 6.6 6.8 0 3.8-2.9 6.8-6.6 6.8-3.7 0-6.6-3-6.6-6.8 0-3.9 2.9-6.8 6.6-6.8Z" fill={C.orange} />
  </IconBase>
);

export const NovaIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="m32 8 6 15 16 6-16 6-6 15-6-15-16-6 16-6 6-15Z" fill={C.purple} stroke={C.ink} strokeWidth="2.2" />
    <path d="m32 16 3.8 9.2L45 29l-9.2 3.8L32 42l-3.8-9.2L19 29l9.2-3.8L32 16Z" fill={C.purpleLight} />
    <circle cx="32" cy="29" r="4.2" fill={C.white} />
  </IconBase>
);

export const RegalCrownIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="m11 42 6-19 11 10 4-15 4 15 11-10 6 19-8 10H19l-8-10Z" fill={C.gold} stroke={C.ink} strokeWidth="2.2" />
    <path d="M18 44h28" stroke={C.goldLight} strokeWidth="3.5" />
    <rect x="17" y="44" width="30" height="9" rx="4.5" fill={C.orange} stroke={C.ink} strokeWidth="2.2" />
    <circle cx="21" cy="46.5" r="2.2" fill={C.red} />
    <circle cx="32" cy="48" r="2.8" fill={C.blue} />
    <circle cx="43" cy="46.5" r="2.2" fill={C.purple} />
  </IconBase>
);

export const BookmarkIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="M20 10h20a6 6 0 0 1 6 6v37L30 43 14 53V16a6 6 0 0 1 6-6Z" fill={C.blue} stroke={C.ink} strokeWidth="2.2" />
    <path d="M23 17h14M23 24h14M23 31h10" stroke={C.white} strokeWidth="2.8" opacity="0.95" />
  </IconBase>
);

export const LibraryIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <rect x="11" y="16" width="12" height="35" rx="4" fill={C.red} stroke={C.ink} strokeWidth="2.2" />
    <rect x="22" y="12" width="12" height="39" rx="4" fill={C.gold} stroke={C.ink} strokeWidth="2.2" />
    <rect x="33" y="18" width="12" height="33" rx="4" fill={C.green} stroke={C.ink} strokeWidth="2.2" />
    <path d="M18 22v22M28 18v24M39 24v18" stroke={C.white} strokeWidth="2.2" opacity="0.8" />
  </IconBase>
);

export const OwlGemIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="M17 38c0-10.6 6.6-17 15-17 3.9 0 7 1.3 9.3 3.9 2.1-2.6 5-3.9 8.9-3.9 8.1 0 13.8 6.3 13.8 15.4C64 49 52 57 40.5 57 27.6 57 17 49.5 17 38Z" fill={C.green} stroke={C.ink} strokeWidth="2.2" />
    <circle cx="27.5" cy="34.5" r="6.2" fill={C.white} stroke={C.ink} strokeWidth="2" />
    <circle cx="41" cy="34.5" r="6.2" fill={C.white} stroke={C.ink} strokeWidth="2" />
    <circle cx="29.5" cy="36.5" r="2.8" fill={C.ink} />
    <circle cx="43" cy="36.5" r="2.8" fill={C.ink} />
    <path d="m32.8 43.5 3 4 3-4" fill={C.orange} />
  </IconBase>
);

export const CompassIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <circle cx="32" cy="32" r="20" fill={C.cream} stroke={C.ink} strokeWidth="2.2" />
    <circle cx="32" cy="32" r="14" fill={C.blueLight} />
    <path d="m32 18 3.5 6M46 32l-6 3.5M32 46l-3.5-6M18 32l6-3.5" stroke={C.ink} strokeWidth="2.4" />
    <path d="m32 22 6 14-6 6-6-6 6-14Z" fill={C.red} stroke={C.ink} strokeWidth="2" />
    <path d="m32 42-6-6 6-14 6 14-6 6Z" fill={C.white} opacity="0.75" />
  </IconBase>
);

export const MountainIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="M11 50 25 24l13 26H11Z" fill={C.green} stroke={C.ink} strokeWidth="2.2" />
    <path d="M26 50 40 16l13 34H26Z" fill={C.blue} stroke={C.ink} strokeWidth="2.2" />
    <path d="m35 24 5-8 4 10-4-2-3 4-2-4Z" fill={C.white} />
    <path d="M14 53h39" stroke={C.brownDark} strokeWidth="4" />
  </IconBase>
);

export const RibbonIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="M21 11h22l-4 18H25l-4-18Z" fill={C.blue} stroke={C.ink} strokeWidth="2.2" />
    <path d="M25 29h14v15l-7-4.5-7 4.5V29Z" fill={C.red} stroke={C.ink} strokeWidth="2.2" />
    <circle cx="32" cy="25" r="8.8" fill={C.gold} stroke={C.ink} strokeWidth="2.2" />
    <path d="m32 20 1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L32 20Z" fill={C.orange} />
  </IconBase>
);

export const MedallionIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="m23 10 9 14 9-14" stroke={C.red} strokeWidth="8" />
    <circle cx="32" cy="37" r="15" fill={C.gold} stroke={C.ink} strokeWidth="2.2" />
    <circle cx="32" cy="37" r="9.2" fill={C.goldLight} />
    <path d="M26 37h12" stroke={C.orangeDeep} strokeWidth="3" />
    <path d="M32 31v12" stroke={C.orangeDeep} strokeWidth="3" />
  </IconBase>
);

export const LaurelIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="M23 47c-8-4.9-11.9-11.7-11.9-20.5 6.8 1.9 12 5.9 15.7 12.2M41 47c8-4.9 11.9-11.7 11.9-20.5-6.8 1.9-12 5.9-15.7 12.2" stroke={C.green} strokeWidth="4" />
    <path d="m32 16 4.2 8.4 9.3 1.4-6.8 6.5 1.6 9.2L32 37l-8.3 4.5 1.6-9.2-6.8-6.5 9.3-1.4L32 16Z" fill={C.gold} stroke={C.ink} strokeWidth="2" />
  </IconBase>
);

export const GlobeIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <circle cx="32" cy="32" r="18" fill={C.blue} stroke={C.ink} strokeWidth="2.2" />
    <path d="M21 24c2-1.6 4.3-2.4 6.8-2.4 4.2 0 6.7 2.8 9.7 2.8 2.2 0 4.3-.8 6.3-2.5 2.1 2.3 3.4 5.1 4 8.4-2.3 2-4.7 3-7.3 3-3.9 0-6.2-2.6-9.3-2.6-2.6 0-5 1-7.3 3-2.5-1.9-4.2-4.3-5.1-7.3 1-1.1 1.8-1.9 2.2-2.4Z" fill={C.greenLight} />
    <path d="M32 14c4.2 4.8 6.3 10.8 6.3 18s-2.1 13.2-6.3 18c-4.2-4.8-6.3-10.8-6.3-18s2.1-13.2 6.3-18ZM14 32h36" stroke={C.white} strokeWidth="2" opacity="0.8" />
  </IconBase>
);

export const PrismIcon: React.FC<IconProps> = ({ className }) => (
  <IconBase className={className}>
    <path d="M20 22h24l8 11-20 19-20-19 8-11Z" fill={C.purple} stroke={C.ink} strokeWidth="2.2" />
    <path d="m20 22 12 11 12-11M12 33h40M32 33v19" stroke={C.white} strokeWidth="2" opacity="0.8" />
    <path d="m25 21 7 11 7-11" stroke={C.purpleLight} strokeWidth="3" />
  </IconBase>
);

export const AchievementIconMap = {
  ember: EmberIcon,
  torch: TorchIcon,
  orbit: OrbitIcon,
  gauntlet: GauntletIcon,
  sundial: SundialIcon,
  spark: SparkIcon,
  surge: SurgeIcon,
  meteor: MeteorIcon,
  nova: NovaIcon,
  regalCrown: RegalCrownIcon,
  bookmark: BookmarkIcon,
  library: LibraryIcon,
  owlGem: OwlGemIcon,
  compass: CompassIcon,
  mountain: MountainIcon,
  ribbon: RibbonIcon,
  medallion: MedallionIcon,
  laurel: LaurelIcon,
  globe: GlobeIcon,
  prism: PrismIcon,
  trophy: MedallionIcon,
  calendar: SundialIcon,
} as const;

export type AchievementIconType = keyof typeof AchievementIconMap;

export default AchievementIconMap;
