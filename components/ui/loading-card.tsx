import { Card } from "@/components/ui/card";
import { Skeleton } from "./skeleton";

interface LoadingCardProps {
  count?: number;
}

export function LoadingCard({
  count = 6,
}: LoadingCardProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="glass overflow-hidden border-border p-0"
        >
          <Skeleton className="aspect-[4/3]" />

          <div className="space-y-3 p-4">
            <Skeleton className="h-4 w-3/4" />

            <div className="flex justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}