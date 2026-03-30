"use server";

import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { updateAccountStatus } from "@/app/_data-access/update-account-status";
import { StatusType } from "@/app/generated/prisma/enums";

const updateStatusSchema = z.object({
  id: z.string().uuid({ message: "ID invalido." }),
  status: z.enum([StatusType.PENDING, StatusType.PAID, StatusType.DEFEATED]),
});

export const updateAccountStatusAction = actionClient
  .inputSchema(updateStatusSchema)
  .action(async ({ parsedInput }) => {
    const account = await updateAccountStatus(parsedInput.id, parsedInput.status);

    revalidatePath("/", "layout");

    return { success: true, data: account };
  });
