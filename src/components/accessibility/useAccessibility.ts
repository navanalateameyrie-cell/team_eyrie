'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type {
  AccessibilityState,
  AccessibilityProfile,
  ProfileId,
  ContrastMode,
  SaturationMode,
  CursorMode,
  TextAlignMode,
  LineHeightMode,
  LetterSpacingMode,
} from './types'

export const DEFAULT_A11Y_STATE: AccessibilityState = {
  activeProfile: null,
  fontSize: 100,
  lineHeight: 'normal',
  letterSpacing: 'normal',
  textAlign: 'initial',
  dyslexiaFont: false,
  highlightLinks: false,
  highlightTitles: false,
  textMagnifier: false,
  contrast: 'none',
  saturation: 'normal',
  readingMask: false,
  readingGuide: false,
  bigCursor: 'none',
  stopAnimations: false,
  muteAudio: false,
}

export const PROFILES: AccessibilityProfile[] = [
  {
    id: 'seizure-safe',
    title: 'Seizure Safe Profile',
    subtitle: 'Clear flashes & reduce color',
    description: 'Eliminates flash risks and reduces saturation for epileptic & seizure safety.',
    badgeIcon: '⚡',
    settings: {
      stopAnimations: true,
      saturation: 'low',
      contrast: 'none',
    },
  },
  {
    id: 'vision-impaired',
    title: 'Vision Impaired Profile',
    subtitle: 'Enhance visual clarity',
    description: 'Enlarges text, enhances contrast and sharpens focus for visual assistance.',
    badgeIcon: '👁️',
    settings: {
      fontSize: 120,
      contrast: 'dark',
      highlightTitles: true,
      highlightLinks: true,
    },
  },
  {
    id: 'adhd-friendly',
    title: 'ADHD Friendly Profile',
    subtitle: 'Focused reading & mask',
    description: 'Reduces screen clutter and isolates focal reading areas.',
    badgeIcon: '🎯',
    settings: {
      readingMask: true,
      stopAnimations: true,
      highlightTitles: true,
    },
  },
  {
    id: 'cognitive-learning',
    title: 'Cognitive & Learning',
    subtitle: 'Structured reading aid',
    description: 'Assists comprehension with highlighted headings, clean links, and spaced layout.',
    badgeIcon: '🧠',
    settings: {
      highlightTitles: true,
      highlightLinks: true,
      lineHeight: '1.8',
      letterSpacing: 'wide',
    },
  },
  {
    id: 'dyslexia',
    title: 'Dyslexia Profile',
    subtitle: 'High-legibility typography',
    description: 'Applies OpenDyslexic typeface with increased tracking and line spacing.',
    badgeIcon: '📖',
    settings: {
      dyslexiaFont: true,
      lineHeight: '1.8',
      letterSpacing: 'wide',
    },
  },
  {
    id: 'keyboard-navigation',
    title: 'Motor & Keyboard',
    subtitle: 'Enhanced focus & cursor',
    description: 'Provides high-visibility large pointers and distinct actionable outlines.',
    badgeIcon: '⌨️',
    settings: {
      bigCursor: 'black',
      highlightLinks: true,
      stopAnimations: true,
    },
  },
  {
    id: 'blind-screen-reader',
    title: 'Blind / Screen Reader',
    subtitle: 'Screen reader optimization',
    description: 'Highlights semantic structure and prepares content for assistive speech output.',
    badgeIcon: '🔊',
    settings: {
      highlightTitles: true,
      highlightLinks: true,
      stopAnimations: true,
    },
  },
]

const STORAGE_KEY = 'a11y-preferences'

