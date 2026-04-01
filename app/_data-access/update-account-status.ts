import { prisma } from "@/lib/prisma";
import { StatusType } from "@/app/generated/prisma/enums";
import { requireCurrentUserIdOrThrow } from "@/lib/auth-session";

export const updateAccountStatus = async (id: string, status: StatusType) => {
  const userId = await requireCurrentUserIdOrThrow();
  const existingAccount = await prisma.accounts.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existingAccount) {
    throw new Error("Conta não encontrada.");
  }

  const account = await prisma.accounts.update({
    where: { id },
    data: {
      status,
    },
  });

  return account;
};
