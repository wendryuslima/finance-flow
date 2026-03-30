import { prisma } from "@/lib/prisma";

export const deleteAccount = async (id: string) => {
  const account = await prisma.accounts.delete({
    where: { id },
  });

  return account;
};
