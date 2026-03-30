"use client";

import { useAction } from "next-safe-action/hooks";
import { Pencil, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryType, StatusType } from "@/app/generated/prisma/enums";
import { categoryOptions } from "@/app/_actions/create-accounts/schema";
import { updateAccountStatusAction } from "@/app/_actions/update-account-status";
import { DashboardNewAccountDialog } from "@/app/components/dashboard-new-account-dialog";
import type { AccountRecord } from "@/types/accounts";

interface AccountCardProps {
  id: string;
  title: string;
  value: string | number | unknown;
  maturity: string;
  category: CategoryType;
  status: StatusType;
  description?: string;
}

const getCategoryLabel = (category: string) => {
  const option = categoryOptions.find((opt) => opt.value === category);
  return option?.label || category;
};

const getStatusLabel = (status: StatusType) => {
  switch (status) {
    case StatusType.PAID:
      return "Paga";
    case StatusType.PENDING:
      return "Pendente";
    case StatusType.DEFEATED:
      return "Atrasada";
    default:
      return status;
  }
};

const getStatusBadgeClassName = (status: StatusType) => {
  switch (status) {
    case StatusType.PAID:
      return "status-success border-success/30 bg-success/12 text-success";
    case StatusType.PENDING:
      return "status-warning border-warning/30 bg-warning/12 text-warning";
    case StatusType.DEFEATED:
      return "status-danger border-destructive/30 bg-destructive/12 text-destructive";
    default:
      return "border-border bg-secondary/60 text-foreground";
  }
};

const formatValue = (value: string | number | unknown) => {
  let numValue: number;
  if (typeof value === "string") {
    numValue = parseFloat(value);
  } else if (typeof value === "number") {
    numValue = value;
  } else {
    numValue = 0;
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numValue);
};

export const AccountCard = ({
  id,
  title,
  value,
  maturity,
  category,
  status,
  description,
}: AccountCardProps) => {
  const { execute: markAsPaid, isExecuting: isMarkingAsPaid } = useAction(
    updateAccountStatusAction
  );
  const account: AccountRecord = {
    id,
    title,
    value: typeof value === "string" ? value : String(value ?? ""),
    maturity,
    category,
    status,
    description: description ?? null,
  };

  const handleMarkAsPaid = () => {
    markAsPaid({ id, status: StatusType.PAID });
  };

  return (
    <Card className="w-full rounded-2xl border-border bg-card transition-colors hover:bg-card/80">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="flex-1 text-lg font-semibold text-foreground">
              {title}
            </CardTitle>
            <Badge
              variant="outline"
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadgeClassName(status)}`}
            >
              {getStatusLabel(status)}
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground">
            {getCategoryLabel(category)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">{formatValue(value)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Vencimento</span>
          <span className="font-medium text-foreground">{maturity}</span>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-xl"
            onClick={handleMarkAsPaid}
            disabled={status === StatusType.PAID || isMarkingAsPaid}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {status === StatusType.PAID ? "Paga" : "Marcar como paga"}
          </Button>
          <DashboardNewAccountDialog
            account={account}
            trigger={
              <Button variant="outline" size="sm" className="rounded-xl" type="button">
                <Pencil className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
