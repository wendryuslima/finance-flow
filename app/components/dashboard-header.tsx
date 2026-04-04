"use client";
import Image from "next/image";

import { DashboardUserInfo } from "./dashboard-user-info";

export const DashboardHeader = () => {
  return (
    <header className="border-b items-center  border-border/70 bg-brand-950/50 px-4 py-5 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="relative flex h-10 w-10 items-center justify-center overflow-visible rounded-xl text-primary-foreground"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--primary), var(--accent))",
            }}
          >
            <Image
              src="/logo-removebg-preview.png"
              alt="FinanceFlow"
              fill
              sizes="200px"
              className="origin-center scale-125 object-contain"
              priority
            />
          </div>

          <div className="space-y-0.5">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              FinanceFlow
            </h1>
            <p className="text-sm text-foreground/60">Gestão de contas</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <DashboardUserInfo />
        </div>
      </div>
    </header>
  );
};
