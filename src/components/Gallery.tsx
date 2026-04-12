import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Grid,
  Container,
  CircularProgress,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { RetroBackground } from './RetroBackground'
import { getAllPoems, deletePoem } from '../utils/poemStorage'
import type { SavedPoem } from '../types'

export function Gallery() {
  const navigate = useNavigate()
  const [poems, setPoems] = useState<SavedPoem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPoems()
      .then(setPoems)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    await deletePoem(id)
    setPoems((prev) => prev.filter((p) => p.id !== id))
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <RetroBackground>
        <Container
          maxWidth="xl"
          sx={{ py: 4, height: '100%', overflowY: 'auto' }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{ color: '#cfc140' }}
              aria-label="Volver al inicio"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h4"
              sx={{
                color: '#cfc140',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: { xs: '16px', md: '24px' },
                textShadow: '0 0 20px rgba(207,193,64,0.5)',
              }}
            >
              Poemas guardados
            </Typography>
          </Box>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress sx={{ color: '#cfc140' }} />
            </Box>
          )}

          {!loading && poems.length === 0 && (
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Typography
                sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px' }}
              >
                Aún no hay poemas guardados.
              </Typography>
            </Box>
          )}

          {!loading && poems.length > 0 && (
            <Grid container spacing={3}>
              {poems.map((poem) => (
                <Grid item xs={12} sm={6} md={4} key={poem.id}>
                  <Card
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      border: '1px solid rgba(207,193,64,0.3)',
                      borderRadius: '16px',
                      '&:hover': {
                        border: '1px solid rgba(207,193,64,0.8)',
                        boxShadow: '0 0 16px rgba(207,193,64,0.3)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <CardActionArea
                      onClick={() => navigate(`/gallery/${poem.id}`)}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography
                            sx={{
                              color: '#cfc140',
                              fontWeight: 700,
                              fontSize: '16px',
                              mb: 0.5,
                            }}
                          >
                            {poem.author}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={(e) => handleDelete(e, poem.id)}
                            sx={{
                              color: 'rgba(255,255,255,0.3)',
                              '&:hover': { color: '#ff6b6b' },
                            }}
                            aria-label="Eliminar poema"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <Typography
                          sx={{
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: '12px',
                            mb: 1.5,
                          }}
                        >
                          {formatDate(poem.timestamp)} · {poem.verses.length}{' '}
                          versos
                        </Typography>

                        {poem.verses.slice(0, 3).map((v, i) => (
                          <Typography
                            key={i}
                            sx={{
                              color: 'rgba(255,255,255,0.7)',
                              fontSize: '13px',
                              fontStyle: 'italic',
                              lineHeight: 1.5,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {v.text}
                          </Typography>
                        ))}
                        {poem.verses.length > 3 && (
                          <Typography
                            sx={{
                              color: 'rgba(255,255,255,0.3)',
                              fontSize: '12px',
                              mt: 0.5,
                            }}
                          >
                            +{poem.verses.length - 3} más...
                          </Typography>
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </RetroBackground>
    </Box>
  )
}
