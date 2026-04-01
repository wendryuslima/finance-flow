import {
  buildMaturityMonthFilter,
  getCurrentMonthValue,
  type MonthFilterValue,
} from "@/lib/months";
import { requireCurrentUserId } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

type GetAccountsParams = {
  month?: MonthFilterValue;
};

export const getAccounts = async ({ month }: GetAccountsParams = {}) => {
  const userId = await requireCurrentUserId();
  const targetMonth = month ?? getCurrentMonthValue();
  const maturityFilter = buildMaturityMonthFilter(targetMonth);
  const where = {
    userId,
    ...(maturityFilter ? { maturity: maturityFilter } : {}),
  };

  const accounts = await prisma.accounts.findMany({
    where,
    orderBy: {
      maturity: "asc",
    },
  });

  return accounts;
};
