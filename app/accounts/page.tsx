"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";

import { authClient } from "@/app/_lib/auth-client";
import { DashboardHeader } from "@/app/components/dashboard-header";
import { DashboardSidebar } from "@/app/components/dashboard-sidebar";
import { AccountCard } from "./components/account-card";
import { getAccountsAction } from "@/app/_actions/get-accounts";
import { DashboardNewAccountDialog } from "@/app/components/dashboard-new-account-dialog";
import { CategoryType, StatusType } from "@/app/generated/prisma/enums";

interface Account {
  id: string;
  title: string;
  value: string | number | unknown;
  maturity: string;
  category: CategoryType;
  status: StatusType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const AccountsPage = () => {
  const { data: session } = authClient.useSession();
  const [accounts, setAccounts] = useState<Account[]>([]);

  const { execute: fetchAccounts, isExecuting: isFetching } = useAction(
    getAccountsAction,
    {
      onSuccess: (result) => {
        if (result.data?.success) {
          setAccounts(result.data.data);
        }
      },
    }
  );

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  if (!session) {
    redirect("/auth");
  }

  const handleStatusUpdate = () => {
    fetchAccounts();
  };

  const handleEdit = (id: string) => {
    console.log("Edit account:", id);
  };

  return (
    <main className="page-shell min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />
      <section className="px-4 py-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Contas</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie suas contas a pagar e receber
            </p>
          </div>
          <DashboardNewAccountDialog />
        </div>

        {isFetching ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Carregando contas...</p>
          </div>
        ) : accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Nenhuma conta encontrada.</p>
          <DashboardNewAccountDialog onSuccess={handleStatusUpdate} />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
              <AccountCard
                key={account.id}
                id={account.id}
                title={account.title}
                value={account.value}
                maturity={account.maturity}
                category={account.category}
                status={account.status}
                description={account.description}
                onEdit={handleEdit}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AccountsPage;