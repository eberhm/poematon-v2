import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

const renderApp = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )

describe('App', () => {
  it('renders welcome screen initially', () => {
    renderApp()
    expect(screen.getByText('Poematón 2.0')).toBeInTheDocument()
    expect(screen.getByText('Haz tu poema ready-made')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /empezar/i })).toBeInTheDocument()
  })

  it('shows instructions on welcome screen', () => {
    renderApp()
    expect(screen.getByText('Instrucciones')).toBeInTheDocument()
    expect(screen.getByText(/pentasílabos/i)).toBeInTheDocument()
    expect(screen.getByText(/8 versos/i)).toBeInTheDocument()
    expect(
      screen.getByText(/¿Lo tienes claro\? Pues presiona el botón/i)
    ).toBeInTheDocument()
  })

  it('hides welcome screen when start button is clicked', async () => {
    const user = userEvent.setup()
    renderApp()

    const startButton = screen.getByRole('button', { name: /empezar/i })
    await user.click(startButton)

    // Wait for fade out transition
    await new Promise((resolve) => setTimeout(resolve, 600))

    expect(
      screen.queryByText('Haz tu poema ready-made')
    ).not.toBeInTheDocument()
  })
})
