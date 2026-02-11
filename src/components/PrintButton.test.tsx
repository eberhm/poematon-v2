import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PrintButton } from './PrintButton'
import { renderWithTheme } from '../test/utils'

describe('PrintButton', () => {
  it('renders button with correct text', () => {
    const mockOnClick = vi.fn()
    renderWithTheme(<PrintButton onClick={mockOnClick} />)
    expect(
      screen.getByRole('button', { name: /imprime tu poema/i })
    ).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const mockOnClick = vi.fn()
    renderWithTheme(<PrintButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: /imprime tu poema/i })
    await user.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('has correct yellow background color', () => {
    const mockOnClick = vi.fn()
    renderWithTheme(<PrintButton onClick={mockOnClick} />)
    const button = screen.getByRole('button', { name: /imprime tu poema/i })

    // Check computed styles
    expect(button).toHaveStyle({ backgroundColor: '#cfc140' })
  })

  it('has correct width', () => {
    const mockOnClick = vi.fn()
    renderWithTheme(<PrintButton onClick={mockOnClick} />)
    const button = screen.getByRole('button', { name: /imprime tu poema/i })

    expect(button).toHaveStyle({ width: '190px' })
  })
})
