"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { monthOptions, resolveMonthParam } from "@/lib/months";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DashboardMonthFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentValue = resolveMonthParam(searchParams?.get("month") ?? null);

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("month", value);

    const queryString = params.toString();
    const target = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(target, { scroll: false });
  };

  return (
    <Select value={currentValue} onValueChange={handleValueChange}>
      <SelectTrigger
        aria-label="Selecionar mês"
        size="sm"
        className="h-8 w-full min-w-0 rounded-lg border-border/80 bg-background/70 px-3 text-sm sm:min-w-[8rem]"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={8}>
        {monthOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
