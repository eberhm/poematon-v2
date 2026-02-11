import { useDroppable } from '@dnd-kit/core'
import { Box, Typography } from '@mui/material'
import type { Verse } from '../types'
import { DraggableVerseCard } from './DraggableVerseCard'
import { MaxVersesAlert } from './MaxVersesAlert'

export interface VersesPanelProps {
  verses: Verse[]
  showMaxVersesAlert?: boolean
  dragDisabled?: boolean
}

/**
 * Left panel displaying all available verses with drag support
 */
export function VersesPanel({ verses, showMaxVersesAlert = false, dragDisabled = false }: VersesPanelProps) {
  const { setNodeRef } = useDroppable({
    id: 'verses-panel',
    data: {
      type: 'verses',
    },
  })

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
        ref={setNodeRef}
        sx={{
          height: '65vh',
          overflowX: 'hidden',
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
        <MaxVersesAlert show={showMaxVersesAlert} />
        {verses.map((verse) => (
          <DraggableVerseCard key={verse.id} verse={verse} disabled={dragDisabled} />
        ))}
      </Box>
    </Box>
  )
}
