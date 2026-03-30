"use server";

import { revalidatePath } from "next/cache";

import { actionClient } from "@/lib/safe-action";
import { createAccountSchema } from "./schema";
import { createAccount } from "@/app/_data-access/create-accounts";

export const createAccountAction = actionClient
  .inputSchema(createAccountSchema)
  .action(async ({ parsedInput }) => {
    const account = await createAccount(parsedInput);

    revalidatePath("/");
    revalidatePath("/accounts");

    return { success: true, data: account };
  });
