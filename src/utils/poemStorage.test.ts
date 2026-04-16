import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { Verse } from '../types'

// Mock uuid to produce deterministic IDs
vi.mock('uuid', () => ({ v4: () => 'test-uuid-1234' }))

// Mock the data module for getVersionFromURL
vi.mock('../data', () => ({
  getVersionFromURL: vi.fn(() => 'v1'),
  loadVerses: vi.fn(),
}))

const mockVerses: Verse[] = [
  {
    id: 'verse-1',
    value: 'Solo en el silencio',
    autor: 'García Lorca',
    poema: 'Poeta en Nueva York',
    poemario: 'Obras completas',
  },
]

type IDBLike = {
  result: unknown
  onsuccess: ((e: Event) => void) | null
  onerror: ((e: Event) => void) | null
}

/**
 * Creates an IDB-like request that fires onsuccess (or onerror) via microtask
 * as soon as the handler is assigned (mirrors real IDB behaviour).
 */
function makeLazyRequest(
  result: unknown,
  opts: { fail?: boolean; error?: unknown } = {}
): IDBLike & { oncomplete: (() => void) | null } {
  let successHandler: ((e: Event) => void) | null = null
  let errorHandler: ((e: Event) => void) | null = null
  let oncompleteHandler: (() => void) | null = null
  const req = {
    result,
    error: opts.error ?? null,
    get onsuccess() {
      return successHandler
    },
    set onsuccess(fn: ((e: Event) => void) | null) {
      successHandler = fn
      if (fn && !opts.fail) {
        queueMicrotask(() => {
          fn({} as Event)
          if (oncompleteHandler) queueMicrotask(() => oncompleteHandler!())
        })
      }
    },
    get onerror() {
      return errorHandler
    },
    set onerror(fn: ((e: Event) => void) | null) {
      errorHandler = fn
      if (fn && opts.fail) queueMicrotask(() => fn({} as Event))
    },
    get oncomplete() {
      return oncompleteHandler
    },
    set oncomplete(fn: (() => void) | null) {
      oncompleteHandler = fn
    },
  }
  return req
}

type StoreRow = {
  id: string
  timestamp: string
  author: string
  version: string
  verses: unknown[]
}

function makeStore(data: StoreRow[]) {
  return {
    add: vi.fn().mockImplementation(() => makeLazyRequest(undefined)),
    getAll: vi.fn().mockImplementation(() => makeLazyRequest([...data])),
    get: vi
      .fn()
      .mockImplementation((id: string) =>
        makeLazyRequest(data.find((d) => d.id === id))
      ),
    delete: vi.fn().mockImplementation(() => makeLazyRequest(undefined)),
    createIndex: vi.fn(),
  }
}

function makeDB(store: ReturnType<typeof makeStore>) {
  return {
    objectStoreNames: { contains: vi.fn(() => true) },
    createObjectStore: vi.fn(() => store),
    transaction: vi.fn(() => {
      let _oncomplete: (() => void) | null = null
      return {
        objectStore: vi.fn(() => store),
        get oncomplete() {
          return _oncomplete
        },
        set oncomplete(fn: (() => void) | null) {
          _oncomplete = fn
          if (fn) queueMicrotask(() => fn())
        },
      }
    }),
    close: vi.fn(),
  }
}

function stubIDB(db: ReturnType<typeof makeDB>, triggerUpgrade = false) {
  const openReq = makeLazyRequest(db) as unknown as IDBLike & {
    onupgradeneeded: ((e: IDBVersionChangeEvent) => void) | null
  }
  openReq.onupgradeneeded = null
  if (triggerUpgrade) {
    // fire onupgradeneeded before onsuccess via microtask
    const origSuccessSetter = Object.getOwnPropertyDescriptor(
      openReq,
      'onsuccess'
    )?.set
    let upgradeRan = false
    Object.defineProperty(openReq, 'onsuccess', {
      get() {
        return origSuccessSetter ? undefined : null
      },
      set(fn: ((e: Event) => void) | null) {
        if (!upgradeRan && openReq.onupgradeneeded) {
          upgradeRan = true
          openReq.onupgradeneeded({
            target: { result: db },
          } as unknown as IDBVersionChangeEvent)
        }
        if (fn) queueMicrotask(() => fn({} as Event))
      },
      configurable: true,
    })
  }
  vi.stubGlobal('indexedDB', { open: vi.fn(() => openReq) })
}

describe('poemStorage', () => {
  let store: ReturnType<typeof makeStore>
  let db: ReturnType<typeof makeDB>

  beforeEach(() => {
    store = makeStore([])
    db = makeDB(store)
    stubIDB(db)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('savePoem stores a poem with correct shape', async () => {
    const { savePoem } = await import('./poemStorage')
    await savePoem(mockVerses)
    expect(store.add).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'test-uuid-1234',
        author: 'Anónimo',
        version: 'v1',
        verses: [
          {
            text: 'Solo en el silencio',
            autor: 'García Lorca',
            poema: 'Poeta en Nueva York',
            poemario: 'Obras completas',
          },
        ],
      })
    )
  })

  it('savePoem returns early when verses are empty', async () => {
    const { savePoem } = await import('./poemStorage')
    await savePoem([])
    expect(store.add).not.toHaveBeenCalled()
  })

  it('getAllPoems returns poems sorted by timestamp descending', async () => {
    const poems: StoreRow[] = [
      {
        id: '1',
        timestamp: '2024-01-01T00:00:00.000Z',
        author: 'A',
        version: 'v1',
        verses: [],
      },
      {
        id: '2',
        timestamp: '2024-06-01T00:00:00.000Z',
        author: 'B',
        version: 'v1',
        verses: [],
      },
    ]
    store = makeStore(poems)
    db = makeDB(store)
    stubIDB(db)

    const { getAllPoems } = await import('./poemStorage')
    const result = await getAllPoems()
    expect(result[0].id).toBe('2')
    expect(result[1].id).toBe('1')
  })

  it('getPoem returns the poem with given id', async () => {
    const poems: StoreRow[] = [
      {
        id: 'abc',
        timestamp: '2024-01-01T00:00:00.000Z',
        author: 'A',
        version: 'v1',
        verses: [],
      },
    ]
    store = makeStore(poems)
    db = makeDB(store)
    stubIDB(db)

    const { getPoem } = await import('./poemStorage')
    const result = await getPoem('abc')
    expect(result?.id).toBe('abc')
  })

  it('deletePoem calls store.delete with the given id', async () => {
    store = makeStore([])
    db = makeDB(store)
    stubIDB(db)

    const { deletePoem } = await import('./poemStorage')
    await deletePoem('some-id')
    expect(store.delete).toHaveBeenCalledWith('some-id')
  })

  it('openDB runs onupgradeneeded when store does not exist', async () => {
    store = makeStore([])
    db = makeDB(store)
    db.objectStoreNames.contains.mockReturnValue(false)
    stubIDB(db, true)

    const { savePoem } = await import('./poemStorage')
    await savePoem(mockVerses)
    expect(db.createObjectStore).toHaveBeenCalledWith('poems', {
      keyPath: 'id',
    })
  })
})
