"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Sparkles,
  ImageOff,
  Trash2,
  Search,
} from "lucide-react";

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

  const color = isReal
    ? "var(--success)"
    : "var(--destructive)";

  return (
    <Card className="glass group overflow-hidden border-border p-0 transition-colors hover:border-primary/50">
      <Link href={`/history/${result.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={result.imageUrl || "/placeholder.svg"}
            alt={result.fileName || "History image"}
            fill
            unoptimized
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

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

            <span
              className="font-mono text-xs tabular-nums"
              style={{ color }}
            >
              {result.confidence}%
            </span>
          </div>
        </div>
      </Link>

      <div className="absolute right-3 top-3 z-20">
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
            >
              <Trash2 className="size-4 text-red-500" />
            </Button>
          }
        />
      </div>
    </Card>
  );
}

export function HistoryClient() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "real" | "ai"
  >("all");

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const response = await api.get("/history");

      const formatted: AnalysisResult[] =
        response.data.map((item: any) => ({
          ...item,
          id: item._id,
          createdAt: new Date(
            item.created_at
          ).getTime(),
          imageUrl:
            item.image_url &&
            item.image_url.startsWith("/")
              ? `http://localhost:8000${item.image_url}`
              : "/placeholder.svg",
          fileName:
            item.file_name ||
            `${item.verdict} Image`,
        }));

      setHistory(formatted);
    } catch (error) {
      console.error(
        "Failed to fetch history:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  async function clearHistory() {
    try {
      await api.delete("/history");

      setHistory([]);
    } catch (error) {
      console.error(
        "Failed to clear history:",
        error
      );
    }
  }

  async function deleteHistory(id: string) {
    try {
      await api.delete(`/history/${id}`);

      setHistory((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(
        "Failed to delete history:",
        error
      );
    }
  }

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        !search ||
        item.fileName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const verdict =
        item.verdict?.toLowerCase() || "";

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "real"
          ? verdict === "real"
          : verdict.includes("ai");

      return matchesSearch && matchesFilter;
    });
  }, [history, search, filter]);

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
          <h2 className="text-lg font-semibold">
            No analyses yet
          </h2>

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
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredHistory.length}{" "}
            {filteredHistory.length === 1
              ? "analysis"
              : "analyses"}
          </p>

          <ConfirmDialog
            title="Clear all history?"
            description="All analyses will be permanently removed."
            confirmText="Clear History"
            destructive
            onConfirm={clearHistory}
            trigger={
              <Button
                variant="outline"
                size="sm"
              >
                <Trash2 className="mr-2 size-4" />
                Clear History
              </Button>
            }
          />
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search by filename..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={
                filter === "all"
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setFilter("all")
              }
            >
              All
            </Button>

            <Button
              size="sm"
              variant={
                filter === "real"
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setFilter("real")
              }
            >
              Real
            </Button>

            <Button
              size="sm"
              variant={
                filter === "ai"
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setFilter("ai")
              }
            >
              AI
            </Button>
          </div>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <Card className="glass p-10 text-center">
          <p className="text-muted-foreground">
            No matching analyses found.
          </p>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHistory.map((result) => (
            <HistoryCard
              key={result.id}
              result={result}
              onDelete={deleteHistory}
            />
          ))}
        </div>
      )}
    </>
  );
}