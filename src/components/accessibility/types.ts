export type ContrastMode = 'none' | 'dark' | 'light' | 'invert' | 'monochrome'
export type SaturationMode = 'normal' | 'low' | 'high'
export type CursorMode = 'none' | 'white' | 'black'
export type TextAlignMode = 'initial' | 'left' | 'center' | 'right' | 'justify'
export type LineHeightMode = 'normal' | '1.8' | '2.2'
export type LetterSpacingMode = 'normal' | 'wide' | 'extra-wide'

export type ProfileId =
  | 'seizure-safe'
  | 'vision-impaired'
  | 'adhd-friendly'
  | 'cognitive-learning'
  | 'keyboard-navigation'
  | 'dyslexia'
  | 'blind-screen-reader'

export interface AccessibilityState {
  // Profiles
  activeProfile: ProfileId | null

  // Typography & Content
  fontSize: number // 100, 110, 120, 130, 140, 150
  lineHeight: LineHeightMode
  letterSpacing: LetterSpacingMode
  textAlign: TextAlignMode
  dyslexiaFont: boolean
  highlightLinks: boolean
  highlightTitles: boolean
  textMagnifier: boolean

  // Colors & Contrast
  contrast: ContrastMode
  saturation: SaturationMode

  // Reading & Focus Aids
  readingMask: boolean
  readingGuide: boolean
  bigCursor: CursorMode
  stopAnimations: boolean
  muteAudio: boolean
}

export interface AccessibilityProfile {
  id: ProfileId
  title: string
  subtitle: string
  description: string
  badgeIcon: string
  settings: Partial<AccessibilityState>
}

export interface AccessibilityWidgetProps {
  /**
   * Position of the floating launcher button on screen.
   * Default: 'bottom-left' (avoids overlap with bottom-right widgets like cookie banners)
   */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  /** Vertical offset from bottom in pixels (default: 28) */
  offsetBottom?: number
  /** Horizontal offset from left in pixels (default: 24) */
  offsetLeft?: number
  /** Horizontal offset from right in pixels (default: 24) */
  offsetRight?: number
  /** Vertical offset from top in pixels (default: 24) */
  offsetTop?: number
  /** Primary brand color for the accessibility badge/headers (default: '#1f3864') */
  primaryColor?: string
  /** Accent color for highlights/active states (default: '#123B6D') */
  accentColor?: string
  /** CSS z-index for the widget and overlay tools (default: 99999) */
  zIndex?: number
  /** Initial open state of the panel (default: false) */
  defaultOpen?: boolean
  /** Optional custom CSS class */
  className?: string
}

