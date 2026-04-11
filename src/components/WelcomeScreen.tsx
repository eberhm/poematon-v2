import { useState } from 'react'
import { Box, Button, Typography, Modal, TextField } from '@mui/material'
import coronaLogo from '/corona.png'
import { RetroBackground } from './RetroBackground'

interface WelcomeScreenProps {
  open: boolean
  onStart: (authorName: string) => void
}

export function WelcomeScreen({ open, onStart }: WelcomeScreenProps) {
  const [name, setName] = useState('')

  const handleStart = () => {
    onStart(name.trim())
  }

  return (
    <Modal
      open={open}
      aria-labelledby="welcome-title"
      aria-describedby="welcome-instructions"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '100%', height: '100%' }}>
        <RetroBackground>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              overflow: 'auto',
            }}
          >
            {/* Corona Logo */}
            <Box
              component="img"
              src={coronaLogo}
              alt="Corona logo"
              sx={{ width: '40px', height: 'auto' }}
            />

            {/* Title */}
            <Typography
              id="welcome-title"
              variant="h1"
              sx={{
                color: '#cfc140',
                fontSize: '80px',
                fontWeight: 700,
                marginBottom: 1,
                textAlign: 'center',
                textShadow:
                  '0 0 20px rgba(207,193,64,0.7), 0 0 40px rgba(207,193,64,0.4)',
              }}
            >
              Poematón 2.0
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 300,
                marginBottom: 4,
                textAlign: 'center',
              }}
            >
              Haz tu poema ready-made
            </Typography>

            {/* Instructions */}
            <Box
              id="welcome-instructions"
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(207,193,64,0.3)',
                padding: 4,
                borderRadius: '20px',
                maxWidth: '700px',
                marginBottom: 3,
              }}
            >
              <Typography
                sx={{
                  color: '#cfc140',
                  fontSize: '20px',
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: 2,
                }}
              >
                Instrucciones
              </Typography>

              <Typography
                component="ol"
                sx={{
                  color: '#fff',
                  fontSize: '16px',
                  lineHeight: 1.6,
                  paddingLeft: 3,
                  marginBottom: 0,
                  '& li': { marginBottom: 1.5 },
                  '& li::marker': { color: '#cfc140', fontWeight: 700 },
                }}
              >
                <li>
                  Encontrarás un listado de versos mayoritariamente con métrica
                  impar (pentasílabos, heptasílabos, eneasílabos,
                  endecasílabos).
                </li>
                <li>
                  Elige un verso y{' '}
                  <Box
                    component="span"
                    sx={{ color: '#cfc140', fontWeight: 500 }}
                  >
                    arrástralo
                  </Box>{' '}
                  hacia el cuadro del lado derecho.
                </li>
                <li>
                  Repite versos si quieres, dará musicalidad a tu poema
                  ready-made.
                </li>
                <li>
                  No es necesario que busques rimas entre los versos; hoy en día
                  predomina el verso blanco: versos sin rima, pero con ritmo
                  (medida y acentos).
                </li>
                <li>
                  Dispones de unos minutos para hacer tus elecciones y una
                  extensión máxima de{' '}
                  <Box
                    component="span"
                    sx={{ color: '#cfc140', fontWeight: 500 }}
                  >
                    8 versos
                  </Box>
                  .
                </li>
                <li>
                  Presiona el botón de imprimir y recoge el poema que has creado
                  al salir del{' '}
                  <Box
                    component="span"
                    sx={{ color: '#cfc140', fontWeight: 500 }}
                  >
                    POEMATÓN
                  </Box>
                  .
                </li>
              </Typography>
            </Box>

            {/* Name Input */}
            <Box sx={{ marginBottom: 3, width: '100%', maxWidth: '400px' }}>
              <Typography
                sx={{
                  color: '#fff',
                  fontSize: '16px',
                  marginBottom: 1,
                  textAlign: 'center',
                }}
              >
                Tu nombre (opcional):
              </Typography>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre aquí"
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 50 }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleStart()
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: 'rgba(207,193,64,0.5)',
                    },
                    '&:hover fieldset': { borderColor: '#cfc140' },
                    '&.Mui-focused fieldset': { borderColor: '#cfc140' },
                  },
                  '& input::placeholder': {
                    color: 'rgba(255,255,255,0.4)',
                  },
                }}
              />
            </Box>

            {/* Call to Action */}
            <Typography
              sx={{
                color: '#fff',
                fontSize: '18px',
                fontWeight: 300,
                marginBottom: 3,
                textAlign: 'center',
                maxWidth: '700px',
              }}
            >
              ¿Lo tienes claro? Pues presiona el botón inferior para EMPEZAR
            </Typography>

            {/* Start Button */}
            <Button
              variant="contained"
              size="large"
              onClick={handleStart}
              sx={{
                backgroundColor: '#cfc140',
                color: '#000',
                fontSize: '24px',
                fontWeight: 700,
                padding: '15px 60px',
                borderRadius: '10px',
                boxShadow: '0 0 20px rgba(207,193,64,0.5)',
                '&:hover': {
                  backgroundColor: '#fff',
                  boxShadow: '0 0 30px rgba(255,255,255,0.5)',
                },
                transition: 'background-color 0.3s ease',
              }}
            >
              EMPEZAR
            </Button>
          </Box>
        </RetroBackground>
      </Box>
    </Modal>
  )
}
