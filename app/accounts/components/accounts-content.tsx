"use client";

import { useCallback } from "react";
import { redirect, useRouter } from "next/navigation";

import type { AccountRecord } from "@/types/accounts";

import { authClient } from "@/app/_lib/auth-client";
import { DashboardHeader } from "@/app/components/dashboard-header";
import { DashboardSidebar } from "@/app/components/dashboard-sidebar";
import { DashboardNewAccountDialog } from "@/app/components/dashboard-new-account-dialog";

import { AccountCard } from "./account-card";

interface AccountsContentProps {
  accounts: AccountRecord[];
}

export const AccountsContent = ({ accounts }: AccountsContentProps) => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    redirect("/auth");
  }

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback((id: string) => {
    console.log("Edit account:", id);
  }, []);

  return (
    <main className="page-shell min-h-screen">
      <DashboardHeader onCreateAccount={handleRefresh} />
      <DashboardSidebar />
      <section className="px-4 py-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Contas</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie suas contas a pagar e receber
            </p>
          </div>
          <DashboardNewAccountDialog onSuccess={handleRefresh} />
        </div>

        {accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Nenhuma conta encontrada.</p>
            <div className="mt-4">
              <DashboardNewAccountDialog onSuccess={handleRefresh} />
            </div>
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
                description={account.description ?? undefined}
                onEdit={handleEdit}
                onStatusUpdate={handleRefresh}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
