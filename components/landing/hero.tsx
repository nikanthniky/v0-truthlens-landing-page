import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-32 h-[360px] w-[360px] rounded-full bg-accent/20 blur-[120px]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-20 pt-16 md:pt-24 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-accent" />
            AI-powered image authenticity
          </span>

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Reveal the Truth Behind{" "}
            <span className="text-gradient">Every Image.</span>
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Analyze photos using AI and determine whether they are authentic
            camera captures or AI-generated creations.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              render={<Link href="/analyze" />}
              nativeButton={false}
              size="lg"
              className="bg-gradient-brand text-primary-foreground glow-brand"
            >
              Analyze Image
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<Link href="#how-it-works" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="border-border"
            >
              Learn More
            </Button>
          </div>

          <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-[var(--success)]" />
            Private, fast and secure {"\u2014"} images never leave your session.
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border glass p-2 glow-brand">
            <Image
              src="/hero-analysis.png"
              alt="AI scanning a photograph to determine its authenticity"
              width={720}
              height={720}
              priority
              className="h-auto w-full rounded-2xl"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border glass px-4 py-3 sm:block">
            <p className="text-xs text-muted-foreground">Authenticity</p>
            <p className="text-lg font-semibold text-[var(--success)]">98.4% Real</p>
          </div>
        </div>
      </div>
    </section>
  )
}
