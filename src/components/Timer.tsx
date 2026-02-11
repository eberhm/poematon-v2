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
          fontSize: '4em',
          fontWeight: 700,
          color: '#fff',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        {formatTime(timeLeft)}
      </Typography>
    </Box>
  )
}
