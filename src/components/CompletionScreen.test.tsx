import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { CompletionScreen } from './CompletionScreen'
import { renderWithTheme } from '../test/utils'

describe('CompletionScreen', () => {
  it('renders when open is true', () => {
    renderWithTheme(<CompletionScreen open={true} />)
    expect(screen.getByText('¡Enhorabuena!')).toBeInTheDocument()
  })

  it('does not render when open is false', () => {
    renderWithTheme(<CompletionScreen open={false} />)
    expect(screen.queryByText('¡Enhorabuena!')).not.toBeInTheDocument()
  })

  it('displays completion message', () => {
    renderWithTheme(<CompletionScreen open={true} />)
    expect(screen.getByText('Has completado tu poema ready-made')).toBeInTheDocument()
  })

  it('displays auto-reload message', () => {
    renderWithTheme(<CompletionScreen open={true} />)
    expect(
      screen.getByText('La página se recargará automáticamente en 10 segundos...')
    ).toBeInTheDocument()
  })

  it('has correct ARIA labels', () => {
    renderWithTheme(<CompletionScreen open={true} />)
    const title = screen.getByText('¡Enhorabuena!')
    expect(title).toHaveAttribute('id', 'completion-modal')

    const message = screen.getByText('Has completado tu poema ready-made')
    expect(message).toHaveAttribute('id', 'completion-message')
  })
})
