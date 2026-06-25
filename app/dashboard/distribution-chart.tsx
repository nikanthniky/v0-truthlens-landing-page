"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  realImages: number;
  aiImages: number;
}

export function DistributionChart({
  realImages,
  aiImages,
}: Props) {
  const data = [
    {
      name: "Real Images",
      value: realImages,
    },
    {
      name: "AI Images",
      value: aiImages,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            innerRadius={65}
            paddingAngle={4}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-1 flex justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-sm text-muted-foreground">
            Real Images
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-sm text-muted-foreground">
            AI Images
          </span>
        </div>
      </div>
    </div>
  );
}