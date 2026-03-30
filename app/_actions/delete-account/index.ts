"use server";

import { revalidatePath } from "next/cache";

import { deleteAccount } from "@/app/_data-access/delete-account";
import { actionClient } from "@/lib/safe-action";

import { deleteAccountSchema } from "./schema";

export const deleteAccountAction = actionClient
  .inputSchema(deleteAccountSchema)
  .action(async ({ parsedInput }) => {
    const account = await deleteAccount(parsedInput.id);

    revalidatePath("/", "layout");

    return { success: true, data: account };
  });
