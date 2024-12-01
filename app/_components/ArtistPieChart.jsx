"use client";

import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatToIndianNumber } from "@/lib/utils";

export function ArtistPieChart({
  totalCount,
  liveCount,
  unlistedCount,
  hiddenCount,
}) {
  const chartData = [
    { browser: "live", visitors: liveCount, fill: "#008000" },
    {
      browser: "unlisted",
      visitors: unlistedCount,
      fill: "#FFA500",
    },
    { browser: "hidden", visitors: hiddenCount, fill: "#FF0000" },
  ];

  const chartConfig = {
    live: {
      label: "Live Artists",
      color: "#f44336",
    },
    unlisted: {
      label: "Unlisted Artists",
      color: "hsl(var(--chart-2))",
    },
    hidden: {
      label: "Hidden Artists",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <Card className="flex flex-col shadow-lg">
      <CardHeader className="items-center pb-0 pt-2 m-0">
        <CardTitle>Artists</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 m-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[155px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={40}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {formatToIndianNumber(totalCount)}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
