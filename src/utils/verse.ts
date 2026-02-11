import type { Verse } from '../types'

/**
 * Regenerates a verse ID with a timestamp suffix to allow reusability
 * @param verse - Original verse
 * @returns New verse with regenerated ID (original-id-timestamp)
 */
export function regenerateVerseId(verse: Verse): Verse {
  const timestamp = Date.now()
  return {
    ...verse,
    id: `${verse.id}-${timestamp}`,
  }
}

/**
 * Shuffles an array of verses using Fisher-Yates algorithm
 * @param verses - Array of verses to shuffle
 * @returns New shuffled array (does not mutate original)
 */
export function shuffleVerses(verses: Verse[]): Verse[] {
  const shuffled = [...verses]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
