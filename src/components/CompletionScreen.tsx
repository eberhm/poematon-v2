import { Modal, Box, Typography } from '@mui/material'
import backgroundImage from '/background.portada.png'

export interface CompletionScreenProps {
  open: boolean
}

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
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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
            color: '#fff',
            fontWeight: 700,
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
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
