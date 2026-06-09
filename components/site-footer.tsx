import Link from "next/link"
import { Logo } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row">
        <Logo />
        <p className="text-sm text-muted-foreground">
          {"\u00A9"} {new Date().getFullYear()} TruthLens. Reveal the truth behind
          every image.
        </p>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/analyze" className="hover:text-foreground">
            Analyze
          </Link>
          <Link href="/history" className="hover:text-foreground">
            History
          </Link>
          <a href="#features" className="hover:text-foreground">
            Features
          </a>
        </nav>
      </div>
    </footer>
  )
}
