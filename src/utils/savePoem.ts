import type { Verse } from '../types'
import { savePoem as savePoemToDB } from './poemStorage'

export function savePoem(poemVerses: Verse[], authorName: string): void {
  savePoemToDB(poemVerses, authorName).catch((error) => {
    console.warn('Failed to save poem to IndexedDB:', error)
  })
}
