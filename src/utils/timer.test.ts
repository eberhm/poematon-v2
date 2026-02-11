import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { formatTime, useCountdown } from './timer'

describe('timer utilities', () => {
  describe('formatTime', () => {
    it('should format seconds into MM:SS', () => {
      expect(formatTime(180)).toBe('3:00')
      expect(formatTime(125)).toBe('2:05')
      expect(formatTime(20)).toBe('0:20')
      expect(formatTime(0)).toBe('0:00')
    })

    it('should pad single digit seconds', () => {
      expect(formatTime(61)).toBe('1:01')
      expect(formatTime(5)).toBe('0:05')
    })

    it('should handle large values', () => {
      expect(formatTime(3600)).toBe('60:00')
      expect(formatTime(659)).toBe('10:59')
    })
  })

  describe('useCountdown', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should initialize with correct values', () => {
      const { result } = renderHook(() => useCountdown(180))

      expect(result.current.timeLeft).toBe(180)
      expect(result.current.formattedTime).toBe('3:00')
      expect(result.current.isRunning).toBe(false)
    })

    it('should start countdown when start is called', () => {
      const { result } = renderHook(() => useCountdown(10))

      act(() => {
        result.current.start()
      })

      expect(result.current.isRunning).toBe(true)

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(result.current.timeLeft).toBe(9)
      expect(result.current.formattedTime).toBe('0:09')
    })

    it('should countdown every second', () => {
      const { result } = renderHook(() => useCountdown(5))

      act(() => {
        result.current.start()
      })

      act(() => {
        vi.advanceTimersByTime(3000)
      })

      expect(result.current.timeLeft).toBe(2)
    })

    it('should stop when stop is called', () => {
      const { result } = renderHook(() => useCountdown(10))

      act(() => {
        result.current.start()
        vi.advanceTimersByTime(2000)
      })

      expect(result.current.timeLeft).toBe(8)

      act(() => {
        result.current.stop()
      })

      expect(result.current.isRunning).toBe(false)

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      // Should not continue counting
      expect(result.current.timeLeft).toBe(8)
    })

    it('should reset to initial value', () => {
      const { result } = renderHook(() => useCountdown(10))

      act(() => {
        result.current.start()
        vi.advanceTimersByTime(5000)
      })

      expect(result.current.timeLeft).toBe(5)

      act(() => {
        result.current.reset()
      })

      expect(result.current.timeLeft).toBe(10)
      expect(result.current.isRunning).toBe(false)
    })

    it('should call onExpire when timer reaches 0', () => {
      const onExpire = vi.fn()
      const { result } = renderHook(() => useCountdown(3, onExpire))

      act(() => {
        result.current.start()
      })

      act(() => {
        vi.advanceTimersByTime(3000)
      })

      expect(result.current.timeLeft).toBe(0)
      expect(result.current.isRunning).toBe(false)

      // Wait for setTimeout in expiry callback
      act(() => {
        vi.runAllTimers()
      })

      expect(onExpire).toHaveBeenCalledTimes(1)
    })

    it('should stop automatically at 0', () => {
      const { result } = renderHook(() => useCountdown(2))

      act(() => {
        result.current.start()
        vi.advanceTimersByTime(3000)
      })

      expect(result.current.timeLeft).toBe(0)
      expect(result.current.isRunning).toBe(false)
    })

    it('should not start multiple timers', () => {
      const { result } = renderHook(() => useCountdown(10))

      act(() => {
        result.current.start()
        result.current.start() // Try to start again
        vi.advanceTimersByTime(1000)
      })

      // Should only tick once
      expect(result.current.timeLeft).toBe(9)
    })

    it('should cleanup interval on unmount', () => {
      const { result, unmount } = renderHook(() => useCountdown(10))

      act(() => {
        result.current.start()
      })

      unmount()

      // Should not throw
      act(() => {
        vi.advanceTimersByTime(2000)
      })
    })
  })
})
