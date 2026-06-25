'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, History } from 'lucide-react'

export function QuickActions() {
  return (
    <Card className="glass border-border/50 p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          render={<Link href="/analyze" />}
          nativeButton={false}
          size="lg"
          className="bg-gradient-brand text-primary-foreground glow-brand justify-start gap-2"
        >
          <Upload className="size-4" />
          Analyze New Image
        </Button>
        <Button
          render={<Link href="/history" />}
          nativeButton={false}
          size="lg"
          variant="outline"
          className="border-border justify-start gap-2"
        >
          <History className="size-4" />
          View History
        </Button>
      </div>
    </Card>
  )
}