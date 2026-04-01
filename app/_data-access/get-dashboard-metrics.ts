import { StatusType } from "@/app/generated/prisma/enums";
import {
  buildMaturityMonthFilter,
  getCurrentMonthValue,
  type MonthFilterValue,
} from "@/lib/months";
import { requireCurrentUserId } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import type { DashboardMetric } from "@/types/dashboard";

const dashboardMetricConfig: Record<
  StatusType,
  Pick<DashboardMetric, "id" | "label" | "tone">
> = {
  [StatusType.PAID]: {
    id: "paid",
    label: "Pagas",
    tone: "paid",
  },
  [StatusType.PENDING]: {
    id: "pending",
    label: "Pendentes",
    tone: "pending",
  },
  [StatusType.DEFEATED]: {
    id: "overdue",
    label: "Atrasadas",
    tone: "overdue",
  },
};

const dashboardMetricOrder = [
  StatusType.PAID,
  StatusType.PENDING,
  StatusType.DEFEATED,
] as const;

type GetDashboardMetricsParams = {
  month?: MonthFilterValue;
};

export const getDashboardMetrics = async ({
  month,
}: GetDashboardMetricsParams = {}): Promise<DashboardMetric[]> => {
  const userId = await requireCurrentUserId();
  const targetMonth = month ?? getCurrentMonthValue();
  const maturityFilter = buildMaturityMonthFilter(targetMonth);
  const where = {
    userId,
    ...(maturityFilter ? { maturity: maturityFilter } : {}),
  };

  const groupedAccounts = await prisma.accounts.groupBy({
    by: ["status"],
    where,
    _count: {
      _all: true,
    },
    _sum: {
      value: true,
    },
  });

  const groupedAccountsByStatus = new Map(
    groupedAccounts.map((group) => [
      group.status,
      {
        count: group._count._all,
        value: Number(group._sum.value ?? 0),
      },
    ])
  );

  return dashboardMetricOrder.map((status) => {
    const metricConfig = dashboardMetricConfig[status];
    const groupedMetric = groupedAccountsByStatus.get(status);

    return {
      ...metricConfig,
      count: groupedMetric?.count ?? 0,
      value: groupedMetric?.value ?? 0,
    };
  });
};
