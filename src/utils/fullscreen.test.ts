import { describe, it, expect, vi, afterEach } from 'vitest'
import { enterFullscreen, exitFullscreen, isFullscreen } from './fullscreen'

describe('fullscreen', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('enterFullscreen', () => {
    it('calls requestFullscreen on document.documentElement', () => {
      const mockRequestFullscreen = vi.fn().mockResolvedValue(undefined)
      Object.defineProperty(document.documentElement, 'requestFullscreen', {
        value: mockRequestFullscreen,
        configurable: true,
      })
      enterFullscreen()
      expect(mockRequestFullscreen).toHaveBeenCalled()
    })

    it('warns on requestFullscreen rejection', async () => {
      const error = new Error('denied')
      const mockRequestFullscreen = vi.fn().mockRejectedValue(error)
      Object.defineProperty(document.documentElement, 'requestFullscreen', {
        value: mockRequestFullscreen,
        configurable: true,
      })
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      enterFullscreen()
      await new Promise((r) => setTimeout(r, 0))
      expect(warnSpy).toHaveBeenCalled()
    })
  })

  describe('exitFullscreen', () => {
    it('calls exitFullscreen when in fullscreen', () => {
      const mockExitFullscreen = vi.fn().mockResolvedValue(undefined)
      Object.defineProperty(document, 'fullscreenElement', {
        value: document.body,
        configurable: true,
      })
      Object.defineProperty(document, 'exitFullscreen', {
        value: mockExitFullscreen,
        configurable: true,
      })
      exitFullscreen()
      expect(mockExitFullscreen).toHaveBeenCalled()
    })

    it('does nothing when not in fullscreen', () => {
      Object.defineProperty(document, 'fullscreenElement', {
        value: null,
        configurable: true,
      })
      // Should not throw
      expect(() => exitFullscreen()).not.toThrow()
    })
  })

  describe('isFullscreen', () => {
    it('returns true when fullscreenElement is set', () => {
      Object.defineProperty(document, 'fullscreenElement', {
        value: document.body,
        configurable: true,
      })
      expect(isFullscreen()).toBe(true)
    })

    it('returns false when fullscreenElement is null', () => {
      Object.defineProperty(document, 'fullscreenElement', {
        value: null,
        configurable: true,
      })
      expect(isFullscreen()).toBe(false)
    })
  })
})
