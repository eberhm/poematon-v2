import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  IconButton,
  Container,
  CircularProgress,
  Divider,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { RetroBackground } from './RetroBackground'
import { getPoem } from '../utils/poemStorage'
import type { SavedPoem } from '../types'

export function PoemView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [poem, setPoem] = useState<SavedPoem | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    getPoem(id)
      .then((p) => {
        if (!p) setNotFound(true)
        else setPoem(p)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <RetroBackground>
        <Container
          maxWidth="md"
          sx={{ py: 4, height: '100%', overflowY: 'auto' }}
        >
          {/* Back button */}
          <IconButton
            onClick={() => navigate('/gallery')}
            sx={{ color: '#cfc140', mb: 2 }}
            aria-label="Volver a la galería"
          >
            <ArrowBackIcon />
          </IconButton>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress sx={{ color: '#cfc140' }} />
            </Box>
          )}

          {!loading && notFound && (
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.5)',
                textAlign: 'center',
                mt: 8,
              }}
            >
              Poema no encontrado.
            </Typography>
          )}

          {!loading && poem && (
            <Box
              sx={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                border: '1px solid rgba(207,193,64,0.3)',
                borderRadius: '20px',
                padding: { xs: 3, md: 5 },
              }}
            >
              {/* Title */}
              <Typography
                sx={{
                  color: '#cfc140',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: { xs: '12px', md: '16px' },
                  mb: 1,
                  textShadow: '0 0 12px rgba(207,193,64,0.5)',
                }}
              >
                POEMATÓN. Tu Poema ready-made:
              </Typography>

              {/* Author + date */}
              <Typography
                sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', mb: 3 }}
              >
                {poem.author} · {formatDate(poem.timestamp)}
              </Typography>

              {/* Verses */}
              <Box sx={{ mb: 4 }}>
                {poem.verses.map((verse, i) => (
                  <Typography
                    key={i}
                    sx={{
                      color: '#fff',
                      fontSize: '18px',
                      lineHeight: 1.8,
                      paddingLeft: 2,
                      borderLeft: '2px solid rgba(207,193,64,0.3)',
                      mb: 1,
                    }}
                  >
                    {verse.text}
                  </Typography>
                ))}
              </Box>

              <Divider sx={{ borderColor: 'rgba(207,193,64,0.2)', mb: 3 }} />

              {/* Attributions */}
              <Typography
                sx={{
                  color: '#cfc140',
                  fontSize: '13px',
                  fontWeight: 700,
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Poema confeccionado con los versos de los autores (autoría,
                poema):
              </Typography>

              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {poem.verses.map((verse, i) => (
                  <Box component="li" key={i} sx={{ mb: 0.5 }}>
                    <Typography
                      sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}
                    >
                      {verse.autor}
                      {verse.poema && `, ${verse.poema}`}
                      {verse.poemario && `, ${verse.poemario}`}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Container>
      </RetroBackground>
    </Box>
  )
}
