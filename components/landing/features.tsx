import { BrainCircuit, FileSearch, Gauge, ShieldCheck } from "lucide-react"
import { Card } from "@/components/ui/card"

const features = [
  {
    icon: BrainCircuit,
    title: "AI Detection Engine",
    description:
      "A deep neural model trained on millions of real and synthetic images flags generative fingerprints invisible to the eye.",
  },
  {
    icon: FileSearch,
    title: "Metadata Analysis",
    description:
      "Inspects EXIF data, camera signatures and editing history to verify a genuine capture pipeline.",
  },
  {
    icon: Gauge,
    title: "Confidence Score",
    description:
      "Every verdict ships with a transparent confidence percentage and per-signal breakdown you can trust.",
  },
  {
    icon: ShieldCheck,
    title: "Fast & Secure Processing",
    description:
      "Results in seconds. Your images are processed privately and are never stored or shared.",
  },
]

export function Features() {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-5 py-20">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="mb-3 text-sm font-medium text-accent">Capabilities</p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Forensic-grade analysis, made simple
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          TruthLens combines multiple detection signals into a single, clear
          verdict you can act on.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="glass group relative overflow-hidden border-border p-6 transition-colors hover:border-primary/50"
          >
            <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-border bg-secondary/60 text-primary transition-colors group-hover:bg-gradient-brand group-hover:text-primary-foreground">
              <feature.icon className="size-5" />
            </div>
            <h3 className="mb-2 text-base font-semibold">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
