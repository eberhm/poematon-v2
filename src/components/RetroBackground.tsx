import { Box } from '@mui/material'
import type { ReactNode } from 'react'

interface RetroBackgroundProps {
  children: ReactNode
}

/**
 * Synthwave perspective grid background — dark navy with pink/magenta neon
 * floor grid converging to a horizon vanishing point.
 */
export function RetroBackground({ children }: RetroBackgroundProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(180deg, #020008 0%, #050010 40%, #08001a 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Horizon glow */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '30%',
          height: '25%',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(210,0,210,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Perspective grid floor */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '-100%',
          right: '-100%',
          height: '65%',
          backgroundImage: [
            'linear-gradient(rgba(220, 0, 210, 0.6) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(220, 0, 210, 0.6) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '120px 90px',
          transform: 'perspective(600px) rotateX(75deg)',
          transformOrigin: '50% 0%',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 15%, black 45%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 15%, black 45%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Box
        sx={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}
      >
        {children}
      </Box>
    </Box>
  )
}
