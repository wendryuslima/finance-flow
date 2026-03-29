"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleDollarSign, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    href: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/contas",
    icon: CircleDollarSign,
    label: "Contas",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border/70 bg-brand-950/35 px-4 py-3 sm:px-6">
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
    </nav>
  );
};
