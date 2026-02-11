import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { PoemSection } from './PoemSection'
import { renderWithTheme, mockVerses } from '../test/utils'

describe('PoemSection', () => {
  it('renders section title', () => {
    renderWithTheme(<PoemSection poemVerses={[]} />)
    expect(screen.getByText('TU POEMA')).toBeInTheDocument()
  })

  it('shows empty state message when no verses', () => {
    renderWithTheme(<PoemSection poemVerses={[]} />)
    expect(
      screen.getByText('Arrastra versos aquí para crear tu poema')
    ).toBeInTheDocument()
  })

  it('does not show empty state when verses present', () => {
    renderWithTheme(<PoemSection poemVerses={[mockVerses[0]]} />)
    expect(
      screen.queryByText('Arrastra versos aquí para crear tu poema')
    ).not.toBeInTheDocument()
  })

  it('renders poem verses', () => {
    const poemVerses = [mockVerses[0], mockVerses[1]]
    renderWithTheme(<PoemSection poemVerses={poemVerses} />)

    expect(screen.getByText('Solo en el silencio')).toBeInTheDocument()
    expect(screen.getByText('Verde que te quiero verde')).toBeInTheDocument()
  })

  it('renders correct number of verse cards', () => {
    const poemVerses = mockVerses
    renderWithTheme(<PoemSection poemVerses={poemVerses} />)

    // Verify all 3 verses are rendered
    expect(screen.getByText('Solo en el silencio')).toBeInTheDocument()
    expect(screen.getByText('Verde que te quiero verde')).toBeInTheDocument()
    expect(screen.getByText('Caminante no hay camino')).toBeInTheDocument()
  })

  it('handles maximum 8 verses', () => {
    const eightVerses = Array.from({ length: 8 }, (_, i) => ({
      ...mockVerses[0],
      id: `verse-${i}`,
      value: `Verse ${i + 1}`,
    }))

    renderWithTheme(<PoemSection poemVerses={eightVerses} />)

    expect(screen.getByText('Verse 1')).toBeInTheDocument()
    expect(screen.getByText('Verse 8')).toBeInTheDocument()
  })

  it('updates when poemVerses prop changes', () => {
    const { rerender } = renderWithTheme(<PoemSection poemVerses={[]} />)
    expect(
      screen.getByText('Arrastra versos aquí para crear tu poema')
    ).toBeInTheDocument()

    rerender(<PoemSection poemVerses={[mockVerses[0]]} />)
    expect(screen.getByText('Solo en el silencio')).toBeInTheDocument()
    expect(
      screen.queryByText('Arrastra versos aquí para crear tu poema')
    ).not.toBeInTheDocument()
  })
})
