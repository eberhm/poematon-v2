export type Verse = {
  id: string // UUID v4 format
  value: string // The verse text
  autor: string // Author name
  poema: string // Source poem title
  poemario: string // Source poetry collection
}

export type SavedPoemVerse = {
  text: string
  autor: string
  poema: string
  poemario: string
}

export type SavedPoem = {
  id: string
  timestamp: string
  author: string
  version: string
  verses: SavedPoemVerse[]
}
