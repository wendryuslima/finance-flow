import { prisma } from "@/lib/prisma";
import { StatusType } from "@/app/generated/prisma/enums";

export const updateAccountStatus = async (id: string, status: StatusType) => {
  const account = await prisma.accounts.update({
    where: { id },
    data: {
      status,
      updatedAt: new Date(),
    },
  });

  return account;
};