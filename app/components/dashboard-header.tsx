import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DashboardNewAccountDialog } from "./dashboard-new-account-dialog";
import { authClient } from "../_lib/auth-client";

export const DashboardHeader = () => {
  const userName = authClient.useSession()?.data?.user?.name || "Usuário";
  const email = authClient.useSession()?.data?.user?.email || "";
  return (
    <header className="border-b border-border/70 bg-brand-950/50 px-4 py-5 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-base font-semibold text-primary-foreground"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--primary), var(--accent))",
              boxShadow: "0 12px 30px var(--overlay-primary)",
            }}
          >
            F
          </div>

          <div className="space-y-0.5">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              FinanceFlow
            </h1>
            <p className="text-sm text-foreground/60">Gestao de Contas</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-foreground/60">{email}</p>
          </div>

          <div className="flex">
            <DashboardNewAccountDialog />

            <Button
              className="h-9 w-9 rounded-xl px-0"
              type="button"
              variant="ghost"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
