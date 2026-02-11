import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  canAddVerseToPoem,
  addVerseToPoem,
  removeVerseFromPoem,
  reorderPoemVerses,
} from './board'
import type { Verse } from '../types'

describe('board utilities', () => {
  const mockVerse: Verse = {
    id: 'verse-1',
    value: 'Test verse',
    autor: 'Test Author',
    poema: 'Test Poem',
    poemario: 'Test Collection',
  }

  const createVerses = (count: number): Verse[] =>
    Array.from({ length: count }, (_, i) => ({
      ...mockVerse,
      id: `verse-${i + 1}`,
      value: `Verse ${i + 1}`,
    }))

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('canAddVerseToPoem', () => {
    it('should return true when poem has less than 8 verses', () => {
      expect(canAddVerseToPoem([])).toBe(true)
      expect(canAddVerseToPoem(createVerses(1))).toBe(true)
      expect(canAddVerseToPoem(createVerses(7))).toBe(true)
    })

    it('should return false when poem has 8 verses', () => {
      expect(canAddVerseToPoem(createVerses(8))).toBe(false)
    })

    it('should return false when poem has more than 8 verses', () => {
      expect(canAddVerseToPoem(createVerses(9))).toBe(false)
    })
  })

  describe('addVerseToPoem', () => {
    it('should add verse with regenerated ID', () => {
      const timestamp = 1707234567890
      vi.setSystemTime(timestamp)

      const poem = createVerses(2)
      const newVerse: Verse = {
        id: 'original-id',
        value: 'New verse',
        autor: 'Author',
        poema: 'Poem',
        poemario: 'Collection',
      }

      const result = addVerseToPoem(poem, newVerse)

      expect(result).toHaveLength(3)
      expect(result[2].id).toBe(`original-id-${timestamp}`)
      expect(result[2].value).toBe('New verse')
    })

    it('should not mutate original array', () => {
      const poem = createVerses(2)
      const original = [...poem]

      addVerseToPoem(poem, mockVerse)

      expect(poem).toEqual(original)
    })

    it('should not add verse when poem has 8 verses', () => {
      const poem = createVerses(8)
      const result = addVerseToPoem(poem, mockVerse)

      expect(result).toEqual(poem)
      expect(result).toHaveLength(8)
    })

    it('should allow adding same verse multiple times with different IDs', () => {
      vi.setSystemTime(1000)
      const poem1 = addVerseToPoem([], mockVerse)

      vi.setSystemTime(2000)
      const poem2 = addVerseToPoem(poem1, mockVerse)

      expect(poem2).toHaveLength(2)
      expect(poem2[0].id).toBe('verse-1-1000')
      expect(poem2[1].id).toBe('verse-1-2000')
      expect(poem2[0].value).toBe(poem2[1].value)
    })
  })

  describe('removeVerseFromPoem', () => {
    it('should remove verse by ID', () => {
      const poem = createVerses(3)
      const result = removeVerseFromPoem(poem, 'verse-2')

      expect(result).toHaveLength(2)
      expect(result.map((v) => v.id)).toEqual(['verse-1', 'verse-3'])
    })

    it('should not mutate original array', () => {
      const poem = createVerses(3)
      const original = [...poem]

      removeVerseFromPoem(poem, 'verse-2')

      expect(poem).toEqual(original)
    })

    it('should return unchanged array if ID not found', () => {
      const poem = createVerses(3)
      const result = removeVerseFromPoem(poem, 'nonexistent')

      expect(result).toEqual(poem)
      expect(result).toHaveLength(3)
    })

    it('should handle empty array', () => {
      const result = removeVerseFromPoem([], 'verse-1')
      expect(result).toEqual([])
    })
  })

  describe('reorderPoemVerses', () => {
    it('should move verse from old index to new index', () => {
      const poem = createVerses(4)
      // Move verse-2 (index 1) to index 3
      const result = reorderPoemVerses(poem, 1, 3)

      expect(result.map((v) => v.id)).toEqual([
        'verse-1',
        'verse-3',
        'verse-4',
        'verse-2',
      ])
    })

    it('should move verse forward', () => {
      const poem = createVerses(3)
      // Move verse-1 (index 0) to index 2
      const result = reorderPoemVerses(poem, 0, 2)

      expect(result.map((v) => v.id)).toEqual(['verse-2', 'verse-3', 'verse-1'])
    })

    it('should move verse backward', () => {
      const poem = createVerses(3)
      // Move verse-3 (index 2) to index 0
      const result = reorderPoemVerses(poem, 2, 0)

      expect(result.map((v) => v.id)).toEqual(['verse-3', 'verse-1', 'verse-2'])
    })

    it('should not mutate original array', () => {
      const poem = createVerses(3)
      const original = [...poem]

      reorderPoemVerses(poem, 0, 2)

      expect(poem).toEqual(original)
    })

    it('should return unchanged array if indices are the same', () => {
      const poem = createVerses(3)
      const result = reorderPoemVerses(poem, 1, 1)

      expect(result).toEqual(poem)
    })

    it('should return unchanged array if oldIndex is out of bounds', () => {
      const poem = createVerses(3)

      expect(reorderPoemVerses(poem, -1, 1)).toEqual(poem)
      expect(reorderPoemVerses(poem, 5, 1)).toEqual(poem)
    })

    it('should return unchanged array if newIndex is out of bounds', () => {
      const poem = createVerses(3)

      expect(reorderPoemVerses(poem, 1, -1)).toEqual(poem)
      expect(reorderPoemVerses(poem, 1, 5)).toEqual(poem)
    })

    it('should handle edge case of moving to adjacent position', () => {
      const poem = createVerses(3)
      const result = reorderPoemVerses(poem, 0, 1)

      expect(result.map((v) => v.id)).toEqual(['verse-2', 'verse-1', 'verse-3'])
    })
  })
})
