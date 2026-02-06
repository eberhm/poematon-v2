import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@mui/material/styles'
import { WelcomeScreen } from './WelcomeScreen'
import { theme } from '../theme'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('WelcomeScreen', () => {
  it('renders all required elements when open', () => {
    const mockOnStart = vi.fn()
    renderWithTheme(<WelcomeScreen open={true} onStart={mockOnStart} />)

    expect(screen.getByText('Poematón 2.0')).toBeInTheDocument()
    expect(screen.getByText('Haz tu poema ready-made')).toBeInTheDocument()
    expect(screen.getByAltText('Corona logo')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /empezar/i })).toBeInTheDocument()
  })

  it('renders all six instruction items', () => {
    const mockOnStart = vi.fn()
    renderWithTheme(<WelcomeScreen open={true} onStart={mockOnStart} />)

    // Check for instructions header
    expect(screen.getByText('Instrucciones')).toBeInTheDocument()

    // Check for key instruction elements
    expect(screen.getByText(/pentasílabos/i)).toBeInTheDocument()
    expect(screen.getByText(/arrástralo/i)).toBeInTheDocument()
    expect(screen.getByText(/Repite versos si quieres/i)).toBeInTheDocument()
    expect(screen.getByText(/verso blanco/i)).toBeInTheDocument()
    expect(screen.getByText(/8 versos/i)).toBeInTheDocument()
    expect(
      screen.getByText(/recoge el poema que has creado al salir del/i)
    ).toBeInTheDocument()

    // Check for call to action
    expect(
      screen.getByText(/¿Lo tienes claro\? Pues presiona el botón/i)
    ).toBeInTheDocument()
  })

  it('calls onStart when button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnStart = vi.fn()
    renderWithTheme(<WelcomeScreen open={true} onStart={mockOnStart} />)

    const startButton = screen.getByRole('button', { name: /empezar/i })
    await user.click(startButton)

    expect(mockOnStart).toHaveBeenCalledTimes(1)
  })

  it('does not render when open is false', () => {
    const mockOnStart = vi.fn()
    renderWithTheme(<WelcomeScreen open={false} onStart={mockOnStart} />)

    expect(screen.queryByText('Poematón 2.0')).not.toBeInTheDocument()
  })
})
