import { createContext } from 'react'
import type { Verse } from '../types'

export interface PoematonContextState {
  // Data
  allVerses: Verse[]
  poemVerses: Verse[]
  authorName: string

  // Timer
  timeLeft: number
  isTimerRunning: boolean
  formattedTime: string

  // UI state
  showMaxVersesAlert: boolean
  isSessionActive: boolean
  showCompletion: boolean

  // Actions
  loadVerses: (version?: string) => Promise<void>
  startSession: () => void
  addVerseToPoem: (verse: Verse, index?: number) => void
  removeVerseFromPoem: (id: string) => void
  reorderPoemVerses: (oldIndex: number, newIndex: number) => void
  handlePrint: () => void
}

export const PoematonContext = createContext<PoematonContextState | undefined>(
  undefined
)
