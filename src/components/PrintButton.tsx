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
        width: '190px',
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: '#b8ad39',
        },
      }}
    >
      Imprime tu poema
    </Button>
  )
}
