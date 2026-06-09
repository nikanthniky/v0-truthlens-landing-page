"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import type { AnalysisResult } from "./types"

type HistoryContextValue = {
  history: AnalysisResult[]
  current: AnalysisResult | null
  addResult: (result: AnalysisResult) => void
  setCurrent: (result: AnalysisResult | null) => void
  clearHistory: () => void
}

const HistoryContext = createContext<HistoryContextValue | null>(null)

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<AnalysisResult[]>([])
  const [current, setCurrent] = useState<AnalysisResult | null>(null)

  const addResult = useCallback((result: AnalysisResult) => {
    setHistory((prev) => [result, ...prev])
    setCurrent(result)
  }, [])

  const clearHistory = useCallback(() => setHistory([]), [])

  const value = useMemo(
    () => ({ history, current, addResult, setCurrent, clearHistory }),
    [history, current, addResult, clearHistory],
  )

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}

export function useHistory() {
  const ctx = useContext(HistoryContext)
  if (!ctx) throw new Error("useHistory must be used within HistoryProvider")
  return ctx
}
