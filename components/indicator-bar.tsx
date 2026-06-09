import { cn } from "@/lib/utils"
import type { DetectionIndicator } from "@/lib/types"

export function IndicatorBar({ indicator }: { indicator: DetectionIndicator }) {
  const { label, score, description } = indicator
  const tone =
    score >= 60 ? "var(--success)" : score >= 40 ? "var(--chart-4)" : "var(--destructive)"

  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-mono text-sm tabular-nums" style={{ color: tone }}>
          {score}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-[width] duration-700")}
          style={{ width: `${score}%`, backgroundColor: tone }}
        />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
