import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-border glass px-6 py-14 text-center md:px-12 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
        />
        <h2 className="relative text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Don{"\u2019"}t trust an image. Verify it.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          Upload your first image and get an instant authenticity verdict with a
          full confidence breakdown.
        </p>
        <div className="relative mt-8 flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-brand text-primary-foreground glow-brand"
          >
            <Link href="/analyze">
              Analyze Image
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
