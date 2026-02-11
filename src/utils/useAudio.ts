import { useRef, useEffect } from 'react'

export interface UseAudioReturn {
  playMusic: () => void
  playWarning: () => void
  stopAll: () => void
}

/**
 * Custom hook for managing audio playback
 * Loads background music and warning sound with 40% volume
 * @returns Audio control functions
 */
export function useAudio(): UseAudioReturn {
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const warningRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio elements
    try {
      const baseUrl = import.meta.env.BASE_URL
      musicRef.current = new Audio(`${baseUrl}sound/music.mp3`)
      musicRef.current.volume = 0.4
      musicRef.current.loop = true

      warningRef.current = new Audio(`${baseUrl}sound/20s.mp3`)
      warningRef.current.volume = 0.4
    } catch (error) {
      console.warn('Failed to initialize audio:', error)
    }

    // Cleanup on unmount
    return () => {
      if (musicRef.current) {
        musicRef.current.pause()
        musicRef.current = null
      }
      if (warningRef.current) {
        warningRef.current.pause()
        warningRef.current = null
      }
    }
  }, [])

  const playMusic = () => {
    if (musicRef.current) {
      musicRef.current.play().catch((error) => {
        console.warn('Failed to play background music:', error)
      })
    }
  }

  const playWarning = () => {
    if (warningRef.current) {
      warningRef.current.play().catch((error) => {
        console.warn('Failed to play warning sound:', error)
      })
    }
  }

  const stopAll = () => {
    if (musicRef.current) {
      musicRef.current.pause()
      musicRef.current.currentTime = 0
    }
    if (warningRef.current) {
      warningRef.current.pause()
      warningRef.current.currentTime = 0
    }
  }

  return {
    playMusic,
    playWarning,
    stopAll,
  }
}
