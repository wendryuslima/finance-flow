"use client";

import { Cell, Pie, PieChart } from "recharts";

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
import type { DashboardStatusDistributionPoint } from "@/types/dashboard";

interface DashboardInsightsCardProps {
  data: DashboardStatusDistributionPoint[];
}

const chartConfig = {
  paid: {
    label: "Pagas",
    color: "var(--success)",
  },
  pending: {
    label: "Pendentes",
    color: "var(--warning)",
  },
  overdue: {
    label: "Atrasadas",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

const legendToneClassName = {
  paid: "text-success",
  pending: "text-warning",
  overdue: "text-destructive",
} as const;

const legendSwatchStyle = {
  paid: { backgroundColor: "var(--success)" },
  pending: { backgroundColor: "var(--warning)" },
  overdue: { backgroundColor: "var(--destructive)" },
} as const;

export const DashboardInsightsCard = ({ data }: DashboardInsightsCardProps) => {
  return (
    <Card className="gap-0 border border-border/70 bg-card/80 py-0">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
          Distribuicao por Status
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 px-4 py-5">
        <ChartContainer
          className="mx-auto h-[240px] w-full max-w-[260px]"
          config={chartConfig}
          initialDimension={{ width: 260, height: 240 }}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel indicator="dot" />}
              cursor={false}
            />
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              dataKey="value"
              innerRadius={56}
              outerRadius={82}
              paddingAngle={3}
              strokeWidth={2}
            >
              {data.map((item) => (
                <Cell
                  key={item.status}
                  fill={`var(--color-${item.status})`}
                  stroke={`var(--color-${item.status})`}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex items-center justify-center gap-4 text-xs font-medium">
          {data.map((item) => (
            <div key={item.status} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-[2px]"
                style={legendSwatchStyle[item.status]}
              />
              <span className={legendToneClassName[item.status]}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
