import { createPortal } from 'react-dom'
import type { Verse } from '../types'

export interface PrintContentProps {
  poemVerses: Verse[]
  authorName?: string
}

/**
 * Print-only content rendered via portal directly under <body>.
 * This keeps it outside #root so that hiding #root in @media print
 * doesn't affect print output.
 */
export function PrintContent({ poemVerses, authorName }: PrintContentProps) {
  if (poemVerses.length === 0) return null

  return createPortal(
    <div className="print-content" style={{ display: 'none' }}>
      {/* Poem Title */}
      <div className="print-title">POEMATÓN. Tu Poema ready-made:</div>

      {/* Author */}
      {authorName && <div className="print-author">Autor/a: {authorName}</div>}

      {/* Verses */}
      <div className="print-verses">
        {poemVerses.map((verse) => (
          <div key={verse.id} className="print-verse">
            {verse.value}
          </div>
        ))}
      </div>

      {/* Attributions Title */}
      <div className="print-attributions-title">
        Poema confeccionado con los versos de los autores (autoría, poema):
      </div>

      {/* Attributions */}
      <ul className="print-attributions">
        {poemVerses.map((verse) => (
          <li key={verse.id} className="print-attribution">
            {verse.autor}
            {verse.poema && `, ${verse.poema}`}
            {verse.poemario && `, ${verse.poemario}`}
          </li>
        ))}
      </ul>
    </div>,
    document.body
  )
}
