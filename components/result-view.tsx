"use client";

import Image from "next/image";
import {
  Camera,
  Sparkles,
  Fingerprint,
  Waves,
  FileWarning,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CircularProgress } from "@/components/circular-progress";
import { IndicatorBar } from "@/components/indicator-bar";
import { cn } from "@/lib/utils";
import type { AnalysisResult } from "@/lib/types";
import { log } from "console";

const reasonIcons = [Fingerprint, FileWarning, Waves];

export function ResultView({
  result,
  onReset,
}: {
  result: AnalysisResult;
  onReset: () => void;
}) {
  const isReal = result.verdict?.toLowerCase?.() === "real";

  const verdictColor = isReal
    ? "var(--success)"
    : "var(--destructive)";

  const indicators = result.indicators ?? [];
  const reasons = result.reasons ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left: image preview */}
      <Card className="glass overflow-hidden border-border p-3">
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={result.imageUrl || "/placeholder.svg"}
            alt={result.fileName || "Analyzed image"}
            width={800}
            height={800}
            className="h-auto max-h-[520px] w-full object-contain"
            unoptimized
          />
        </div>

        <p className="truncate px-1 pt-3 text-sm text-muted-foreground">
          {result.fileName || "Uploaded image"}
        </p>
      </Card>

      {/* Right: verdict + details */}
      <div className="flex flex-col gap-6">
        <Card className="glass border-border p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <CircularProgress
              value={result.confidence ?? 0}
              size={150}
              strokeWidth={11}
              indicatorClassName={cn(
                isReal
                  ? "stroke-[var(--success)]"
                  : "stroke-[var(--destructive)]"
              )}
            >
              <div className="text-center">
                <span className="block text-3xl font-semibold tabular-nums">
                  {result.confidence ?? 0}%
                </span>
                <span className="text-xs text-muted-foreground">
                  confidence
                </span>
              </div>
            </CircularProgress>

            <div className="flex flex-1 flex-col items-center gap-3 sm:items-start">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{
                  color: verdictColor,
                  backgroundColor: `color-mix(in oklch, ${verdictColor} 18%, transparent)`,
                  border: `1px solid color-mix(in oklch, ${verdictColor} 40%, transparent)`,
                }}
              >
                {isReal ? (
                  <Camera className="size-4" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                {isReal ? "Real Camera Image" : "AI Generated Image"}
              </span>

              <p className="text-pretty text-center text-sm text-muted-foreground sm:text-left">
                {isReal
                  ? "This image shows characteristics of an authentic camera capture."
                  : "This image shows patterns commonly found in AI-generated images."}
              </p>

              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                className="border-border"
              >
                <RotateCcw className="size-4" />
                Analyze another
              </Button>
            </div>
          </div>
        </Card>

        {/* Indicators (SAFE) */}
        <div className="grid gap-3 sm:grid-cols-2">
          {indicators.length > 0 ? (
            indicators.map((indicator: any, idx: number) => (
              <IndicatorBar
                key={indicator.label ?? idx}
                indicator={indicator}
              />
            ))
          ) : (
            <Card className="p-4 text-sm text-muted-foreground border-border">
              No indicator data available
            </Card>
          )}
        </div>
      </div>

      {/* Why this decision */}
      <div className="lg:col-span-2">
        <h3 className="mb-4 text-lg font-semibold">
          Why was this decision made?
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          {reasons.length > 0 ? (
            reasons.map((reason: any, i: number) => {
              const Icon = reasonIcons[i % reasonIcons.length];

              return (
                <Card
                  key={reason.title ?? i}
                  className="glass border-border p-5"
                >
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl border border-border bg-secondary/60 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <h4 className="mb-1.5 text-sm font-semibold">
                    {reason.title}
                  </h4>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </Card>
              );
            })
          ) : (
            <Card className="p-4 text-sm text-muted-foreground border-border md:col-span-3">
              No explanation details available from backend.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}