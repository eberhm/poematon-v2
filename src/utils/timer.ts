import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Formats seconds into MM:SS format
 * @param seconds - Total seconds
 * @returns Formatted string like "2:05" or "0:20"
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export interface UseCountdownReturn {
  timeLeft: number
  formattedTime: string
  isRunning: boolean
  start: () => void
  stop: () => void
  reset: () => void
}

/**
 * Custom hook for countdown timer
 * @param initialSeconds - Starting countdown value
 * @param onExpire - Callback when timer reaches 0
 * @returns Timer state and controls
 */
export function useCountdown(
  initialSeconds: number,
  onExpire?: () => void
): UseCountdownReturn {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const onExpireRef = useRef(onExpire)

  // Keep callback ref updated
  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }, [])

  const start = useCallback(() => {
    if (intervalRef.current !== null) return // Already running
    setIsRunning(true)

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer expired
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setIsRunning(false)
          // Call expiry callback after state update
          setTimeout(() => {
            onExpireRef.current?.()
          }, 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  const reset = useCallback(() => {
    stop()
    setTimeLeft(initialSeconds)
  }, [initialSeconds, stop])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isRunning,
    start,
    stop,
    reset,
  }
}
