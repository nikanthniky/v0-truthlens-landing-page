"use client"

import { HistoryProvider } from "@/lib/history-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return <HistoryProvider>{children}</HistoryProvider>
}
