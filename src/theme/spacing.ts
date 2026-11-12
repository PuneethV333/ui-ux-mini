/** 4pt spacing scale. */
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  giant: 56,
  screen: 20,
} as const;

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 30,
  pill: 999,
  round: 9999,
} as const;

export const sizes = {
  icon: 22,
  iconSm: 18,
  iconLg: 26,
  touch: 44,
  button: 54,
  input: 56,
  header: 56,
  tabBar: 78,
  avatar: 44,
  orb: 260,
} as const;

export const layout = {
  screenPadding: spacing.screen,
  sectionGap: spacing.xxl,
  cardGap: spacing.md,
  maxContentWidth: 560,
} as const;

export const shadows = {
  glowViolet: {
    shadowColor: '#8B5CF6',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 10,
  },
  glowPink: {
    shadowColor: '#F472D0',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.38,
    shadowRadius: 22,
    elevation: 9,
  },
  glowGold: {
    shadowColor: '#FFC46B',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.32,
    shadowRadius: 18,
    elevation: 8,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 6,
  },
} as const;
