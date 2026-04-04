"use client";

import { type ReactNode, useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { ScrollArea } from "@/app/components/ui/scroll-area";

import { DashboardNewAccountForm } from "./dashboard-new-account-form";
import type { AccountRecord } from "@/types/accounts";

interface DashboardNewAccountDialogProps {
  account?: AccountRecord;
  onSuccess?: () => void;
  trigger?: ReactNode;
}

export const DashboardNewAccountDialog = ({
  account,
  onSuccess,
  trigger,
}: DashboardNewAccountDialogProps) => {
  const [open, setOpen] = useState(false);
  const isEditing = Boolean(account?.id);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="h-9 cursor-pointer  px-4 text-sm">
            <Plus className="h-4 w-4" />
            Nova conta
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className="surface-panel-strong flex h-[38rem] min-h-0 w-[calc(100vw-2rem)] max-w-[22.5rem] flex-col gap-0 overflow-hidden border-border bg-brand-900/95 p-0 text-foreground sm:max-w-[22.5rem]"
        showCloseButton={false}
      >
        <DialogHeader className="border-b border-border/80 px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <DialogTitle className="text-xl font-semibold text-foreground">
                {isEditing ? "Editar Conta" : "Nova Conta"}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {isEditing
                  ? "Atualize os campos abaixo para editar a conta."
                  : "Preencha os campos abaixo para registrar uma nova conta."}
              </DialogDescription>
            </div>

            <DialogClose asChild>
              <Button
                className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                type="button"
                variant="ghost"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Fechar dialog</span>
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <ScrollArea className="min-h-0 flex-1">
          <div className="px-5 py-4">
            <DashboardNewAccountForm
              account={account}
              onSuccess={handleSuccess}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
