import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders successfully', () => {
    render(<App />)
    expect(screen.getByText(/Poematón 2.0/i)).toBeInTheDocument()
  })
})
