import type { Verse } from '../types'
import { regenerateVerseId } from './verse'

const MAX_VERSES = 8

/**
 * Checks if a verse can be added to the poem
 * @param poemVerses - Current verses in the poem
 * @returns true if poem has less than 8 verses
 */
export function canAddVerseToPoem(poemVerses: Verse[]): boolean {
  return poemVerses.length < MAX_VERSES
}

/**
 * Adds a verse to the poem with regenerated ID
 * @param poemVerses - Current verses in the poem
 * @param verse - Verse to add
 * @returns New array with added verse (regenerated ID), or original if max reached
 */
export function addVerseToPoem(poemVerses: Verse[], verse: Verse, index?: number): Verse[] {
  if (!canAddVerseToPoem(poemVerses)) {
    return poemVerses
  }
  const verseWithNewId = regenerateVerseId(verse)
  if (index !== undefined && index >= 0 && index <= poemVerses.length) {
    const result = [...poemVerses]
    result.splice(index, 0, verseWithNewId)
    return result
  }
  return [...poemVerses, verseWithNewId]
}

/**
 * Removes a verse from the poem by ID
 * @param poemVerses - Current verses in the poem
 * @param id - ID of verse to remove
 * @returns New array without the specified verse
 */
export function removeVerseFromPoem(poemVerses: Verse[], id: string): Verse[] {
  return poemVerses.filter((verse) => verse.id !== id)
}

/**
 * Reorders verses in the poem
 * @param poemVerses - Current verses in the poem
 * @param oldIndex - Current index of verse to move
 * @param newIndex - Target index
 * @returns New array with reordered verses
 */
export function reorderPoemVerses(
  poemVerses: Verse[],
  oldIndex: number,
  newIndex: number
): Verse[] {
  if (
    oldIndex < 0 ||
    oldIndex >= poemVerses.length ||
    newIndex < 0 ||
    newIndex >= poemVerses.length
  ) {
    return poemVerses
  }

  const result = [...poemVerses]
  const [removed] = result.splice(oldIndex, 1)
  result.splice(newIndex, 0, removed)
  return result
}
