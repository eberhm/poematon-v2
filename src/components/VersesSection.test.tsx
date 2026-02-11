import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { VersesSection } from './VersesSection'
import { renderWithTheme, mockVerses } from '../test/utils'

describe('VersesSection', () => {
  it('renders section title', () => {
    renderWithTheme(<VersesSection verses={mockVerses} />)
    expect(screen.getByText('VERSOS')).toBeInTheDocument()
  })

  it('renders all verses', () => {
    renderWithTheme(<VersesSection verses={mockVerses} />)

    expect(screen.getByText('Solo en el silencio')).toBeInTheDocument()
    expect(screen.getByText('Verde que te quiero verde')).toBeInTheDocument()
    expect(screen.getByText('Caminante no hay camino')).toBeInTheDocument()
  })

  it('renders empty section when no verses', () => {
    renderWithTheme(<VersesSection verses={[]} />)
    expect(screen.getByText('VERSOS')).toBeInTheDocument()
    expect(screen.queryByText('Solo en el silencio')).not.toBeInTheDocument()
  })

  it('renders correct number of verse cards', () => {
    renderWithTheme(<VersesSection verses={mockVerses} />)
    // Verify all 3 verses are rendered
    expect(screen.getByText('Solo en el silencio')).toBeInTheDocument()
    expect(screen.getByText('Verde que te quiero verde')).toBeInTheDocument()
    expect(screen.getByText('Caminante no hay camino')).toBeInTheDocument()
  })

  it('handles large number of verses', () => {
    const manyVerses = Array.from({ length: 50 }, (_, i) => ({
      ...mockVerses[0],
      id: `verse-${i}`,
      value: `Verse ${i}`,
    }))

    renderWithTheme(<VersesSection verses={manyVerses} />)
    expect(screen.getByText('Verse 0')).toBeInTheDocument()
    expect(screen.getByText('Verse 49')).toBeInTheDocument()
  })
})
