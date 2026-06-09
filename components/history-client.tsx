"use client"

import Image from "next/image"
import Link from "next/link"
import { Camera, Sparkles, ImageOff, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useHistory } from "@/lib/history-context"
import type { AnalysisResult } from "@/lib/types"

function formatDate(ts: number) {
  return new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function HistoryCard({ result }: { result: AnalysisResult }) {
  const isReal = result.verdict === "real"
  const color = isReal ? "var(--success)" : "var(--destructive)"

  return (
    <Card className="glass group overflow-hidden border-border p-0 transition-colors hover:border-primary/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={result.imageUrl || "/placeholder.svg"}
          alt={result.fileName}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur"
          style={{
            color,
            backgroundColor: `color-mix(in oklch, ${color} 22%, oklch(0.16 0.02 265 / 0.7))`,
            border: `1px solid color-mix(in oklch, ${color} 45%, transparent)`,
          }}
        >
          {isReal ? <Camera className="size-3.5" /> : <Sparkles className="size-3.5" />}
          {isReal ? "Real" : "AI"}
        </span>
      </div>
      <div className="p-4">
        <p className="truncate text-sm font-medium">{result.fileName}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDate(result.createdAt)}
          </span>
          <span className="font-mono text-xs tabular-nums" style={{ color }}>
            {result.confidence}%
          </span>
        </div>
      </div>
    </Card>
  )
}

export function HistoryClient() {
  const { history, clearHistory } = useHistory()

  if (history.length === 0) {
    return (
      <Card className="glass flex flex-col items-center gap-4 border-border px-6 py-20 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl border border-border bg-secondary/60 text-muted-foreground">
          <ImageOff className="size-6" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">No analyses yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your analyzed images will appear here.
          </p>
        </div>
        <Button
          render={<Link href="/analyze" />}
          nativeButton={false}
          className="bg-gradient-brand text-primary-foreground glow-brand"
        >
          Analyze your first image
        </Button>
      </Card>
    )
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {history.length} {history.length === 1 ? "analysis" : "analyses"}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={clearHistory}
          className="border-border"
        >
          <Trash2 className="size-4" />
          Clear history
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {history.map((result) => (
          <HistoryCard key={result.id} result={result} />
        ))}
      </div>
    </>
  )
}
