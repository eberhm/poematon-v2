import { Box } from '@mui/material'
import type { Verse } from '../types'

export interface PrintContentProps {
  poemVerses: Verse[]
}

/**
 * Print-only content that displays the poem and attributions
 * Hidden on screen, visible only when printing
 */
export function PrintContent({ poemVerses }: PrintContentProps) {
  if (poemVerses.length === 0) return null

  return (
    <Box
      className="print-content"
      sx={{
        display: 'none', // Hidden on screen
        '@media print': {
          display: 'block',
        },
      }}
    >
      {/* Poem Title */}
      <div className="print-title">POEMATÓN. Tu Poema ready-made:</div>

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
    </Box>
  )
}
