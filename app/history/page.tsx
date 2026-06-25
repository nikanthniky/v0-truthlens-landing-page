import { HistoryClient } from "@/components/history-client";
import { SiteLayout } from "@/components/site-layout";
import ProtectedRoute from "@/components/protected-route";

export const metadata = {
  title: "History — TruthLens",
  description: "Review your past image authenticity analyses.",
};

export default function HistoryPage() {
  return (
    <SiteLayout>
      <ProtectedRoute>
        <div className="flex min-h-screen flex-col">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
            <div className="mb-8">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Analysis History
              </h1>

              <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                Every image you analyze is saved here so you can revisit
                previous verdicts and confidence scores.
              </p>
            </div>

            <HistoryClient />
          </div>
        </div>
      </ProtectedRoute>
    </SiteLayout>
  );
}
