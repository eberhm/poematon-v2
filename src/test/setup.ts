import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock HTMLAudioElement globally for all tests
global.Audio = vi.fn().mockImplementation(() => ({
  play: vi.fn().mockResolvedValue(undefined),
  pause: vi.fn(),
  volume: 1,
  loop: false,
  currentTime: 0,
  src: '',
})) as unknown as typeof Audio
