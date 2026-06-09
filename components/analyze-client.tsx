"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { ImageUp, ScanSearch, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ResultView } from "@/components/result-view"
import { analyzeImage } from "@/lib/analyze"
import { useHistory } from "@/lib/history-context"
import { cn } from "@/lib/utils"
import type { AnalysisResult } from "@/lib/types"

type Stage = "idle" | "preview" | "scanning" | "result"

const SCAN_STEPS = [
  "Reading metadata",
  "Analyzing noise patterns",
  "Inspecting compression artifacts",
  "Detecting AI signatures",
]

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"]

export function AnalyzeClient() {
  const { addResult } = useHistory()
  const inputRef = useRef<HTMLInputElement>(null)
  const [stage, setStage] = useState<Stage>("idle")
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [progress, setProgress] = useState(0)
  const [scanStep, setScanStep] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback((file: File) => {
    setError(null)
    if (!ACCEPTED.includes(file.type)) {
      setError("Unsupported format. Please use JPG, PNG or WEBP.")
      return
    }
    const url = URL.createObjectURL(file)
    setPreview({ url, name: file.name })
    setStage("preview")
  }, [])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const runScan = useCallback(() => {
    if (!preview) return
    setStage("scanning")
    setProgress(0)
    setScanStep(0)

    let value = 0
    const interval = setInterval(() => {
      value = Math.min(100, value + 2)
      setProgress(value)
      setScanStep(Math.min(SCAN_STEPS.length - 1, Math.floor(value / 25)))
      if (value >= 100) {
        clearInterval(interval)
        const res = analyzeImage(preview.url, preview.name)
        setResult(res)
        addResult(res)
        setTimeout(() => setStage("result"), 250)
      }
    }, 45)
  }, [preview, addResult])

  const reset = () => {
    setStage("idle")
    setPreview(null)
    setResult(null)
    setProgress(0)
    setError(null)
  }

  if (stage === "result" && result) {
    return <ResultView result={result} onReset={reset} />
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="glass border-border p-6 sm:p-8">
        {stage === "idle" && (
          <>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={cn(
                "flex w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-colors",
                dragging
                  ? "border-primary bg-primary/10"
                  : "border-border bg-secondary/30 hover:border-primary/50",
              )}
            >
              <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground glow-brand">
                <ImageUp className="size-7" />
              </span>
              <span className="text-base font-semibold">
                Drag & drop your image here
              </span>
              <span className="text-sm text-muted-foreground">
                or click to browse {"\u2022"} JPG, PNG, WEBP
              </span>
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={onInputChange}
            />
            {error && (
              <p className="mt-4 text-center text-sm text-destructive">{error}</p>
            )}
          </>
        )}

        {stage === "preview" && preview && (
          <div className="flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <Image
                src={preview.url || "/placeholder.svg"}
                alt="Selected image preview"
                width={640}
                height={480}
                unoptimized
                className="h-auto max-h-[360px] w-full object-contain"
              />
              <button
                type="button"
                onClick={reset}
                aria-label="Remove image"
                className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="truncate text-sm text-muted-foreground">{preview.name}</p>
            <Button
              size="lg"
              onClick={runScan}
              className="w-full bg-gradient-brand text-primary-foreground glow-brand"
            >
              <ScanSearch className="size-4" />
              Analyze Image
            </Button>
          </div>
        )}

        {stage === "scanning" && preview && (
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-border">
              <Image
                src={preview.url || "/placeholder.svg"}
                alt="Image being analyzed"
                width={640}
                height={480}
                unoptimized
                className="h-auto max-h-[300px] w-full object-contain opacity-80"
              />
              {/* scan line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 h-1 w-full bg-gradient-brand shadow-[0_0_18px_4px_oklch(0.62_0.2_265_/_0.7)]"
                style={{ animation: "scan-line 1.4s ease-in-out infinite alternate" }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-primary/10"
              />
            </div>

            <div className="w-full max-w-sm">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="size-4 animate-spin text-primary" />
                  {SCAN_STEPS[scanStep]}
                </span>
                <span className="font-mono tabular-nums text-foreground">
                  {progress}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-brand transition-[width] duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
