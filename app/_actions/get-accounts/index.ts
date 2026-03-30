"use server";

import { actionClient } from "@/lib/safe-action";
import { getAccounts } from "@/app/_data-access/get-accounts";

export const getAccountsAction = actionClient.action(async () => {
  const accounts = await getAccounts();
  return { success: true, data: accounts };
});