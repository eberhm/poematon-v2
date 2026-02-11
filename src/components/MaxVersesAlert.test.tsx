import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { MaxVersesAlert } from './MaxVersesAlert'
import { renderWithTheme } from '../test/utils'

describe('MaxVersesAlert', () => {
  const expectedMessage =
    'Has llegado al número máximo de versos, pero aún puedes reordenar tu poema o sustituir versos.'

  it('renders alert when show is true', () => {
    renderWithTheme(<MaxVersesAlert show={true} />)
    expect(screen.getByText(expectedMessage)).toBeInTheDocument()
  })

  it('does not render when show is false', () => {
    renderWithTheme(<MaxVersesAlert show={false} />)
    expect(screen.queryByText(expectedMessage)).not.toBeInTheDocument()
  })

  it('renders as error severity', () => {
    renderWithTheme(<MaxVersesAlert show={true} />)
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
  })

  it('toggles visibility based on show prop', () => {
    const { rerender } = renderWithTheme(<MaxVersesAlert show={false} />)
    expect(screen.queryByText(expectedMessage)).not.toBeInTheDocument()

    rerender(<MaxVersesAlert show={true} />)
    expect(screen.getByText(expectedMessage)).toBeInTheDocument()

    rerender(<MaxVersesAlert show={false} />)
    expect(screen.queryByText(expectedMessage)).not.toBeInTheDocument()
  })
})
