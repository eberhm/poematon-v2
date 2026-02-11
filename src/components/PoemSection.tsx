import { Box, Typography } from '@mui/material'
import type { Verse } from '../types'
import { VerseCard } from './VerseCard'

export interface PoemSectionProps {
  poemVerses: Verse[]
}

/**
 * Right panel for composing the poem (yellow background)
 */
export function PoemSection({ poemVerses }: PoemSectionProps) {
  return (
    <Box
      sx={{
        backgroundColor: '#cfc140',
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
          color: '#000',
          textAlign: 'center',
          marginBottom: 2,
          fontWeight: 700,
        }}
      >
        TU POEMA
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
            backgroundColor: '#b8ad39',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#999',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#777',
            },
          },
        }}
      >
        {poemVerses.length === 0 ? (
          <Typography
            sx={{
              color: '#666',
              textAlign: 'center',
              marginTop: 4,
              fontStyle: 'italic',
            }}
          >
            Arrastra versos aquí para crear tu poema
          </Typography>
        ) : (
          poemVerses.map((verse) => <VerseCard key={verse.id} verse={verse} />)
        )}
      </Box>
    </Box>
  )
}
