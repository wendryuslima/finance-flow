"use server";

import { revalidatePath } from "next/cache";

import { actionClient } from "@/lib/safe-action";
import { upsertAccountSchema } from "./schema";
import { upsertAccount } from "@/app/_data-access/create-accounts";

export const upsertAccountAction = actionClient
  .inputSchema(upsertAccountSchema)
  .action(async ({ parsedInput }) => {
    const account = await upsertAccount(parsedInput);

    revalidatePath("/", "layout");

    return { success: true, data: account };
  });
