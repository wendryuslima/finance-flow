import { format, startOfMonth, subMonths } from "date-fns";

import { categoryOptions } from "@/app/_actions/create-accounts/schema";
import { CategoryType, StatusType } from "@/app/generated/prisma/enums";
import type {
  DashboardAccountStatus,
  DashboardCategoryPoint,
  DashboardStatusDistributionPoint,
  DashboardTrendPoint,
} from "@/types/dashboard";
import { formatMonthLabel, parseDateString, toFixedCurrency } from "@/lib/formatters";
import {
  buildMaturityMonthFilter,
  getCurrentMonthValue,
  type MonthFilterValue,
} from "@/lib/months";
import { requireCurrentUserId } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

const statusMapping: Record<
  StatusType,
  {
    id: DashboardAccountStatus;
    label: string;
  }
> = {
  [StatusType.PAID]: {
    id: "paid",
    label: "Pagas",
  },
  [StatusType.PENDING]: {
    id: "pending",
    label: "Pendentes",
  },
  [StatusType.DEFEATED]: {
    id: "overdue",
    label: "Atrasadas",
  },
};

const statusOrder = [StatusType.PAID, StatusType.PENDING, StatusType.DEFEATED] as const;

const MONTH_KEY_FORMAT = "yyyy-MM";

type GetDashboardChartsParams = {
  month?: MonthFilterValue;
};

export const getDashboardCharts = async ({
  month,
}: GetDashboardChartsParams = {}) => {
  const userId = await requireCurrentUserId();
  const targetMonth = month ?? getCurrentMonthValue();
  const maturityFilter = buildMaturityMonthFilter(targetMonth);

  const groupedWhere = {
    userId,
    ...(maturityFilter ? { maturity: maturityFilter } : {}),
  };

  const [statusGroups, categoryGroups, trendAccounts] = await Promise.all([
    prisma.accounts.groupBy({
      by: ["status"],
      where: groupedWhere,
      _sum: {
        value: true,
      },
    }),
    prisma.accounts.groupBy({
      by: ["category"],
      where: groupedWhere,
      _sum: {
        value: true,
      },
    }),
    prisma.accounts.findMany({
      where: {
        userId,
      },
      select: {
        value: true,
        maturity: true,
      },
    }),
  ]);

  const statusDistribution: DashboardStatusDistributionPoint[] = statusOrder.map(
    (status) => {
      const grouped = statusGroups.find((group) => group.status === status);
      const sumValue = grouped?._sum.value ? Number(grouped._sum.value) : 0;

      return {
        status: statusMapping[status].id,
        label: statusMapping[status].label,
        value: toFixedCurrency(sumValue),
      };
    }
  );

  const categoryTotals = new Map<CategoryType, number>();

  categoryGroups.forEach((group) => {
    const sumValue = group._sum.value ? Number(group._sum.value) : 0;

    categoryTotals.set(group.category as CategoryType, toFixedCurrency(sumValue));
  });

  const categoryDistribution: DashboardCategoryPoint[] = categoryOptions.map(
    ({ label, value }) => ({
      category: label,
      total: categoryTotals.get(value) ?? 0,
    })
  );

  const trendAccountEntries = trendAccounts
    .map((account) => {
      const parsedDate = parseDateString(account.maturity);

      if (!parsedDate) {
        return null;
      }

      const numericValue = account.value ? Number(account.value) : 0;

      return {
        date: parsedDate,
        value: numericValue,
      };
    })
    .filter((entry): entry is { date: Date; value: number } => Boolean(entry));

  const monthlyTotals = new Map<string, number>();

  trendAccountEntries.forEach(({ date, value }) => {
    const monthKey = format(date, MONTH_KEY_FORMAT);
    const previous = monthlyTotals.get(monthKey) ?? 0;

    monthlyTotals.set(monthKey, previous + value);
  });

  const baseDate = startOfMonth(new Date());

  const monthsRange = Array.from({ length: 5 }, (_, index) =>
    subMonths(baseDate, 4 - index)
  );

  const trend: DashboardTrendPoint[] = monthsRange.map((monthDate) => {
    const monthKey = format(monthDate, MONTH_KEY_FORMAT);
    const total = monthlyTotals.get(monthKey) ?? 0;

    return {
      month: formatMonthLabel(monthDate),
      total: toFixedCurrency(total),
    };
  });

  return {
    trend,
    statusDistribution,
    categoryDistribution,
  };
};
