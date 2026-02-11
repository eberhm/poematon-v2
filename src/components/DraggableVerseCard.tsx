import { useDraggable } from '@dnd-kit/core'
import type { Verse } from '../types'
import { VerseCard } from './VerseCard'

export interface DraggableVerseCardProps {
  verse: Verse
  isDragging?: boolean
  disabled?: boolean
}

/**
 * Draggable wrapper for VerseCard in VERSOS panel
 */
export function DraggableVerseCard({
  verse,
  isDragging = false,
  disabled = false,
}: DraggableVerseCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: verse.id,
    disabled,
    data: {
      type: 'verse',
      verse,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <VerseCard verse={verse} isDragging={isDragging} />
    </div>
  )
}
