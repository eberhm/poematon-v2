import { useEffect } from 'react'
import { Box, Grid, Container } from '@mui/material'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { usePoematonContext } from '../context/PoematonContext'
import { Timer } from './Timer'
import { PrintButton } from './PrintButton'
import { MaxVersesAlert } from './MaxVersesAlert'
import { DraggableVerseCard } from './DraggableVerseCard'
import { VersesPanel } from './VersesPanel'
import { PoemPanel } from './PoemPanel'
import { CompletionScreen } from './CompletionScreen'
import { PrintContent } from './PrintContent'
import type { Verse } from '../types'

/**
 * Main component orchestrating the Poematon interface
 * Integrates timer, panels, drag-and-drop, and all user interactions
 */
export function PoematonSectionList() {
  const {
    allVerses,
    poemVerses,
    timeLeft,
    showMaxVersesAlert,
    showCompletion,
    loadVerses,
    startSession,
    addVerseToPoem,
    removeVerseFromPoem,
    reorderPoemVerses,
    handlePrint,
  } = usePoematonContext()

  const [activeVerse, setActiveVerse] = useState<Verse | null>(null)

  // Configure drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag
      },
    }),
    useSensor(KeyboardSensor)
  )

  // Load verses on mount and start session (only once)
  useEffect(() => {
    loadVerses().then(() => {
      startSession()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const verse = active.data.current?.verse as Verse | undefined
    if (verse) {
      setActiveVerse(verse)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveVerse(null)

    if (!over) return

    const activeData = active.data.current
    const overData = over.data.current

    // Scenario 1: Dragging from VERSOS to TU POEMA
    if (activeData?.type === 'verse' && overData?.type === 'poem') {
      const verse = activeData.verse as Verse
      addVerseToPoem(verse)
      return
    }

    // Scenario 2: Reordering within TU POEMA
    if (activeData?.type === 'poem' && overData?.type === 'poem') {
      const activeIndex = poemVerses.findIndex((v) => v.id === active.id)
      const overIndex = poemVerses.findIndex((v) => v.id === over.id)

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        reorderPoemVerses(activeIndex, overIndex)
      }
      return
    }

    // Scenario 3: Dragging from TU POEMA back to VERSOS
    if (activeData?.type === 'poem' && overData?.type === 'verses') {
      const verseId = active.id as string
      removeVerseFromPoem(verseId)
      return
    }
  }

  return (
    <>
      {/* Completion Screen */}
      <CompletionScreen open={showCompletion} />

      {/* Print Content (hidden on screen, visible in print) */}
      <PrintContent poemVerses={poemVerses} />

      <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
        {/* Timer */}
        <Timer timeLeft={timeLeft} />

      {/* Print Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <PrintButton onClick={handlePrint} />
      </Box>

      {/* Max Verses Alert */}
      <MaxVersesAlert show={showMaxVersesAlert} />

      {/* Main Interface */}
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Grid container spacing={4}>
          {/* VERSOS Panel (Left) */}
          <Grid item xs={12} md={6}>
            <VersesPanel verses={allVerses} />
          </Grid>

          {/* TU POEMA Panel (Right) */}
          <Grid item xs={12} md={6}>
            <SortableContext items={poemVerses.map((v) => v.id)} strategy={verticalListSortingStrategy}>
              <PoemPanel poemVerses={poemVerses} />
            </SortableContext>
          </Grid>
        </Grid>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeVerse ? (
            <Box sx={{ opacity: 0.8, cursor: 'grabbing' }}>
              <DraggableVerseCard verse={activeVerse} isDragging={false} />
            </Box>
          ) : null}
        </DragOverlay>
      </DndContext>
      </Container>
    </>
  )
}
