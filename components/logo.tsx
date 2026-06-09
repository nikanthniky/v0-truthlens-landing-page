import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex size-8 items-center justify-center rounded-lg bg-gradient-brand glow-brand">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="size-5 text-primary-foreground"
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.55"
          />
          <path
            d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className="text-lg font-semibold tracking-tight">
        Truth<span className="text-gradient">Lens</span>
      </span>
    </div>
  )
}
