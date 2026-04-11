import { useContext } from 'react'
import {
  PoematonContext,
  type PoematonContextState,
} from './PoematonContextDef'

export function usePoematonContext(): PoematonContextState {
  const context = useContext(PoematonContext)
  if (!context) {
    throw new Error('usePoematonContext must be used within PoematonProvider')
  }
  return context
}
