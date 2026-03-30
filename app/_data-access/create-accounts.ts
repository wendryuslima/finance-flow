import { prisma } from "@/lib/prisma";
import { CategoryType, StatusType } from "@/app/generated/prisma/enums";
import type { CreateAccountInput } from "@/app/_actions/create-accounts/schema";
import { revalidatePath } from "next/cache";

export const createAccount = async (data: CreateAccountInput) => {
  const valueFormatted = data.value.replace(",", ".");

  const account = await prisma.accounts.create({
    data: {
      title: data.title,
      value: valueFormatted,
      maturity: data.maturity,
      category: data.category as CategoryType,
      status: data.status as StatusType,
      description: data.description || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  revalidatePath("/accounts");
  return account;
};
