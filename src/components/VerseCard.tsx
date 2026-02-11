import { Box } from '@mui/material'
import type { Verse } from '../types'

export interface VerseCardProps {
  verse: Verse
  isDragging?: boolean
}

/**
 * Displays a single verse in a white card
 */
export function VerseCard({ verse, isDragging = false }: VerseCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: '14px',
        padding: '5px 10px',
        marginBottom: '8px',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        transition: 'opacity 0.2s',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      {verse.value}
    </Box>
  )
}
