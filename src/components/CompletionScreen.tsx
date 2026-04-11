import { Modal, Box, Typography } from '@mui/material'

export interface CompletionScreenProps {
  open: boolean
}

const retroBackground = `
  linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)),
  repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(207,193,64,0.15) 39px, rgba(207,193,64,0.15) 40px),
  repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(207,193,64,0.15) 39px, rgba(207,193,64,0.15) 40px)
`

/**
 * Completion screen shown after timer expires
 * Shows "Enhorabuena" message and auto-reloads after 10 seconds
 */
export function CompletionScreen({ open }: CompletionScreenProps) {
  return (
    <Modal
      open={open}
      aria-labelledby="completion-modal"
      aria-describedby="completion-message"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          background: retroBackground,
          backgroundColor: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
        }}
      >
        <Typography
          id="completion-modal"
          variant="h2"
          sx={{
            color: '#cfc140',
            fontWeight: 700,
            textAlign: 'center',
            textShadow: '0 0 20px rgba(207,193,64,0.7)',
            marginBottom: 4,
          }}
        >
          ¡Enhorabuena!
        </Typography>

        <Typography
          id="completion-message"
          variant="h5"
          sx={{
            color: '#fff',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          Has completado tu poema ready-made
        </Typography>

        <Typography
          sx={{
            color: '#cfc140',
            textAlign: 'center',
            marginTop: 4,
            fontSize: '1.2rem',
          }}
        >
          La página se recargará automáticamente en 10 segundos...
        </Typography>
      </Box>
    </Modal>
  )
}
