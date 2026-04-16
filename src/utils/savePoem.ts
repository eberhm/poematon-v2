import type { Verse } from '../types'
import { savePoem as savePoemToDB } from './poemStorage'

export function savePoem(poemVerses: Verse[]): void {
  savePoemToDB(poemVerses).catch((error) => {
    console.warn('Failed to save poem to IndexedDB:', error)
  })
}