export function useAccessibility() {
  const [state, setState] = useState<AccessibilityState>(DEFAULT_A11Y_STATE)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [isHydrated, setIsHydrated] = useState<boolean>(false)

  // 1. Hydrate preferences from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setState((prev) => ({ ...prev, ...parsed }))
      }
    } catch {
      // Storage unavailable or disabled
    }
    setIsHydrated(true)
  }, [])

  // 2. Persist state and apply DOM attributes
  useEffect(() => {
    if (!isHydrated || typeof document === 'undefined') return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Ignore storage errors
    }

    const root = document.documentElement

    // Font scaling
    if (state.fontSize !== 100) {
      root.setAttribute('data-a11y-font-scale', state.fontSize.toString())
    } else {
      root.removeAttribute('data-a11y-font-scale')
    }

    // Line height
    if (state.lineHeight !== 'normal') {
      root.setAttribute('data-a11y-line-height', state.lineHeight)
    } else {
      root.removeAttribute('data-a11y-line-height')
    }

    // Letter spacing
    if (state.letterSpacing !== 'normal') {
      root.setAttribute('data-a11y-letter-spacing', state.letterSpacing)
    } else {
      root.removeAttribute('data-a11y-letter-spacing')
    }

    // Text align
    if (state.textAlign !== 'initial') {
      root.setAttribute('data-a11y-align', state.textAlign)
    } else {
      root.removeAttribute('data-a11y-align')
    }

    // Dyslexia font
    if (state.dyslexiaFont) {
      root.setAttribute('data-a11y-dyslexia', 'true')
    } else {
      root.removeAttribute('data-a11y-dyslexia')
    }

    // Highlight links
    if (state.highlightLinks) {
      root.setAttribute('data-a11y-highlight-links', 'true')
    } else {
      root.removeAttribute('data-a11y-highlight-links')
    }

    // Highlight titles
    if (state.highlightTitles) {
      root.setAttribute('data-a11y-highlight-titles', 'true')
    } else {
      root.removeAttribute('data-a11y-highlight-titles')
    }

    // Contrast
    if (state.contrast !== 'none') {
      root.setAttribute('data-a11y-contrast', state.contrast)
    } else {
      root.removeAttribute('data-a11y-contrast')
    }

    // Saturation
    if (state.saturation !== 'normal') {
      root.setAttribute('data-a11y-saturation', state.saturation)
    } else {
      root.removeAttribute('data-a11y-saturation')
    }

    // Big cursor
    if (state.bigCursor !== 'none') {
      root.setAttribute('data-a11y-cursor', state.bigCursor)
    } else {
      root.removeAttribute('data-a11y-cursor')
    }

    // Stop animations
    if (state.stopAnimations) {
      root.setAttribute('data-a11y-stop-animations', 'true')
    } else {
      root.removeAttribute('data-a11y-stop-animations')
    }
  }, [state, isHydrated])

  // 3. Action Toggles
  const toggleProfile = useCallback((profileId: ProfileId) => {
    setState((prev) => {
      if (prev.activeProfile === profileId) {
        // Toggle off: revert to default
        return { ...DEFAULT_A11Y_STATE }
      }
      const target = PROFILES.find((p) => p.id === profileId)
      if (!target) return prev

      return {
        ...DEFAULT_A11Y_STATE,
        activeProfile: profileId,
        ...target.settings,
      }
    })
  }, [])

  const setFontSize = useCallback((val: number) => {
    setState((prev) => ({
      ...prev,
      activeProfile: null,
      fontSize: Math.min(150, Math.max(100, val)),
    }))
  }, [])

  const setLineHeight = useCallback((mode: LineHeightMode) => {
    setState((prev) => ({ ...prev, activeProfile: null, lineHeight: mode }))
  }, [])

  const setLetterSpacing = useCallback((mode: LetterSpacingMode) => {
    setState((prev) => ({ ...prev, activeProfile: null, letterSpacing: mode }))
  }, [])

  const setTextAlign = useCallback((mode: TextAlignMode) => {
    setState((prev) => ({ ...prev, activeProfile: null, textAlign: mode }))
  }, [])

  const toggleDyslexiaFont = useCallback(() => {
    setState((prev) => ({ ...prev, activeProfile: null, dyslexiaFont: !prev.dyslexiaFont }))
  }, [])

  const toggleHighlightLinks = useCallback(() => {
    setState((prev) => ({ ...prev, activeProfile: null, highlightLinks: !prev.highlightLinks }))
  }, [])

  const toggleHighlightTitles = useCallback(() => {
    setState((prev) => ({ ...prev, activeProfile: null, highlightTitles: !prev.highlightTitles }))
  }, [])

  const toggleTextMagnifier = useCallback(() => {
    setState((prev) => ({ ...prev, activeProfile: null, textMagnifier: !prev.textMagnifier }))
  }, [])

  const setContrast = useCallback((mode: ContrastMode) => {
    setState((prev) => ({
      ...prev,
      activeProfile: null,
      contrast: prev.contrast === mode ? 'none' : mode,
    }))
  }, [])

  const setSaturation = useCallback((mode: SaturationMode) => {
    setState((prev) => ({
      ...prev,
      activeProfile: null,
      saturation: prev.saturation === mode ? 'normal' : mode,
    }))
  }, [])

  const toggleReadingMask = useCallback(() => {
    setState((prev) => ({ ...prev, activeProfile: null, readingMask: !prev.readingMask }))
  }, [])

  const toggleReadingGuide = useCallback(() => {
    setState((prev) => ({ ...prev, activeProfile: null, readingGuide: !prev.readingGuide }))
  }, [])

  const setCursor = useCallback((mode: CursorMode) => {
    setState((prev) => ({
      ...prev,
      activeProfile: null,
      bigCursor: prev.bigCursor === mode ? 'none' : mode,
    }))
  }, [])

  const toggleStopAnimations = useCallback(() => {
    setState((prev) => ({ ...prev, activeProfile: null, stopAnimations: !prev.stopAnimations }))
  }, [])

  const resetAll = useCallback(() => {
    setState(DEFAULT_A11Y_STATE)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }, [])

  // 5. Speech Synthesizer (TTS)
  const speakSelectedText = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const selected = window.getSelection()?.toString().trim()
    const textToRead =
      selected && selected.length > 0
        ? selected
        : document.querySelector('main')?.textContent?.slice(0, 500) ||
        document.body.textContent?.slice(0, 500) ||
        'Please select any text on the page to read aloud.'

    const utterance = new SpeechSynthesisUtterance(textToRead)
    utterance.rate = 0.95
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }, [])

  // 6. Active features count for badge
  const activeCount = Object.entries(state).filter(([key, val]) => {
    if (key === 'activeProfile') return val !== null
    if (key === 'fontSize') return val !== 100
    if (key === 'lineHeight' || key === 'letterSpacing') return val !== 'normal'
    if (key === 'textAlign') return val !== 'initial'
    if (key === 'contrast' || key === 'bigCursor') return val !== 'none'
    if (key === 'saturation') return val !== 'normal'
    return Boolean(val)
  }).length

  return {
    state,
    isSpeaking,
    activeCount,
    toggleProfile,
    setFontSize,
    setLineHeight,
    setLetterSpacing,
    setTextAlign,
    toggleDyslexiaFont,
    toggleHighlightLinks,
    toggleHighlightTitles,
    toggleTextMagnifier,
    setContrast,
    setSaturation,
    toggleReadingMask,
    toggleReadingGuide,
    setCursor,
    toggleStopAnimations,
    resetAll,
    speakSelectedText,
  }
}

