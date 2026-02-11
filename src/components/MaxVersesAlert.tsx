import { Alert } from '@mui/material'

export interface MaxVersesAlertProps {
  show: boolean
}

/**
 * Error alert shown when user tries to add more than 8 verses
 */
export function MaxVersesAlert({ show }: MaxVersesAlertProps) {
  if (!show) return null

  return (
    <Alert
      severity="error"
      sx={{
        marginBottom: 2,
      }}
    >
      Has llegado al número máximo de versos, pero aún puedes reordenar tu poema o sustituir versos.
    </Alert>
  )
}
