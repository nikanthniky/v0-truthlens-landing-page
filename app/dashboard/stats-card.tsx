'use client'

import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  description: string
}

export function StatsCard({ icon: Icon, label, value, description }: StatsCardProps) {
  return (
    <Card className="glass border-border/50 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-lg bg-gradient-brand/10 p-3">
          <Icon className="size-6 text-primary" />
        </div>
      </div>
    </Card>
  )
}