import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { PlanId, VariantId } from '../data/apartments'

interface ExplorerState {
  variant: VariantId
  setVariant: (v: VariantId) => void
  plan: PlanId
  setPlan: (p: PlanId) => void
  focusedApt: number | null
  /** Přepne půdorys na podlaží daného bytu a zvýrazní ho. */
  showApartment: (apt: number, plan: PlanId) => void
  /** Zvýrazní byt v aktuálním půdorysu bez posunu stránky. */
  focusApartment: (apt: number | null) => void
  clearFocus: () => void
}

const ExplorerContext = createContext<ExplorerState | null>(null)

export function ExplorerProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<VariantId>('B')
  const [plan, setPlanState] = useState<PlanId>('1np')
  const [focusedApt, setFocusedApt] = useState<number | null>(null)

  const setPlan = useCallback((p: PlanId) => {
    setPlanState(p)
    setFocusedApt(null)
  }, [])

  const showApartment = useCallback((apt: number, p: PlanId) => {
    setPlanState(p)
    setFocusedApt(apt)
    document.getElementById('pudorysy')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const clearFocus = useCallback(() => setFocusedApt(null), [])
  const focusApartment = useCallback((apt: number | null) => setFocusedApt(apt), [])

  const value = useMemo(
    () => ({ variant, setVariant, plan, setPlan, focusedApt, showApartment, focusApartment, clearFocus }),
    [variant, plan, setPlan, focusedApt, showApartment, focusApartment, clearFocus],
  )
  return <ExplorerContext.Provider value={value}>{children}</ExplorerContext.Provider>
}

export function useExplorer() {
  const ctx = useContext(ExplorerContext)
  if (!ctx) throw new Error('useExplorer must be used inside <ExplorerProvider>')
  return ctx
}
