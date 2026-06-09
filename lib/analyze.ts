import type { AnalysisResult, DetectionIndicator, Verdict } from "./types"

function rand(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min))
}

/**
 * Mock analysis. In a real product this would call a detection model.
 * Produces a deterministic-feeling but randomized result for demo purposes.
 */
export function analyzeImage(imageUrl: string, fileName: string): AnalysisResult {
  const isAi = Math.random() > 0.5
  const verdict: Verdict = isAi ? "ai" : "real"

  // For AI images, indicator scores trend low; for real images, high.
  const base = isAi ? () => rand(8, 42) : () => rand(62, 96)

  const indicators: DetectionIndicator[] = [
    {
      label: "Metadata Score",
      score: isAi ? rand(4, 35) : rand(70, 98),
      description: isAi
        ? "EXIF camera fields are missing or inconsistent with a physical sensor."
        : "Valid EXIF data including camera model, lens and capture settings.",
    },
    {
      label: "Noise Pattern Analysis",
      score: base(),
      description: isAi
        ? "Sensor noise distribution does not match natural photon shot noise."
        : "Natural sensor noise fingerprint consistent with a real camera.",
    },
    {
      label: "Compression Artifacts",
      score: base(),
      description: isAi
        ? "Compression signature differs from typical in-camera JPEG pipelines."
        : "Compression artifacts align with standard camera processing.",
    },
    {
      label: "AI Signature Detection",
      score: isAi ? rand(2, 28) : rand(74, 99),
      description: isAi
        ? "Latent diffusion patterns and frequency fingerprints were detected."
        : "No generative model fingerprints found in the frequency domain.",
    },
  ]

  const avg = Math.round(
    indicators.reduce((sum, i) => sum + i.score, 0) / indicators.length,
  )
  // Confidence in the verdict
  const confidence = isAi ? rand(100 - avg, 99) : avg

  const reasons = isAi
    ? [
        {
          title: "Synthetic frequency fingerprint",
          description:
            "Periodic patterns in the high-frequency domain are characteristic of generative diffusion models.",
        },
        {
          title: "Absent sensor metadata",
          description:
            "No camera, lens, ISO or shutter information was found in the file's metadata.",
        },
        {
          title: "Unnatural noise floor",
          description:
            "Pixel-level noise is too uniform to originate from a physical image sensor.",
        },
      ]
    : [
        {
          title: "Authentic sensor noise",
          description:
            "Photon shot noise and pattern noise match the behavior of a real CMOS sensor.",
        },
        {
          title: "Complete capture metadata",
          description:
            "The file contains consistent EXIF data including device, lens and exposure settings.",
        },
        {
          title: "No generative fingerprints",
          description:
            "Frequency analysis found none of the signatures left by AI image generators.",
        },
      ]

  return {
    id: crypto.randomUUID(),
    imageUrl,
    fileName,
    verdict,
    confidence: Math.min(99, Math.max(55, confidence)),
    createdAt: Date.now(),
    indicators,
    reasons,
  }
}
