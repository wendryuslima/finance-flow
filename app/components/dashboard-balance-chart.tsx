"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardTrendPoint } from "@/types/dashboard";

interface DashboardBalanceChartProps {
  data: DashboardTrendPoint[];
}

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export const DashboardBalanceChart = ({ data }: DashboardBalanceChartProps) => {
  return (
    <Card className="gap-0 border border-border/70 bg-card/80 py-0">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 px-5 py-4">
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
          Evolução mensal
        </CardTitle>
        <div className="rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
          vs - 5.2%
        </div>
      </CardHeader>

      <CardContent className="px-4 py-5">
        <ChartContainer
          className="h-[240px] w-full"
          config={chartConfig}
          initialDimension={{ width: 640, height: 240 }}
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: -20, right: 4, top: 8, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillTotal" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-total)"
                  stopOpacity={0.28}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-total)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={true} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tickLine={false}
              tickMargin={8}
            />
            <YAxis
              axisLine={false}
              tickCount={5}
              tickFormatter={(value) => `${value}`}
              tickLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
            />
            <Area
              dataKey="total"
              fill="url(#fillTotal)"
              fillOpacity={1}
              stroke="var(--color-total)"
              strokeWidth={2.6}
              type="monotone"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
