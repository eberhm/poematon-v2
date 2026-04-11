import { Button } from '@mui/material'

export interface PrintButtonProps {
  onClick: () => void
}

/**
 * Yellow button that triggers print functionality
 */
export function PrintButton({ onClick }: PrintButtonProps) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: '#cfc140',
        color: '#000',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '11px',
        textTransform: 'uppercase',
        borderRadius: '4px',
        padding: '14px 24px',
        boxShadow: '0 0 12px rgba(207,193,64,0.4)',
        '&:hover': {
          backgroundColor: '#b8ad39',
          boxShadow: '0 0 20px rgba(207,193,64,0.6)',
        },
      }}
    >
      Imprime tu poema
    </Button>
  )
}
