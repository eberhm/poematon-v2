import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAudio } from './useAudio'

describe('useAudio', () => {
  // Mock Audio constructor
  const mockPlay = vi.fn().mockResolvedValue(undefined)
  const mockPause = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock HTMLAudioElement
    global.Audio = vi.fn().mockImplementation((src: string) => ({
      src,
      volume: 1,
      loop: false,
      currentTime: 0,
      play: mockPlay,
      pause: mockPause,
    })) as unknown as typeof Audio
  })

  it('should initialize audio elements on mount', () => {
    renderHook(() => useAudio())

    expect(global.Audio).toHaveBeenCalledTimes(2)
    expect(global.Audio).toHaveBeenCalledWith('/sound/music.mp3')
    expect(global.Audio).toHaveBeenCalledWith('/sound/20s.mp3')
  })

  it('should set music volume to 0.4 and loop to true', () => {
    renderHook(() => useAudio())

    const musicCalls = (global.Audio as unknown as ReturnType<typeof vi.fn>)
      .mock.results[0]
    expect(musicCalls.value.volume).toBe(0.4)
    expect(musicCalls.value.loop).toBe(true)
  })

  it('should set warning volume to 0.4', () => {
    renderHook(() => useAudio())

    const warningCalls = (global.Audio as unknown as ReturnType<typeof vi.fn>)
      .mock.results[1]
    expect(warningCalls.value.volume).toBe(0.4)
  })

  it('should play music when playMusic is called', () => {
    const { result } = renderHook(() => useAudio())

    result.current.playMusic()

    expect(mockPlay).toHaveBeenCalledTimes(1)
  })

  it('should play warning when playWarning is called', () => {
    const { result } = renderHook(() => useAudio())

    result.current.playWarning()

    expect(mockPlay).toHaveBeenCalledTimes(1)
  })

  it('should stop all audio when stopAll is called', () => {
    const { result } = renderHook(() => useAudio())

    result.current.stopAll()

    expect(mockPause).toHaveBeenCalledTimes(2)
  })

  it('should reset currentTime to 0 when stopping', () => {
    const { result } = renderHook(() => useAudio())

    result.current.stopAll()

    const musicAudio = (global.Audio as unknown as ReturnType<typeof vi.fn>)
      .mock.results[0].value
    const warningAudio = (global.Audio as unknown as ReturnType<typeof vi.fn>)
      .mock.results[1].value

    expect(musicAudio.currentTime).toBe(0)
    expect(warningAudio.currentTime).toBe(0)
  })

  it('should cleanup audio on unmount', () => {
    const { unmount } = renderHook(() => useAudio())

    unmount()

    expect(mockPause).toHaveBeenCalledTimes(2)
  })

  it('should handle play errors gracefully', async () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})
    mockPlay.mockRejectedValueOnce(new Error('Play failed'))

    const { result } = renderHook(() => useAudio())

    result.current.playMusic()

    // Wait for promise rejection
    await vi.waitFor(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Failed to play background music:',
        expect.any(Error)
      )
    })

    consoleWarnSpy.mockRestore()
  })

  it('should handle Audio constructor errors gracefully', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})
    global.Audio = vi.fn().mockImplementation(() => {
      throw new Error('Audio not supported')
    }) as unknown as typeof Audio

    renderHook(() => useAudio())

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Failed to initialize audio:',
      expect.any(Error)
    )

    consoleWarnSpy.mockRestore()
  })
})
