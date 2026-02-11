import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Timer } from './Timer'
import { renderWithTheme } from '../test/utils'

describe('Timer', () => {
  it('displays formatted time in MM:SS', () => {
    renderWithTheme(<Timer timeLeft={180} />)
    expect(screen.getByText('3:00')).toBeInTheDocument()
  })

  it('formats time with padded seconds', () => {
    renderWithTheme(<Timer timeLeft={125} />)
    expect(screen.getByText('2:05')).toBeInTheDocument()
  })

  it('displays time at 20 seconds', () => {
    renderWithTheme(<Timer timeLeft={20} />)
    expect(screen.getByText('0:20')).toBeInTheDocument()
  })

  it('displays zero time', () => {
    renderWithTheme(<Timer timeLeft={0} />)
    expect(screen.getByText('0:00')).toBeInTheDocument()
  })

  it('updates when timeLeft prop changes', () => {
    const { rerender } = renderWithTheme(<Timer timeLeft={60} />)
    expect(screen.getByText('1:00')).toBeInTheDocument()

    rerender(<Timer timeLeft={59} />)
    expect(screen.getByText('0:59')).toBeInTheDocument()
  })
})
