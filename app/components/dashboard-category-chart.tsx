"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DashboardCategoryPoint } from "@/types/dashboard";

interface DashboardCategoryChartProps {
  data: DashboardCategoryPoint[];
}

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export const DashboardCategoryChart = ({
  data,
}: DashboardCategoryChartProps) => {
  return (
    <Card className="gap-0 border border-border/70 bg-card/80 py-0">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
          Gastos por Categoria
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 py-5">
        <ChartContainer
          className="h-[240px] w-full"
          config={chartConfig}
          initialDimension={{ width: 900, height: 240 }}
        >
          <BarChart data={data} margin={{ left: 12, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="categoryBarFill" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={true} />
            <XAxis
              axisLine={false}
              dataKey="category"
              tickLine={false}
              tickMargin={8}
            />
            <YAxis
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              tickLine={false}
              tickMargin={10}
              width={48}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="dot" />}
              cursor={false}
            />
            <Bar dataKey="total" radius={[4, 4, 0, 0]}>
              {data.map((item) => (
                <Cell
                  key={item.category}
                  fill="url(#categoryBarFill)"
                  stroke="var(--primary)"
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
