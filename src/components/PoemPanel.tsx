import { useDroppable } from '@dnd-kit/core'
import { Box, Typography } from '@mui/material'
import type { Verse } from '../types'
import { SortableVerseCard } from './SortableVerseCard'

export interface PoemPanelProps {
  poemVerses: Verse[]
  insertPreviewIndex?: number | null
}

/**
 * Right panel for composing the poem with sortable support
 */
export function PoemPanel({ poemVerses, insertPreviewIndex }: PoemPanelProps) {
  const { setNodeRef } = useDroppable({
    id: 'poem-panel',
    data: {
      type: 'poem',
    },
  })

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
        ref={setNodeRef}
        sx={{
          flex: 1,
          minHeight: 0,
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
        {poemVerses.length === 0 && insertPreviewIndex == null ? (
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
          <>
            {poemVerses.map((verse, index) => (
              <Box key={verse.id}>
                {insertPreviewIndex === index && (
                  <Box
                    sx={{
                      height: '40px',
                      borderRadius: '14px',
                      border: '2px dashed #999',
                      marginBottom: '8px',
                      transition: 'height 0.2s ease',
                    }}
                  />
                )}
                <SortableVerseCard verse={verse} />
              </Box>
            ))}
            {insertPreviewIndex != null &&
              insertPreviewIndex >= poemVerses.length && (
                <Box
                  sx={{
                    height: '40px',
                    borderRadius: '14px',
                    border: '2px dashed #999',
                    marginBottom: '8px',
                    transition: 'height 0.2s ease',
                  }}
                />
              )}
          </>
        )}
      </Box>
    </Box>
  )
}
