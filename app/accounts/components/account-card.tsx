"use client";

import { useAction } from "next-safe-action/hooks";
import { Pencil, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryType, StatusType } from "@/app/generated/prisma/enums";
import { categoryOptions } from "@/app/_actions/create-accounts/schema";
import { updateAccountStatusAction } from "@/app/_actions/update-account-status";

interface AccountCardProps {
  id: string;
  title: string;
  value: string | number | unknown;
  maturity: string;
  category: CategoryType;
  status: StatusType;
  description?: string;
  onEdit?: (id: string) => void;
  onStatusUpdate?: () => void;
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

const getStatusVariant = (status: StatusType): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case StatusType.PAID:
      return "default";
    case StatusType.PENDING:
      return "secondary";
    case StatusType.DEFEATED:
      return "destructive";
    default:
      return "outline";
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
  onEdit,
  onStatusUpdate,
}: AccountCardProps) => {
  const { execute: markAsPaid, isExecuting: isMarkingAsPaid } = useAction(
    updateAccountStatusAction,
    {
      onSuccess: () => {
        onStatusUpdate?.();
      },
    }
  );

  const handleMarkAsPaid = () => {
    markAsPaid({ id, status: StatusType.PAID });
  };

  const handleEdit = () => {
    onEdit?.(id);
  };

  return (
    <Card className="w-full rounded-2xl border-border bg-card transition-colors hover:bg-card/80">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg font-semibold text-foreground">
            {title}
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {getCategoryLabel(category)}
          </span>
        </div>
        <Badge variant={getStatusVariant(status)} className="ml-2">
          {getStatusLabel(status)}
        </Badge>
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
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl"
            onClick={handleEdit}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};