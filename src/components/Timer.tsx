import { Box, Typography } from '@mui/material'
import { formatTime } from '../utils/timer'

export interface TimerProps {
  timeLeft: number
}

/**
 * Displays countdown timer in MM:SS format
 */
export function Timer({ timeLeft }: TimerProps) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        marginY: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: '3.5em',
          color: '#fff',
          fontFamily: "'Press Start 2P', monospace",
          textShadow: '0 0 15px rgba(255,255,255,0.5)',
          letterSpacing: '0.05em',
        }}
      >
        {formatTime(timeLeft)}
      </Typography>
    </Box>
  )
}
