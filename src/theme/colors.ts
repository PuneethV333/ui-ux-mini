/**
 * Sonicverse color tokens.
 * Extracted from the Sonicverse brand artwork: deep space violet base,
 * magenta / violet nebulae, electric blue orbit trails and a warm gold core.
 */
export const colors = {
  // Canvas
  background: '#05030F',
  backgroundDeep: '#03020A',
  backgroundElevated: '#0A0619',
  nebula: '#1B0B3A',
  nebulaSoft: '#2A1055',

  // Surfaces
  surface: '#120B26',
  surfaceAlt: '#1A1134',
  surfaceRaised: '#211641',
  surfaceGlass: 'rgba(255,255,255,0.055)',
  surfaceGlassStrong: 'rgba(255,255,255,0.09)',
  overlay: 'rgba(5,3,15,0.78)',
  scrim: 'rgba(3,2,10,0.55)',

  // Brand
  primary: '#8B5CF6',
  primaryBright: '#A78BFA',
  primaryDeep: '#5B21B6',
  secondary: '#F472D0',
  secondaryDeep: '#BE3FA5',
  magenta: '#E879F9',
  pink: '#FF7AD9',
  accent: '#F0ABFC',
  cyan: '#38BDF8',
  blue: '#4F7BFF',
  gold: '#FFC46B',
  goldBright: '#FFE1A8',
  orange: '#FF8A4C',

  // Text
  text: '#F7F3FF',
  textMuted: '#B7AAD8',
  textDim: '#7C7099',
  textInverse: '#0B0618',

  // Feedback
  success: '#4ADE80',
  warning: '#FBBF24',
  danger: '#FB7185',

  // Lines & effects
  border: 'rgba(167,139,250,0.18)',
  borderStrong: 'rgba(167,139,250,0.42)',
  borderGold: 'rgba(255,196,107,0.35)',
  glow: 'rgba(139,92,246,0.45)',
  glowPink: 'rgba(244,114,208,0.40)',
  glowGold: 'rgba(255,196,107,0.32)',
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const gradients = {
  screen: ['#0B0620', '#05030F', '#03020A'] as const,
  screenSoft: ['#150A2E', '#080417', '#04020C'] as const,
  primaryButton: ['#F472D0', '#9B5CF6', '#6366F1'] as const,
  secondaryButton: ['rgba(139,92,246,0.22)', 'rgba(244,114,208,0.12)'] as const,
  card: ['rgba(38,22,74,0.92)', 'rgba(16,10,34,0.92)'] as const,
  cardActive: ['rgba(76,38,128,0.95)', 'rgba(30,16,60,0.95)'] as const,
  aurora: ['#FF7AD9', '#8B5CF6', '#38BDF8'] as const,
  gold: ['#FFE1A8', '#FFC46B', '#FF8A4C'] as const,
  violet: ['#C084FC', '#7C3AED', '#312E81'] as const,
  cyan: ['#67E8F9', '#38BDF8', '#4338CA'] as const,
  rose: ['#FDA4AF', '#F472D0', '#7E22CE'] as const,
  emerald: ['#6EE7B7', '#34D399', '#0F766E'] as const,
  indigo: ['#A5B4FC', '#6366F1', '#1E1B4B'] as const,
  ghost: ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.03)'] as const,
} as const;

export type GradientName = keyof typeof gradients;
export type ColorName = keyof typeof colors;
