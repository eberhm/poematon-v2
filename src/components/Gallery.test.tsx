import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { Gallery } from './Gallery'
import { theme } from '../theme'
import type { SavedPoem } from '../types'

vi.mock('../utils/poemStorage', () => ({
  getAllPoems: vi.fn(),
  deletePoem: vi.fn(),
}))

const mockPoems: SavedPoem[] = [
  {
    id: 'id-1',
    timestamp: '2024-06-01T10:00:00.000Z',
    author: 'Ana García',
    version: 'v1',
    verses: [
      {
        text: 'Verde que te quiero verde',
        autor: 'Lorca',
        poema: 'p',
        poemario: 'c',
      },
      {
        text: 'Solo en el silencio',
        autor: 'Lorca',
        poema: 'p2',
        poemario: 'c2',
      },
    ],
  },
]

const renderGallery = (initialPath = '/gallery') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/gallery/:id"
            element={<div data-testid="poem-view" />}
          />
          <Route path="/" element={<div data-testid="home" />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  )

describe('Gallery', () => {
  beforeEach(async () => {
    const storage = await import('../utils/poemStorage')
    vi.mocked(storage.getAllPoems).mockResolvedValue(mockPoems)
    vi.mocked(storage.deletePoem).mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading then poems', async () => {
    renderGallery()
    await waitFor(() =>
      expect(screen.getByText('Ana García')).toBeInTheDocument()
    )
  })

  it('shows empty message when no poems', async () => {
    const storage = await import('../utils/poemStorage')
    vi.mocked(storage.getAllPoems).mockResolvedValue([])
    renderGallery()
    await waitFor(() =>
      expect(
        screen.getByText(/Aún no hay poemas guardados/i)
      ).toBeInTheDocument()
    )
  })

  it('shows verse previews on each card', async () => {
    renderGallery()
    await waitFor(() =>
      expect(screen.getByText('Verde que te quiero verde')).toBeInTheDocument()
    )
  })

  it('calls deletePoem and removes card on delete click', async () => {
    const user = userEvent.setup()
    renderGallery()
    await waitFor(() => screen.getByText('Ana García'))

    const deleteBtn = screen.getByRole('button', { name: /eliminar poema/i })
    await user.click(deleteBtn)

    const storage = await import('../utils/poemStorage')
    expect(vi.mocked(storage.deletePoem)).toHaveBeenCalledWith('id-1')
    await waitFor(() =>
      expect(screen.queryByText('Ana García')).not.toBeInTheDocument()
    )
  })

  it('navigates to poem view on card click', async () => {
    const user = userEvent.setup()
    renderGallery()
    await waitFor(() => screen.getByText('Ana García'))

    const card = screen.getByText('Ana García').closest('button')!
    await user.click(card)

    await waitFor(() =>
      expect(screen.getByTestId('poem-view')).toBeInTheDocument()
    )
  })

  it('shows "+X más..." when poem has more than 3 verses', async () => {
    const storage = await import('../utils/poemStorage')
    vi.mocked(storage.getAllPoems).mockResolvedValue([
      {
        id: 'id-2',
        timestamp: '2024-06-01T10:00:00.000Z',
        author: 'Juan',
        version: 'v1',
        verses: [
          { text: 'v1', autor: 'a', poema: 'p', poemario: 'c' },
          { text: 'v2', autor: 'a', poema: 'p', poemario: 'c' },
          { text: 'v3', autor: 'a', poema: 'p', poemario: 'c' },
          { text: 'v4', autor: 'a', poema: 'p', poemario: 'c' },
        ],
      },
    ])
    renderGallery()
    await waitFor(() =>
      expect(screen.getByText(/\+1 más\.\.\./)).toBeInTheDocument()
    )
  })

  it('navigates to home on back button click', async () => {
    const user = userEvent.setup()
    renderGallery()
    await waitFor(() => screen.getByText('Ana García'))

    await user.click(screen.getByRole('button', { name: /volver al inicio/i }))
    await waitFor(() => expect(screen.getByTestId('home')).toBeInTheDocument())
  })
})
