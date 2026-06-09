import { cn } from "@/lib/utils"

type CircularProgressProps = {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  trackClassName?: string
  indicatorClassName?: string
  children?: React.ReactNode
}

export function CircularProgress({
  value,
  size = 180,
  strokeWidth = 12,
  className,
  trackClassName,
  indicatorClassName,
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, value))
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${clamped}%`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={cn("stroke-secondary", trackClassName)}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
          className={cn("stroke-primary", indicatorClassName)}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
