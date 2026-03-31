import { getAccounts } from "@/app/_data-access/get-accounts";
import { resolveMonthParam } from "@/lib/months";
import type { AccountRecord } from "@/types/accounts";

import { AccountsContent } from "./components/accounts-content";

type AccountsPageProps = {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
};

const AccountsPage = async ({ searchParams }: AccountsPageProps = {}) => {
  const resolvedSearchParams = (await searchParams) ?? undefined;
  const month = resolveMonthParam(resolvedSearchParams?.month ?? null);

  const accounts = await getAccounts({ month });
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
