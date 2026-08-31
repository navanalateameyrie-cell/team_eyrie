import type { Locale } from './config'
import { defaultLocale } from './config'

import en from './dictionaries/en.json'
import hi from './dictionaries/hi.json'
import ta from './dictionaries/ta.json'
import te from './dictionaries/te.json'
import kn from './dictionaries/kn.json'
import ml from './dictionaries/ml.json'
import mr from './dictionaries/mr.json'
import bn from './dictionaries/bn.json'
import gu from './dictionaries/gu.json'

/**
 * Static UI strings — the chrome that is hardcoded in JSX rather than stored in
 * Payload (nav labels, footer headings, button text). CMS-authored content is
 * translated by Payload's own localization, not by this dictionary.
 *
 * `en.json` is the source of truth for the shape; every other file must have
 * the same keys. Missing keys fall back to English at runtime.
 */
export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = {
  en,
  hi: hi as Dictionary,
  ta: ta as Dictionary,
  te: te as Dictionary,
  kn: kn as Dictionary,
  ml: ml as Dictionary,
  mr: mr as Dictionary,
  bn: bn as Dictionary,
  gu: gu as Dictionary,
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[defaultLocale]
}
