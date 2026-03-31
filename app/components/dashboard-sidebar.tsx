"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleDollarSign, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardNewAccountDialog } from "./dashboard-new-account-dialog";
import { DashboardMonthFilter } from "./dashboard-month-filter";

interface DashboardHeaderProps {
  onCreateAccount?: () => void;
}

const navigationItems = [
  {
    href: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/accounts",
    icon: CircleDollarSign,
    label: "Contas",
  },
];

export const DashboardSidebar = ({ onCreateAccount }: DashboardHeaderProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full flex-col gap-3 border-border/70 bg-brand-950/35 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex flex-wrap items-center gap-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Button
              key={item.href}
              className="h-8 rounded-lg px-3 text-sm"
              asChild
              variant={isActive ? "secondary" : "ghost"}
            >
              <Link href={item.href}>
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="flex w-full items-center gap-2 sm:w-auto">
        <div className="min-w-0 flex-1 sm:flex-none">
          <DashboardMonthFilter />
        </div>
        <DashboardNewAccountDialog onSuccess={onCreateAccount} />
      </div>
    </nav>
  );
};
