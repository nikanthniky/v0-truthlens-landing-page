import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnalyzeClient } from "@/components/analyze-client";
import ProtectedRoute from "@/components/protected-route";
import { SiteLayout } from "@/components/site-layout";

export default function AnalyzePage() {
  return (
    <SiteLayout>
      <ProtectedRoute>
        <div className="flex min-h-screen flex-col">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
          />
          <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:py-16">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Analyze an image
              </h1>
              <p className="mt-3 text-pretty text-muted-foreground">
                Upload a photo to detect whether it is an authentic camera
                capture or an AI-generated creation.
              </p>
            </div>
            <AnalyzeClient />
          </div>
        </div>
      </ProtectedRoute>
    </SiteLayout>
  );
}
