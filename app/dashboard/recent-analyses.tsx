"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Sparkles } from "lucide-react";
import { Separator } from "@base-ui/react";

interface Analysis {
  _id: string;
  verdict: string;
  confidence: number;
  file_name?: string;
  metadata?: {
    format?: string;
  };
  created_at: string;
}

interface RecentAnalysesProps {
  analyses: Analysis[];
}

export function RecentAnalyses({ analyses }: RecentAnalysesProps) {
  return (
    <Card className="glass border-border/50 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Analyses
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Latest image detection results
        </p>
      </div>

      <div className="space-y-4">
        {analyses.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No analyses available.
          </p>
        ) : (
          analyses.map((analysis, index) => {
            const isReal = analysis.verdict === "Real";

            return (
              <div key={analysis._id}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-1 items-center gap-3 min-w-0">
                    <div className="rounded-lg bg-secondary/40 p-2 flex-shrink-0">
                      {isReal ? (
                        <Camera className="size-4 text-green-500" />
                      ) : (
                        <Sparkles className="size-4 text-red-500" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {analysis.file_name || "Analysis Result"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {analysis.metadata?.format || "Unknown"} •{" "}
                        {new Date(analysis.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Badge
                      variant={isReal ? "outline" : "secondary"}
                      className={
                        isReal
                          ? "border-green-500 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }
                    >
                      {isReal ? "Real Image" : "AI Generated"}
                    </Badge>

                    <span className="text-sm font-semibold text-primary">
                      {analysis.confidence}%
                    </span>
                  </div>
                </div>

                {index < analyses.length - 1 && (
                  <Separator className="mt-4 bg-border/30" />
                )}
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
