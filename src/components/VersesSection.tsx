import { Box, Typography } from '@mui/material'
import type { Verse } from '../types'
import { VerseCard } from './VerseCard'

export interface VersesSectionProps {
  verses: Verse[]
}

/**
 * Left panel displaying all available verses (dark background)
 */
export function VersesSection({ verses }: VersesSectionProps) {
  return (
    <Box
      sx={{
        backgroundColor: '#333',
        borderRadius: '20px',
        height: '75vh',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#fff',
          textAlign: 'center',
          marginBottom: 2,
          fontWeight: 700,
        }}
      >
        VERSOS
      </Typography>

      <Box
        sx={{
          height: '65vh',
          overflowY: 'auto',
          paddingRight: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#222',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#555',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#777',
            },
          },
        }}
      >
        {verses.map((verse) => (
          <VerseCard key={verse.id} verse={verse} />
        ))}
      </Box>
    </Box>
  )
}
