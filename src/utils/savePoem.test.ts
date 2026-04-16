import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { Verse } from '../types'

vi.mock('./poemStorage', () => ({
  savePoem: vi.fn(),
}))

const mockVerses: Verse[] = [
  {
    id: 'verse-1',
    value: 'Solo en el silencio',
    autor: 'Federico García Lorca',
    poema: 'Poeta en Nueva York',
    poemario: 'Obras completas',
  },
  {
    id: 'verse-2',
    value: 'Verde que te quiero verde',
    autor: 'Federico García Lorca',
    poema: 'Romance Sonámbulo',
    poemario: 'Romancero gitano',
  },
]

describe('savePoem', () => {
  let savePoemWrapper: typeof import('./savePoem').savePoem
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSaveToDB: any

  beforeEach(async () => {
    const storage = await import('./poemStorage')
    mockSaveToDB = vi.mocked(storage.savePoem)
    mockSaveToDB.mockResolvedValue(undefined)
    const wrapper = await import('./savePoem')
    savePoemWrapper = wrapper.savePoem
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('calls poemStorage.savePoem with verses', () => {
    savePoemWrapper(mockVerses)
    expect(mockSaveToDB).toHaveBeenCalledWith(mockVerses)
  })

  it('still calls poemStorage.savePoem with empty verses (storage handles guard)', () => {
    savePoemWrapper([])
    expect(mockSaveToDB).toHaveBeenCalledWith([])
  })

  it('does not throw when poemStorage.savePoem rejects', async () => {
    const error = new Error('IndexedDB unavailable')
    mockSaveToDB.mockRejectedValueOnce(error)
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    savePoemWrapper(mockVerses)
    // Flush the microtask queue
    await new Promise((r) => setTimeout(r, 0))
    expect(warnSpy).toHaveBeenCalled()
    warnSpy.mockRestore()
  })
})
