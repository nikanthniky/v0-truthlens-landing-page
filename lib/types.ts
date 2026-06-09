export type Verdict = "real" | "ai"

export type DetectionIndicator = {
  label: string
  /** 0 - 100, higher = more authentic / camera-like */
  score: number
  description: string
}

export type AnalysisResult = {
  id: string
  imageUrl: string
  fileName: string
  verdict: Verdict
  /** 0 - 100 confidence in the verdict */
  confidence: number
  createdAt: number
  indicators: DetectionIndicator[]
  reasons: { title: string; description: string }[]
}
