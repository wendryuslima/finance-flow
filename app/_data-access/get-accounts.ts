import {
  buildMaturityMonthFilter,
  getCurrentMonthValue,
  type MonthFilterValue,
} from "@/lib/months";
import { prisma } from "@/lib/prisma";

type GetAccountsParams = {
  month?: MonthFilterValue;
};

export const getAccounts = async ({ month }: GetAccountsParams = {}) => {
  const targetMonth = month ?? getCurrentMonthValue();
  const maturityFilter = buildMaturityMonthFilter(targetMonth);

  const accounts = await prisma.accounts.findMany({
    where: maturityFilter ? { maturity: maturityFilter } : undefined,
    orderBy: {
      maturity: "asc",
    },
  });

  return accounts;
};
