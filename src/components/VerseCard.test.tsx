import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { VerseCard } from './VerseCard'
import { renderWithTheme, mockVerses } from '../test/utils'

describe('VerseCard', () => {
  it('renders verse text', () => {
    renderWithTheme(<VerseCard verse={mockVerses[0]} />)
    expect(screen.getByText('Solo en el silencio')).toBeInTheDocument()
  })

  it('applies dragging opacity when isDragging is true', () => {
    const { container } = renderWithTheme(
      <VerseCard verse={mockVerses[0]} isDragging={true} />
    )
    const box = container.firstChild as HTMLElement
    expect(box).toHaveStyle({ opacity: '0.5' })
  })

  it('applies normal opacity when isDragging is false', () => {
    const { container } = renderWithTheme(
      <VerseCard verse={mockVerses[0]} isDragging={false} />
    )
    const box = container.firstChild as HTMLElement
    expect(box).toHaveStyle({ opacity: '1' })
  })

  it('defaults isDragging to false', () => {
    const { container } = renderWithTheme(<VerseCard verse={mockVerses[0]} />)
    const box = container.firstChild as HTMLElement
    expect(box).toHaveStyle({ opacity: '1' })
  })

  it('displays different verse texts correctly', () => {
    const { rerender } = renderWithTheme(<VerseCard verse={mockVerses[0]} />)
    expect(screen.getByText('Solo en el silencio')).toBeInTheDocument()

    rerender(<VerseCard verse={mockVerses[1]} />)
    expect(screen.getByText('Verde que te quiero verde')).toBeInTheDocument()
  })
})
