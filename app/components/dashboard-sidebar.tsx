"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleDollarSign, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardNewAccountDialog } from "./dashboard-new-account-dialog";

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
    <nav className="flex justify-between w-full border-border/70 bg-brand-950/35 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-2">
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

      <div className="flex">
        <DashboardNewAccountDialog onSuccess={onCreateAccount} />
      </div>
    </nav>
  );
};
