import { Upload, ScanSearch, BadgeCheck } from "lucide-react"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Image",
    description:
      "Drag and drop a JPG, PNG or WEBP file, or browse from your device. Nothing leaves your session.",
  },
  {
    icon: ScanSearch,
    step: "02",
    title: "AI Analysis",
    description:
      "Our engine scans noise patterns, metadata, compression artifacts and generative fingerprints.",
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "Get Authenticity Result",
    description:
      "Receive a clear verdict with a confidence score and a full breakdown of why the decision was made.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative mx-auto w-full max-w-6xl px-5 py-20"
    >
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="mb-3 text-sm font-medium text-accent">How it works</p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          From upload to verdict in three steps
        </h2>
      </div>

      <ol className="relative grid gap-8 md:grid-cols-3">
        {/* connecting line */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
        />
        {steps.map((step) => (
          <li key={step.step} className="relative flex flex-col items-center text-center">
            <div className="relative z-10 mb-5 flex size-14 items-center justify-center rounded-2xl border border-border bg-gradient-brand text-primary-foreground glow-brand">
              <step.icon className="size-6" />
            </div>
            <span className="mb-2 font-mono text-xs text-muted-foreground">
              {step.step}
            </span>
            <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
