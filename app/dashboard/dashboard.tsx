"use client";

import { useEffect, useState } from "react";
import { Activity, ShieldCheck, Sparkles, BarChart3 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { StatsCard } from "./stats-card";
import { RecentAnalyses } from "./recent-analyses";
import { QuickActions } from "./quick-action";
import { DistributionChart } from "./distribution-chart";
import api from "@/lib/api";


interface DashboardStats {
  total_scans: number;
  real_images: number;
  ai_images: number;
  average_confidence: number;
  recent_analyses: any[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  async function fetchStats() {
    try {
      const response = await api.get("/stats");

      setStats(response.data);
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchStats();
}, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl py-10">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor image analysis activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={Activity}
          label="Total Scans"
          value={stats?.total_scans ?? 0}
          description="All analyses performed"
        />

        <StatsCard
          icon={ShieldCheck}
          label="Real Images"
          value={stats?.real_images ?? 0}
          description="Authentic camera images"
        />

        <StatsCard
          icon={Sparkles}
          label="AI Images"
          value={stats?.ai_images ?? 0}
          description="AI-generated images"
        />

        <StatsCard
          icon={BarChart3}
          label="Average Confidence"
          value={`${stats?.average_confidence ?? 0}%`}
          description="Overall confidence score"
        />
      </div>

      {/* Recent Analyses */}
      <RecentAnalyses analyses={stats?.recent_analyses ?? []} />

      {/* Detection Distribution */}
      <Card className="glass border-border p-6">
        <h2 className="mb-4 text-xl font-semibold">Detection Distribution</h2>

        <DistributionChart
          realImages={stats?.real_images ?? 0}
          aiImages={stats?.ai_images ?? 0}
        />
      </Card>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
