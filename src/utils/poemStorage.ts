import type { SavedPoem, Verse } from '../types'
import { v4 as uuidv4 } from 'uuid'
import { getVersionFromURL } from '../data'

const DB_NAME = 'poematon'
const STORE_NAME = 'poems'
const DB_VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('timestamp', 'timestamp', { unique: false })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function savePoem(
  poemVerses: Verse[],
  authorName: string
): Promise<void> {
  if (poemVerses.length === 0) return

  const poem: SavedPoem = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    author: authorName.trim() || 'Anónimo',
    version: getVersionFromURL(),
    verses: poemVerses.map((v) => ({
      text: v.value,
      autor: v.autor,
      poema: v.poema,
      poemario: v.poemario,
    })),
  }

  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const request = store.add(poem)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
    tx.oncomplete = () => db.close()
  })
}

export async function getAllPoems(): Promise<SavedPoem[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.getAll()
    request.onsuccess = () => {
      const poems = request.result as SavedPoem[]
      poems.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      resolve(poems)
    }
    request.onerror = () => reject(request.error)
    tx.oncomplete = () => db.close()
  })
}

export async function getPoem(id: string): Promise<SavedPoem | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.get(id)
    request.onsuccess = () => resolve(request.result as SavedPoem | undefined)
    request.onerror = () => reject(request.error)
    tx.oncomplete = () => db.close()
  })
}

export async function deletePoem(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const request = store.delete(id)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
    tx.oncomplete = () => db.close()
  })
}
