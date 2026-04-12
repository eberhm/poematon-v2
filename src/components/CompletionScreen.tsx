import { useEffect, useState } from 'react'
import { Modal, Box, Typography } from '@mui/material'
import { RetroBackground } from './RetroBackground'

export interface CompletionScreenProps {
  open: boolean
  reloadSeconds?: number
}

/**
 * Completion screen shown after timer expires or manual print.
 * Shows "Enhorabuena" message with a live countdown before auto-reload.
 */
export function CompletionScreen({
  open,
  reloadSeconds = 10,
}: CompletionScreenProps) {
  const [secondsLeft, setSecondsLeft] = useState(reloadSeconds)

  useEffect(() => {
    if (!open) {
      setSecondsLeft(reloadSeconds)
      return
    }
    setSecondsLeft(reloadSeconds)
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [open, reloadSeconds])

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
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <RetroBackground>
          <Box
            sx={{
              width: '100%',
              height: '100%',
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
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '48px',
                lineHeight: 1.5,
                textAlign: 'center',
                textShadow:
                  '0 0 20px rgba(207,193,64,0.7), 0 0 40px rgba(207,193,64,0.4)',
                marginBottom: 5,
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
                fontSize: '1rem',
                fontFamily: "'Press Start 2P', monospace",
                lineHeight: 1.8,
              }}
            >
              Recargando en {secondsLeft} segundo
              {secondsLeft !== 1 ? 's' : ''}...
            </Typography>
          </Box>
        </RetroBackground>
      </Box>
    </Modal>
  )
}
