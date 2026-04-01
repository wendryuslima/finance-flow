import { prisma } from "@/lib/prisma";
import { CategoryType, StatusType } from "@/app/generated/prisma/enums";
import type { UpsertAccountInput } from "@/app/_actions/create-accounts/schema";
import { requireCurrentUserIdOrThrow } from "@/lib/auth-session";

export const upsertAccount = async (data: UpsertAccountInput) => {
  const userId = await requireCurrentUserIdOrThrow();
  const valueFormatted = data.value.replace(",", ".");
  const accountData = {
    title: data.title,
    value: valueFormatted,
    maturity: data.maturity,
    category: data.category as CategoryType,
    status: data.status as StatusType,
    description: data.description || "",
  };

  if (data.id) {
    const existingAccount = await prisma.accounts.findFirst({
      where: {
        id: data.id,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!existingAccount) {
      throw new Error("Conta não encontrada.");
    }

    return prisma.accounts.update({
      where: { id: data.id },
      data: accountData,
    });
  }

  const account = await prisma.accounts.create({
    data: {
      ...accountData,
      userId,
    },
  });

  return account;
};
