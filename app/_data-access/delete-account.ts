import { prisma } from "@/lib/prisma";
import { requireCurrentUserIdOrThrow } from "@/lib/auth-session";

export const deleteAccount = async (id: string) => {
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

  const account = await prisma.accounts.delete({
    where: { id },
  });

  return account;
};
