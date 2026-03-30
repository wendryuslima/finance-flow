"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { DashboardNewAccountForm } from "./dashboard-new-account-form";

interface DashboardNewAccountDialogProps {
  onSuccess?: () => void;
}

export const DashboardNewAccountDialog = ({ onSuccess }: DashboardNewAccountDialogProps) => {
  const [open, setOpen] = useState(false);

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
        <Button
          className="h-9 cursor-pointer rounded-xl px-4 text-sm"
          type="button"
        >
          <Plus className="h-4 w-4" />
          Nova Conta
        </Button>
      </DialogTrigger>

      <DialogContent
        className="surface-panel-strong flex h-[38rem] min-h-0 w-[calc(100vw-2rem)] max-w-[22.5rem] flex-col gap-0 overflow-hidden border-border bg-brand-900/95 p-0 text-foreground sm:max-w-[22.5rem]"
        showCloseButton={false}
      >
        <DialogHeader className="border-b border-border/80 px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <DialogTitle className="text-xl font-semibold text-foreground">
                Nova Conta
              </DialogTitle>
              <DialogDescription className="sr-only">
                Preencha os campos abaixo para registrar uma nova conta.
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
            <DashboardNewAccountForm onSuccess={handleSuccess} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
