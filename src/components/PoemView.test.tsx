import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { PoemView } from './PoemView'
import { theme } from '../theme'
import type { SavedPoem } from '../types'

vi.mock('../utils/poemStorage', () => ({
  getPoem: vi.fn(),
}))

const mockPoem: SavedPoem = {
  id: 'poem-1',
  timestamp: '2024-06-01T10:00:00.000Z',
  author: 'María López',
  version: 'v1',
  verses: [
    {
      text: 'Verde que te quiero verde',
      autor: 'García Lorca',
      poema: 'Romance Sonámbulo',
      poemario: 'Romancero gitano',
    },
    {
      text: 'Solo en el silencio',
      autor: 'García Lorca',
      poema: 'Poeta en NY',
      poemario: 'Obras',
    },
  ],
}

const renderPoemView = (id = 'poem-1') =>
  render(
    <MemoryRouter initialEntries={[`/gallery/${id}`]}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/gallery/:id" element={<PoemView />} />
          <Route path="/gallery" element={<div data-testid="gallery" />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  )

describe('PoemView', () => {
  beforeEach(async () => {
    const storage = await import('../utils/poemStorage')
    vi.mocked(storage.getPoem).mockResolvedValue(mockPoem)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('shows poem content after loading', async () => {
    renderPoemView()
    await waitFor(() =>
      expect(screen.getByText('Verde que te quiero verde')).toBeInTheDocument()
    )
    expect(screen.getByText('Solo en el silencio')).toBeInTheDocument()
    expect(
      screen.getByText('María López', { exact: false })
    ).toBeInTheDocument()
  })

  it('shows "not found" when poem does not exist', async () => {
    const storage = await import('../utils/poemStorage')
    vi.mocked(storage.getPoem).mockResolvedValue(undefined)
    renderPoemView('missing-id')
    await waitFor(() =>
      expect(screen.getByText(/Poema no encontrado/i)).toBeInTheDocument()
    )
  })

  it('shows attributions section', async () => {
    renderPoemView()
    await waitFor(() =>
      expect(screen.getAllByText(/García Lorca/).length).toBeGreaterThan(0)
    )
    expect(screen.getByText(/Romance Sonámbulo/)).toBeInTheDocument()
  })

  it('navigates back to gallery on back button click', async () => {
    const user = userEvent.setup()
    renderPoemView()
    await waitFor(() =>
      expect(screen.getByText('Verde que te quiero verde')).toBeInTheDocument()
    )
    await user.click(
      screen.getByRole('button', { name: /volver a la galería/i })
    )
    await waitFor(() =>
      expect(screen.getByTestId('gallery')).toBeInTheDocument()
    )
  })
})
