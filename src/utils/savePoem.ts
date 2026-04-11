import type { Verse } from '../types'

interface SavedPoem {
  timestamp: string
  author: string
  verses: Array<{
    text: string
    autor: string
    poema: string
    poemario: string
  }>
}

export function savePoem(poemVerses: Verse[], authorName: string): void {
  if (poemVerses.length === 0) return

  const timestamp = new Date().toISOString()
  const dateSlug = timestamp.replace(/[:.]/g, '-').slice(0, 19)
  const authorSlug = authorName.trim()
    ? authorName.trim().replace(/\s+/g, '_').slice(0, 30)
    : 'anonimo'

  const data: SavedPoem = {
    timestamp,
    author: authorName.trim() || 'Anónimo',
    verses: poemVerses.map((v) => ({
      text: v.value,
      autor: v.autor,
      poema: v.poema,
      poemario: v.poemario,
    })),
  }

  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `poema-${authorSlug}-${dateSlug}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
