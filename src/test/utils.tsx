import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../theme'
import { PoematonProvider } from '../context/PoematonContext'
import type { Verse } from '../types'

/**
 * Renders component wrapped in ThemeProvider
 */
export function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

/**
 * Renders component wrapped in both ThemeProvider and PoematonProvider
 */
export function renderWithContext(component: React.ReactElement) {
  return render(
    <ThemeProvider theme={theme}>
      <PoematonProvider>{component}</PoematonProvider>
    </ThemeProvider>
  )
}

/**
 * Mock verses for testing
 */
export const mockVerses: Verse[] = [
  {
    id: 'verse-1',
    value: 'Solo en el silencio',
    autor: 'Federico García Lorca',
    poema: 'Poeta en Nueva York',
    poemario: 'Obras completas',
  },
  {
    id: 'verse-2',
    value: 'Verde que te quiero verde',
    autor: 'Federico García Lorca',
    poema: 'Romance Sonámbulo',
    poemario: 'Romancero gitano',
  },
  {
    id: 'verse-3',
    value: 'Caminante no hay camino',
    autor: 'Antonio Machado',
    poema: 'Proverbios y cantares',
    poemario: 'Campos de Castilla',
  },
]
