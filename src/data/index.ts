import type { Verse } from '../types'

/**
 * Loads verses from JSON data files based on version parameter
 * @param version - Version identifier (defaults to 'v1'). Use 'canarias' for regional poetry.
 * @returns Promise resolving to array of verses
 */
export async function loadVerses(version: string = 'v1'): Promise<Verse[]> {
  const versionMap: Record<string, string> = {
    v1: 'data/data.json',
    canarias: 'data/canarias.json',
  }

  const fileName = versionMap[version] || versionMap.v1
  const dataPath = `${import.meta.env.BASE_URL}${fileName}`

  try {
    const response = await fetch(dataPath)
    if (!response.ok) {
      throw new Error(`Failed to load verses: ${response.statusText}`)
    }
    const verses: Verse[] = await response.json()
    return verses
  } catch (error) {
    console.error(`Error loading verses from ${dataPath}:`, error)
    throw error
  }
}

/**
 * Gets version from URL search parameters
 * @returns Version identifier from ?version=<name> or 'v1' as default
 */
export function getVersionFromURL(): string {
  const params = new URLSearchParams(window.location.search)
  return params.get('version') || 'v1'
}
