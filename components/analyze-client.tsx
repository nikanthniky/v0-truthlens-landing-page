"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ImageUp, ScanSearch, X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResultView } from "@/components/result-view";

import api from "@/lib/api";
import { useHistory } from "@/lib/history-context";
import { cn } from "@/lib/utils";
import type { AnalysisResult } from "@/lib/types";

type Stage = "idle" | "preview" | "scanning" | "result";

const SCAN_STEPS = [
  "Reading metadata",
  "Analyzing noise patterns",
  "Inspecting compression artifacts",
  "Detecting AI signatures",
];

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

export function AnalyzeClient() {
  const { addResult } = useHistory();

  const inputRef = useRef<HTMLInputElement>(null);

  const [stage, setStage] = useState<Stage>("idle");
  const [dragging, setDragging] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [result, setResult] = useState<AnalysisResult | null>(null);

  const [progress, setProgress] = useState(0);
  const [scanStep, setScanStep] = useState(0);

  const [error, setError] = useState<string | null>(null);

  // ---------------- FILE HANDLING ----------------
  const handleFile = useCallback((file: File) => {
    setError(null);

    if (!ACCEPTED.includes(file.type)) {
      setError("Unsupported format. Please use JPG, PNG or WEBP.");
      return;
    }

    setFile(file);
    setPreview(URL.createObjectURL(file));
    setStage("preview");
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // ---------------- API CALL ----------------
  const runScan = useCallback(async () => {
    if (!file) return;

    setStage("scanning");
    setProgress(0);
    setScanStep(0);
    setError(null);

    let value = 0;

    const interval = setInterval(() => {
      value = Math.min(95, value + 2);
      setProgress(value);
      setScanStep(Math.floor(value / 25));
    }, 50);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/detect", formData);

      clearInterval(interval);

      const data = response.data;

      // ---------------- SAFE NORMALIZATION ----------------
      const normalized: AnalysisResult = {
        fileName: data.file_name,
        imageUrl: `http://localhost:8000${data.image_url}`,

        verdict: data.verdict,
        confidence: data.confidence,
        confidence_level: data.confidence_level,

        metadata: data.metadata ?? {},
        ai_result: data.ai_result ?? [],
        reasons: data.reasons ?? [],
        indicators: data.indicators ?? [],
      };

      setProgress(100);
      setScanStep(3);

      setResult(normalized);
      addResult(normalized);

      setTimeout(() => setStage("result"), 300);
    } catch (err) {
      console.error(err);
      clearInterval(interval);
      setError("Analysis failed. Please try again.");
      setStage("preview");
    }
  }, [file, addResult]);

  // ---------------- RESET ----------------
  const reset = () => {
    setStage("idle");
    setFile(null);
    setPreview(null);
    setResult(null);
    setProgress(0);
    setError(null);
  };

  // ---------------- RESULT VIEW ----------------
  if (stage === "result" && result) {
    return <ResultView result={result} onReset={reset} />;
  }

  // ---------------- UI ----------------
  return (
    <div className="mx-auto max-w-2xl">
      <Card className="glass border-border p-6 sm:p-8">
        {/* ---------------- IDLE ---------------- */}
        {stage === "idle" && (
          <>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={cn(
                "flex w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-colors",
                dragging
                  ? "border-primary bg-primary/10"
                  : "border-border bg-secondary/30 hover:border-primary/50",
              )}
            >
              <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground">
                <ImageUp className="size-7" />
              </span>

              <span className="text-base font-semibold">
                Drag & drop your image here
              </span>

              <span className="text-sm text-muted-foreground">
                or click to browse • JPG, PNG, WEBP
              </span>
            </button>

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={onInputChange}
            />

            {error && (
              <p className="mt-4 text-center text-sm text-red-500">{error}</p>
            )}
          </>
        )}

        {/* ---------------- PREVIEW ---------------- */}
        {stage === "preview" && preview && (
          <div className="flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <Image
                src={preview}
                alt="preview"
                width={600}
                height={400}
                className="w-full object-contain"
                unoptimized
              />

              <button
                onClick={reset}
                className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <Button
              onClick={runScan}
              className="w-full bg-gradient-brand text-white"
            >
              <ScanSearch className="mr-2 size-4" />
              Analyze Image
            </Button>
          </div>
        )}

        {/* ---------------- SCANNING ---------------- */}
        {stage === "scanning" && preview && (
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border">
              <Image
                src={preview}
                alt="scanning"
                width={600}
                height={400}
                className="opacity-80"
                unoptimized
              />

              <div className="absolute inset-0 bg-primary/10" />
            </div>

            <div className="w-full max-w-sm">
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin size-4" />
                  {SCAN_STEPS[scanStep]}
                </span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 w-full rounded bg-gray-200">
                <div
                  className="h-2 bg-green-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
