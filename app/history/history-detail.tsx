"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  Sparkles,
  FileImage,
  ShieldCheck,
} from "lucide-react";

import api from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/ui/loading-card";

interface HistoryDetailProps {
  id: string;
}

export function HistoryDetail({
  id,
}: HistoryDetailProps) {
  const router = useRouter();

  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
  }, [id]);

  async function fetchAnalysis() {
    try {
      const response = await api.get(`/history/${id}`);

      setAnalysis(response.data);
    } catch (error) {
      console.error("Failed to fetch analysis:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingCard />;
  }

  if (!analysis) {
    return (
      <Card className="glass border-border p-10 text-center">
        Analysis not found
      </Card>
    );
  }

  const isReal =
    analysis.verdict?.toLowerCase() === "real";

  const verdictColor = isReal
    ? "text-green-500"
    : "text-red-500";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/history")}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to History
        </Button>
      </div>

      {/* Image + Summary */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Image */}
        <Card className="glass overflow-hidden border-border p-0">
          <div className="relative aspect-[4/3]">
            <Image
              src={`http://localhost:8000${analysis.image_url}`}
              alt={analysis.file_name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </Card>

        {/* Summary */}
        <Card className="glass border-border p-6">
          <div className="flex items-center gap-3">
            {isReal ? (
              <Camera className="size-7 text-green-500" />
            ) : (
              <Sparkles className="size-7 text-red-500" />
            )}

            <div>
              <h2 className="text-2xl font-bold">
                {analysis.verdict}
              </h2>

              <p className="text-muted-foreground">
                Analysis Result
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">
                File Name
              </p>

              <p className="font-medium">
                {analysis.file_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Confidence
              </p>

              <p
                className={`text-3xl font-bold ${verdictColor}`}
              >
                {analysis.confidence}%
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Confidence Level
              </p>

              <p className="font-medium">
                {analysis.confidence_level}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Metadata */}
      <Card className="glass border-border p-6">
        <div className="mb-4 flex items-center gap-2">
          <FileImage className="size-5" />
          <h3 className="text-lg font-semibold">
            Image Metadata
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">
              Format
            </p>

            <p className="font-medium">
              {analysis.metadata?.format}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Mode
            </p>

            <p className="font-medium">
              {analysis.metadata?.mode}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Resolution
            </p>

            <p className="font-medium">
              {analysis.metadata?.size?.[0]} ×{" "}
              {analysis.metadata?.size?.[1]}
            </p>
          </div>
        </div>
      </Card>

      {/* Reasons */}
      <Card className="glass border-border p-6">
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="size-5" />
          <h3 className="text-lg font-semibold">
            Detection Reasons
          </h3>
        </div>

        <div className="space-y-4">
          {analysis.reasons?.map(
            (reason: any, index: number) => (
              <div
                key={index}
                className="rounded-xl border border-border p-4"
              >
                <h4 className="font-medium">
                  {reason.title}
                </h4>

                <p className="mt-1 text-sm text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            )
          )}
        </div>
      </Card>

      {/* Indicators */}
      <Card className="glass border-border p-6">
        <h3 className="mb-6 text-lg font-semibold">
          Analysis Indicators
        </h3>

        <div className="space-y-5">
          {analysis.indicators?.map(
            (indicator: any, index: number) => (
              <div key={index}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{indicator.label}</span>
                  <span>{indicator.score}%</span>
                </div>

                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-gradient-brand"
                    style={{
                      width: `${indicator.score}%`,
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </Card>
    </div>
  );
}