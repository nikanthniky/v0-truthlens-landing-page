"use client";

import { AuthProvider } from "@/lib/auth-context";
import { HistoryProvider } from "@/lib/history-context";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <HistoryProvider>
        {children}
      </HistoryProvider>
    </AuthProvider>
  );
}