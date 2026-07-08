import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import Dashboard from "@/app/dashboard/dashboard";

export const metadata = {
  title: "Dashboard — TruthLens",
  description: "Overview of image analysis statistics and activity.",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:py-16">
        <div className="mb-8">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Monitor your image analysis activity, view statistics, and track
            AI-generated versus real images over time.
          </p>
        </div>

        <Dashboard />
      </main>

      <SiteFooter />
    </div>
  );
}