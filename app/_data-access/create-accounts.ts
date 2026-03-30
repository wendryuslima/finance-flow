import { prisma } from "@/lib/prisma";
import { CategoryType, StatusType } from "@/app/generated/prisma/enums";
import type { UpsertAccountInput } from "@/app/_actions/create-accounts/schema";

export const upsertAccount = async (data: UpsertAccountInput) => {
  const valueFormatted = data.value.replace(",", ".");
  const accountData = {
    title: data.title,
    value: valueFormatted,
    maturity: data.maturity,
    category: data.category as CategoryType,
    status: data.status as StatusType,
    description: data.description || "",
  };

  const account = await prisma.accounts.upsert({
    where: { id: data.id || "" },
    update: {
      ...accountData,
      updatedAt: new Date(),
    },
    create: {
      ...accountData,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return account;
};
