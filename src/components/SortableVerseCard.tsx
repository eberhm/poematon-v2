import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Verse } from '../types'
import { VerseCard } from './VerseCard'

export interface SortableVerseCardProps {
  verse: Verse
}

/**
 * Sortable wrapper for VerseCard in TU POEMA panel
 */
export function SortableVerseCard({ verse }: SortableVerseCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: verse.id,
    data: {
      type: 'poem',
      verse,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <VerseCard verse={verse} isDragging={isDragging} />
    </div>
  )
}
