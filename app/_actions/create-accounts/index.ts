"use server";

import { actionClient } from "@/lib/safe-action";
import { createAccountSchema } from "./schema";
import { createAccount } from "@/app/_data-access/create-accounts";

export const createAccountAction = actionClient
  .inputSchema(createAccountSchema)
  .action(async ({ parsedInput }) => {
    const account = await createAccount(parsedInput);
    return { success: true, data: account };
  });
