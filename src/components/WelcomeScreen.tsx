import { Box, Button, Typography, Modal } from '@mui/material'
import coronaLogo from '/corona.png'
import backgroundImage from '/background.portada.png'

interface WelcomeScreenProps {
  open: boolean
  onStart: () => void
}

export function WelcomeScreen({ open, onStart }: WelcomeScreenProps) {
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
      <Box
        sx={{
          width: '100%',
          height: '100%',
          background: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
          sx={{
            width: '40px',
            height: 'auto',
          }}
        />

        {/* Title */}
        <Typography
          id="welcome-title"
          variant="h1"
          sx={{
            color: '#fff',
            fontSize: '80px',
            fontWeight: 700,
            marginBottom: 1,
            textAlign: 'center',
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
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: 4,
            borderRadius: '20px',
            maxWidth: '700px',
            marginBottom: 3,
          }}
        >
          {/* Instructions Header */}
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
              '& li': {
                marginBottom: 1.5,
              },
              '& li::marker': {
                color: '#cfc140',
                fontWeight: 700,
              },
            }}
          >
            <li>
              Encontrarás un listado de versos mayoritariamente con métrica
              impar (pentasílabos, heptasílabos, eneasílabos, endecasílabos).
            </li>
            <li>
              Elige un verso y{' '}
              <Box component="span" sx={{ color: '#cfc140', fontWeight: 500 }}>
                arrástralo
              </Box>{' '}
              hacia el cuadro del lado derecho.
            </li>
            <li>
              Repite versos si quieres, dará musicalidad a tu poema ready-made.
            </li>
            <li>
              No es necesario que busques rimas entre los versos; hoy en día
              predomina el verso blanco: versos sin rima, pero con ritmo (medida
              y acentos).
            </li>
            <li>
              Dispones de unos minutos para hacer tus elecciones y una extensión
              máxima de{' '}
              <Box component="span" sx={{ color: '#cfc140', fontWeight: 500 }}>
                8 versos
              </Box>
              .
            </li>
            <li>
              Presiona el botón de imprimir y recoge el poema que has creado al
              salir del{' '}
              <Box component="span" sx={{ color: '#cfc140', fontWeight: 500 }}>
                POEMATÓN
              </Box>
              .
            </li>
          </Typography>
        </Box>

        {/* Call to Action Text */}
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
          onClick={onStart}
          sx={{
            backgroundColor: '#cfc140',
            color: '#000',
            fontSize: '24px',
            fontWeight: 700,
            padding: '15px 60px',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: '#fff',
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          EMPEZAR
        </Button>
      </Box>
    </Modal>
  )
}
