'use client'

import { Card } from '@/components/ui/card'

export function DistributionCard() {
  return (
    <Card className="glass border-border/50 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Detection Distribution</h3>
        <p className="mt-1 text-sm text-muted-foreground">Analysis breakdown across all scans</p>
      </div>

      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-dashed border-border/50 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Chart</p>
              <p className="text-sm text-muted-foreground mt-1">Coming Soon</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Pie chart visualization will display here
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-success/10 p-3">
          <p className="text-xs font-medium text-muted-foreground">Real Images</p>
          <p className="mt-1 text-2xl font-bold text-success">58%</p>
        </div>
        <div className="rounded-lg bg-accent/10 p-3">
          <p className="text-xs font-medium text-muted-foreground">AI Generated</p>
          <p className="mt-1 text-2xl font-bold text-accent">42%</p>
        </div>
      </div>
    </Card>
  )
}
