import React, { useState, useCallback, ReactNode } from 'react'
import type { Verse } from '../types'
import { loadVerses as loadVersesData, getVersionFromURL } from '../data'
import { shuffleVerses } from '../utils/verse'
import {
  canAddVerseToPoem,
  addVerseToPoem as addVerse,
  removeVerseFromPoem as removeVerse,
  reorderPoemVerses as reorderVerses,
} from '../utils/board'
import { useCountdown } from '../utils/timer'
import { useAudio } from '../utils/useAudio'
import { savePoem } from '../utils/savePoem'
import {
  PoematonContext,
  type PoematonContextState,
} from './PoematonContextDef'

export type { PoematonContextState }

export interface PoematonProviderProps {
  children: ReactNode
  authorName: string
}

const TIMER_DURATION = 180 // 3 minutes in seconds
const WARNING_TIME = 20 // Play warning at 20 seconds

export function PoematonProvider({
  children,
  authorName,
}: PoematonProviderProps) {
  const [allVerses, setAllVerses] = useState<Verse[]>([])
  const [poemVerses, setPoemVerses] = useState<Verse[]>([])
  const [showMaxVersesAlert, setShowMaxVersesAlert] = useState(false)
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)
  const [warningPlayed, setWarningPlayed] = useState(false)

  const { playMusic, playWarning, stopAll } = useAudio()

  const handleTimerExpire = useCallback(() => {
    stopAll()
    savePoem(poemVerses, authorName)
    window.print()
    setShowCompletion(true)
    setIsSessionActive(false)

    // Auto-reload after 10 seconds
    setTimeout(() => {
      window.location.reload()
    }, 10000)
  }, [stopAll, poemVerses, authorName])

  const {
    timeLeft,
    formattedTime,
    isRunning,
    start: startTimer,
  } = useCountdown(TIMER_DURATION, handleTimerExpire)

  // Play warning sound at 20 seconds
  React.useEffect(() => {
    if (timeLeft === WARNING_TIME && !warningPlayed && isRunning) {
      playWarning()
      setWarningPlayed(true)
    }
  }, [timeLeft, warningPlayed, isRunning, playWarning])

  const loadVerses = useCallback(async (version?: string) => {
    try {
      const versionToLoad = version || getVersionFromURL()
      const verses = await loadVersesData(versionToLoad)
      const shuffled = shuffleVerses(verses)
      setAllVerses(shuffled)
    } catch (error) {
      console.error('Failed to load verses:', error)
    }
  }, [])

  const startSession = useCallback(() => {
    setIsSessionActive(true)
    setWarningPlayed(false)
    startTimer()
    playMusic()
  }, [startTimer, playMusic])

  const addVerseToPoem = useCallback(
    (verse: Verse, index?: number) => {
      if (!canAddVerseToPoem(poemVerses)) {
        return
      }

      const newPoemVerses = addVerse(poemVerses, verse, index)
      setPoemVerses(newPoemVerses)
      if (!canAddVerseToPoem(newPoemVerses)) {
        setShowMaxVersesAlert(true)
      }
    },
    [poemVerses]
  )

  const removeVerseFromPoem = useCallback(
    (id: string) => {
      const newPoemVerses = removeVerse(poemVerses, id)
      setPoemVerses(newPoemVerses)
      setShowMaxVersesAlert(false)
    },
    [poemVerses]
  )

  const reorderPoemVerses = useCallback(
    (oldIndex: number, newIndex: number) => {
      const newPoemVerses = reorderVerses(poemVerses, oldIndex, newIndex)
      setPoemVerses(newPoemVerses)
    },
    [poemVerses]
  )

  const handlePrint = useCallback(() => {
    savePoem(poemVerses, authorName)

    // Optional: Post to video server if configured
    const params = new URLSearchParams(window.location.search)
    const videoServer = params.get('videoServer')
    if (videoServer) {
      fetch(videoServer, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verses: poemVerses, author: authorName }),
      }).catch((error) => {
        console.warn('Failed to post to video server:', error)
      })
    }

    stopAll()
    window.print()
    setShowCompletion(true)
    setIsSessionActive(false)

    setTimeout(() => {
      window.location.reload()
    }, 10000)
  }, [poemVerses, authorName, stopAll])

  const value: PoematonContextState = {
    allVerses,
    poemVerses,
    authorName,
    timeLeft,
    isTimerRunning: isRunning,
    formattedTime,
    showMaxVersesAlert,
    isSessionActive,
    showCompletion,
    loadVerses,
    startSession,
    addVerseToPoem,
    removeVerseFromPoem,
    reorderPoemVerses,
    handlePrint,
  }

  return (
    <PoematonContext.Provider value={value}>
      {children}
    </PoematonContext.Provider>
  )
}
