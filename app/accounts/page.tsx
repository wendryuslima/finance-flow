import { getAccounts } from "@/app/_data-access/get-accounts";
import type { AccountRecord } from "@/types/accounts";

import { AccountsContent } from "./components/accounts-content";

const AccountsPage = async () => {
  const accounts = await getAccounts();
  const serializedAccounts: AccountRecord[] = accounts.map((account) => ({
    id: account.id,
    title: account.title,
    value: account.value.toString(),
    maturity: account.maturity,
    category: account.category,
    status: account.status,
    description: account.description,
  }));

  return <AccountsContent accounts={serializedAccounts} />;
};

export default AccountsPage;
