'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Camera, Sparkles } from 'lucide-react'

interface Analysis {
  id: string
  verdict: 'real' | 'ai'
  confidence: number
  format: string
  date: string
  filename: string
}

const mockAnalyses: Analysis[] = [
  {
    id: '1',
    verdict: 'real',
    confidence: 94,
    format: 'JPEG',
    date: '2025-01-15 14:32',
    filename: 'photo_landscape.jpg',
  },
  {
    id: '2',
    verdict: 'ai',
    confidence: 87,
    format: 'PNG',
    date: '2025-01-15 13:15',
    filename: 'generated_artwork.png',
  },
  {
    id: '3',
    verdict: 'real',
    confidence: 91,
    format: 'JPEG',
    date: '2025-01-15 12:45',
    filename: 'portrait_photo.jpg',
  },
  {
    id: '4',
    verdict: 'ai',
    confidence: 82,
    format: 'PNG',
    date: '2025-01-15 11:20',
    filename: 'ai_illustration.png',
  },
  {
    id: '5',
    verdict: 'real',
    confidence: 96,
    format: 'WEBP',
    date: '2025-01-15 10:05',
    filename: 'nature_scene.webp',
  },
]

export function RecentAnalyses() {
  return (
    <Card className="glass border-border/50 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Analyses</h3>
        <p className="mt-1 text-sm text-muted-foreground">Latest image detection results</p>
      </div>

      <div className="space-y-4">
        {mockAnalyses.map((analysis, index) => {
          const isReal = analysis.verdict === 'real'
          return (
            <div key={analysis.id}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-3 min-w-0">
                  <div className="rounded-lg bg-secondary/40 p-2 flex-shrink-0">
                    {isReal ? (
                      <Camera className="size-4 text-success" />
                    ) : (
                      <Sparkles className="size-4 text-accent" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {analysis.filename}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {analysis.format} • {analysis.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <Badge
                    variant={isReal ? 'outline' : 'secondary'}
                    className={isReal ? 'border-success text-success' : 'bg-accent/20 text-accent'}
                  >
                    {isReal ? 'Real Image' : 'AI Generated'}
                  </Badge>
                  <span className="text-sm font-semibold text-primary">
                    {analysis.confidence}%
                  </span>
                </div>
              </div>

              {index < mockAnalyses.length - 1 && (
                <Separator className="mt-4 bg-border/30" />
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
