import { prisma } from "@/lib/prisma";

export const getAccounts = async () => {
  const accounts = await prisma.accounts.findMany({
    orderBy: {
      maturity: "asc",
    },
  });

  return accounts;
};