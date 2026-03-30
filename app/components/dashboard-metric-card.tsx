import { AlertCircle, CheckCircle2, Clock3 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DashboardMetric } from "@/types/dashboard";

interface DashboardMetricCardProps {
  metric: DashboardMetric;
}

const cardToneClassName: Record<DashboardMetric["tone"], string> = {
  paid: "border-success/35 bg-success/5",
  pending: "border-warning/35 bg-warning/5",
  overdue: "border-destructive/35 bg-destructive/5",
};

const iconToneClassName: Record<DashboardMetric["tone"], string> = {
  paid: "bg-success/15 text-success",
  pending: "bg-warning/15 text-warning",
  overdue: "bg-destructive/15 text-destructive",
};

const metricIcon = {
  paid: CheckCircle2,
  pending: Clock3,
  overdue: AlertCircle,
} satisfies Record<DashboardMetric["tone"], React.ComponentType<{ className?: string }>>;

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const DashboardMetricCard = ({ metric }: DashboardMetricCardProps) => {
  const Icon = metricIcon[metric.tone];
  const countLabel = `${metric.count} ${metric.count === 1 ? "conta" : "contas"}`;

  return (
    <Card className={`gap-0 border py-0 ${cardToneClassName[metric.tone]}`}>
      <CardHeader className="px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconToneClassName[metric.tone]}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <CardDescription className="pt-1 text-xs font-medium text-right text-foreground/70">
            {countLabel}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-1 px-4 pb-4 pt-0">
        <p className="text-sm text-foreground/70">{metric.label}</p>
        <CardTitle className="text-3xl font-semibold tracking-tight text-foreground">
          {currencyFormatter.format(metric.value)}
        </CardTitle>
      </CardContent>
    </Card>
  );
};
