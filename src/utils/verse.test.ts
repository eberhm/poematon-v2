import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { regenerateVerseId, shuffleVerses } from './verse'
import type { Verse } from '../types'

describe('verse utilities', () => {
  describe('regenerateVerseId', () => {
    const mockVerse: Verse = {
      id: 'original-id',
      value: 'Solo en el silencio',
      autor: 'Test Author',
      poema: 'Test Poem',
      poemario: 'Test Collection',
    }

    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should regenerate verse ID with timestamp suffix', () => {
      const now = 1707234567890
      vi.setSystemTime(now)

      const result = regenerateVerseId(mockVerse)

      expect(result.id).toBe(`original-id-${now}`)
      expect(result.value).toBe(mockVerse.value)
      expect(result.autor).toBe(mockVerse.autor)
      expect(result.poema).toBe(mockVerse.poema)
      expect(result.poemario).toBe(mockVerse.poemario)
    })

    it('should not mutate original verse', () => {
      const original = { ...mockVerse }
      regenerateVerseId(mockVerse)

      expect(mockVerse).toEqual(original)
    })

    it('should generate different IDs for same verse at different times', () => {
      vi.setSystemTime(1000)
      const first = regenerateVerseId(mockVerse)

      vi.setSystemTime(2000)
      const second = regenerateVerseId(mockVerse)

      expect(first.id).toBe('original-id-1000')
      expect(second.id).toBe('original-id-2000')
      expect(first.id).not.toBe(second.id)
    })
  })

  describe('shuffleVerses', () => {
    const mockVerses: Verse[] = [
      {
        id: '1',
        value: 'First verse',
        autor: 'Author 1',
        poema: 'Poem 1',
        poemario: 'Collection 1',
      },
      {
        id: '2',
        value: 'Second verse',
        autor: 'Author 2',
        poema: 'Poem 2',
        poemario: 'Collection 2',
      },
      {
        id: '3',
        value: 'Third verse',
        autor: 'Author 3',
        poema: 'Poem 3',
        poemario: 'Collection 3',
      },
    ]

    it('should return array with same length', () => {
      const shuffled = shuffleVerses(mockVerses)
      expect(shuffled).toHaveLength(mockVerses.length)
    })

    it('should contain all original verses', () => {
      const shuffled = shuffleVerses(mockVerses)
      mockVerses.forEach((verse) => {
        expect(shuffled).toContainEqual(verse)
      })
    })

    it('should not mutate original array', () => {
      const original = [...mockVerses]
      shuffleVerses(mockVerses)
      expect(mockVerses).toEqual(original)
    })

    it('should handle empty array', () => {
      const shuffled = shuffleVerses([])
      expect(shuffled).toEqual([])
    })

    it('should handle single element array', () => {
      const single = [mockVerses[0]]
      const shuffled = shuffleVerses(single)
      expect(shuffled).toEqual(single)
    })

    it('should produce different order (statistically)', () => {
      // Mock Math.random to ensure shuffling happens
      const mockRandom = vi.spyOn(Math, 'random')
      mockRandom.mockReturnValueOnce(0.9)
      mockRandom.mockReturnValueOnce(0.1)

      const shuffled = shuffleVerses(mockVerses)

      // With controlled random, we should get a different order
      const isDifferent = shuffled.some((verse, idx) => verse.id !== mockVerses[idx].id)
      expect(isDifferent).toBe(true)

      mockRandom.mockRestore()
    })
  })
})
