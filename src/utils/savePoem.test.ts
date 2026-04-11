import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { savePoem } from './savePoem'
import type { Verse } from '../types'

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
  let clickSpy: ReturnType<typeof vi.fn>
  let createdElement: HTMLAnchorElement
  let createObjectURL: ReturnType<typeof vi.fn>
  let revokeObjectURL: ReturnType<typeof vi.fn>

  beforeEach(() => {
    clickSpy = vi.fn()

    // jsdom doesn't implement URL.createObjectURL, so assign directly
    createObjectURL = vi.fn().mockReturnValue('blob:test-url')
    revokeObjectURL = vi.fn()
    global.URL.createObjectURL = createObjectURL as typeof URL.createObjectURL
    global.URL.revokeObjectURL = revokeObjectURL as typeof URL.revokeObjectURL

    vi.spyOn(document.body, 'appendChild').mockImplementation(
      (node: Node) => node
    )
    vi.spyOn(document.body, 'removeChild').mockImplementation(
      (node: Node) => node
    )

    vi.spyOn(document, 'createElement').mockImplementation(
      (tagName: string) => {
        if (tagName === 'a') {
          createdElement = {
            href: '',
            download: '',
            click: clickSpy,
          } as unknown as HTMLAnchorElement
          return createdElement
        }
        return document.createElement(tagName)
      }
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does nothing when poemVerses is empty', () => {
    savePoem([], 'Test Author')
    expect(clickSpy).not.toHaveBeenCalled()
  })

  it('triggers a download when verses are provided', () => {
    savePoem(mockVerses, 'María García')
    expect(clickSpy).toHaveBeenCalledTimes(1)
    expect(createObjectURL).toHaveBeenCalledTimes(1)
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:test-url')
  })

  it('uses author name in filename', () => {
    savePoem(mockVerses, 'María García')
    expect(createdElement.download).toMatch(/poema-Mar/)
  })

  it('uses "anonimo" in filename when author name is empty', () => {
    savePoem(mockVerses, '')
    expect(createdElement.download).toMatch(/poema-anonimo/)
  })

  it('creates JSON blob with correct type', () => {
    savePoem(mockVerses, 'Test User')
    const blobArg = createObjectURL.mock.calls[0][0] as Blob
    expect(blobArg.type).toBe('application/json')
  })

  it('appends and removes anchor element from DOM', () => {
    savePoem(mockVerses, 'Test')
    expect(document.body.appendChild).toHaveBeenCalledTimes(1)
    expect(document.body.removeChild).toHaveBeenCalledTimes(1)
  })
})
