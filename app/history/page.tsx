import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HistoryClient } from "@/components/history-client"

export const metadata = {
  title: "History — TruthLens",
  description: "Review your past image authenticity analyses.",
}

export default function HistoryPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:py-16">
        <div className="mb-8">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Analysis history</h1>
          <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Every image you analyze is saved here so you can revisit verdicts and confidence scores.
          </p>
        </div>
        <HistoryClient />
      </main>
      <SiteFooter />
    </div>
  )
}
