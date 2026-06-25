"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Sparkles, ImageOff, Trash2 } from "lucide-react";

import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/ui/loading-card";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import type { AnalysisResult } from "@/lib/types";

function formatDate(ts: number) {
  return new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function HistoryCard({
  result,
  onDelete,
}: {
  result: AnalysisResult;
  onDelete: (id: string) => void;
}) {
  const isReal = result.verdict?.toLowerCase() === "real";

  const color = isReal ? "var(--success)" : "var(--destructive)";

  return (
    <Card className="glass group overflow-hidden border-border p-0 transition-colors hover:border-primary/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={result.imageUrl || "/placeholder.svg"}
          alt={result.fileName || "History image"}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Delete Single History */}
        <ConfirmDialog
          title="Delete this analysis?"
          description="This action cannot be undone."
          confirmText="Delete"
          destructive
          onConfirm={() => onDelete(result.id)}
          trigger={
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-3 top-3 z-10"
            >
              <Trash2 className="size-4 text-red-500" />
            </Button>
          }
        />

        {/* Verdict Badge */}
        <span
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur"
          style={{
            color,
            backgroundColor: `color-mix(in oklch, ${color} 22%, oklch(0.16 0.02 265 / 0.7))`,
            border: `1px solid color-mix(in oklch, ${color} 45%, transparent)`,
          }}
        >
          {isReal ? (
            <Camera className="size-3.5" />
          ) : (
            <Sparkles className="size-3.5" />
          )}

          {isReal ? "Real" : "AI"}
        </span>
      </div>

      <div className="p-4">
        <p className="truncate text-sm font-medium">
          {result.fileName || "Analyzed Image"}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDate(result.createdAt)}
          </span>

          <span className="font-mono text-xs tabular-nums" style={{ color }}>
            {result.confidence}%
          </span>
        </div>
      </div>
    </Card>
  );
}

export function HistoryClient() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const response = await api.get("/history");

      const formatted: AnalysisResult[] = response.data.map((item: any) => ({
        ...item,
        id: item._id,
        createdAt: new Date(item.created_at).getTime(),
        imageUrl:
          item.image_url && item.image_url.startsWith("/")
            ? `http://localhost:8000${item.image_url}`
            : "/placeholder.svg",
        fileName: item.file_name,
      }));

      setHistory(formatted);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  }

  async function clearHistory() {
    try {
      await api.delete("/history");

      setHistory([]);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  }

  async function deleteHistory(id: string) {
    try {
      await api.delete(`/history/${id}`);

      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete history:", error);
    }
  }

  if (loading) {
    return <LoadingCard />;
  }

  if (history.length === 0) {
    return (
      <Card className="glass flex flex-col items-center gap-4 border-border px-6 py-20 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl border border-border bg-secondary/60 text-muted-foreground">
          <ImageOff className="size-6" />
        </span>

        <div>
          <h2 className="text-lg font-semibold">No analyses yet</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your analyzed images will appear here.
          </p>
        </div>

        <Button
          render={<Link href="/analyze" />}
          nativeButton={false}
          className="bg-gradient-brand text-primary-foreground glow-brand"
        >
          Analyze your first image
        </Button>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {history.length} {history.length === 1 ? "analysis" : "analyses"}
        </p>

        {/* Clear All History */}
        <ConfirmDialog
          title="Clear all history?"
          description="All analyses will be permanently removed."
          confirmText="Clear History"
          destructive
          onConfirm={clearHistory}
          trigger={
            <Button variant="outline" size="sm">
              <Trash2 className="mr-2 size-4" />
              Clear History
            </Button>
          }
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {history.map((result) => (
          <HistoryCard
            key={result.id}
            result={result}
            onDelete={deleteHistory}
          />
        ))}
      </div>
    </>
  );
}
