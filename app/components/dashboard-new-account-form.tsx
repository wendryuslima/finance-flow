"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  categoryOptions,
  getUpsertAccountDefaultValues,
  statusOptions,
  upsertAccountSchema,
  type UpsertAccountInput,
} from "@/app/_actions/create-accounts/schema";
import { upsertAccountAction } from "@/app/_actions/create-accounts";
import type { AccountRecord } from "@/types/accounts";
import {
  coerceCurrencyValue,
  coerceDateValue,
  formatCurrencyDisplay,
  normalizeCurrencyInput,
  normalizeDateInput,
} from "@/lib/formatters";
import { toast } from "sonner";

interface DashboardNewAccountFormProps {
  account?: AccountRecord;
  onSuccess?: () => void;
}

export const DashboardNewAccountForm = ({
  account,
  onSuccess,
}: DashboardNewAccountFormProps) => {
  const accountId = account?.id;
  const accountTitle = account?.title;
  const accountValue = account?.value;
  const accountMaturity = account?.maturity;
  const accountCategory = account?.category;
  const accountStatus = account?.status;
  const accountDescription = account?.description;
  const isEditing = Boolean(account?.id);
  const form = useForm<UpsertAccountInput>({
    resolver: zodResolver(upsertAccountSchema),
    defaultValues: getUpsertAccountDefaultValues(account),
  });

  useEffect(() => {
    form.reset({
      id: accountId ?? "",
      title: accountTitle ?? "",
      value: accountValue ? coerceCurrencyValue(accountValue) : "",
      maturity: accountMaturity ? coerceDateValue(accountMaturity) : "",
      category: accountCategory ?? "",
      status: accountStatus ?? "PENDING",
      description: accountDescription ?? "",
    });
  }, [
    accountCategory,
    accountDescription,
    accountId,
    accountMaturity,
    accountStatus,
    accountTitle,
    accountValue,
    form,
  ]);

  const handleSuccess = () => {
    form.reset(getUpsertAccountDefaultValues(account));
    onSuccess?.();
  };

  const { execute, isExecuting } = useAction(upsertAccountAction, {
    onSuccess: handleSuccess,
  });

  const onSubmit = (data: UpsertAccountInput) => {
    try {
      toast.success(
        `Conta ${isEditing ? "atualizada" : "adicionada"} com sucesso!`,
      );
      execute(data);
    } catch {
      toast.error(
        "Ocorreu um erro ao salvar a conta. Por favor, tente novamente.",
      );
    }
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-foreground">
                Título
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-11 rounded-xl border-border bg-secondary/80 px-4 text-sm text-foreground placeholder:text-muted-foreground/80 focus-visible:ring-ring/30 dark:bg-secondary/80"
                  placeholder="Ex: Conta de luz"
                />
              </FormControl>
              <div className="min-h-4">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => {
              const { ref, value, onChange, onBlur, name, ...rest } = field;
              const displayValue = value ? formatCurrencyDisplay(value) : "";

              return (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Valor (R$)
                  </FormLabel>
                  <FormControl>
                    <Input
                      ref={ref}
                      name={name}
                      value={displayValue}
                      onChange={(event) => {
                        const normalizedValue = normalizeCurrencyInput(
                          event.target.value,
                        );

                        onChange(normalizedValue);
                      }}
                      onBlur={(event) => {
                        const normalizedValue = normalizeCurrencyInput(
                          event.target.value,
                        );

                        onChange(normalizedValue);
                        onBlur();
                      }}
                      className="h-11 rounded-xl border-border bg-secondary/80 px-4 text-sm text-foreground placeholder:text-muted-foreground/80 focus-visible:ring-ring/30 dark:bg-secondary/80"
                      inputMode="decimal"
                      placeholder="R$ 0,00"
                      {...rest}
                    />
                  </FormControl>
                  <div className="min-h-4">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="maturity"
            render={({ field }) => {
              const { ref, value, onChange, onBlur, name, ...rest } = field;

              return (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Vencimento
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        ref={ref}
                        name={name}
                        value={value ?? ""}
                        onChange={(event) => {
                          const normalizedValue = normalizeDateInput(
                            event.target.value,
                          );

                          onChange(normalizedValue);
                        }}
                        onBlur={(event) => {
                          const normalizedValue = normalizeDateInput(
                            event.target.value,
                          );

                          if (normalizedValue.length === 10) {
                            const coercedValue =
                              coerceDateValue(normalizedValue);
                            onChange(coercedValue || normalizedValue);
                          } else {
                            onChange(normalizedValue);
                          }

                          onBlur();
                        }}
                        className="h-11 rounded-xl border-border bg-secondary/80 px-4 pr-11 text-sm text-foreground placeholder:text-muted-foreground/80 focus-visible:ring-ring/30 dark:bg-secondary/80"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="dd/mm/aaaa"
                        {...rest}
                      />
                    </FormControl>
                    <CalendarDays className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <div className="min-h-4">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              );
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-foreground">
                Categoria
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger className="h-11 w-full rounded-xl border-border bg-secondary/80 px-4 text-sm text-foreground data-placeholder:text-muted-foreground/80 dark:bg-secondary/80">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-xl border border-border bg-popover text-popover-foreground">
                  {categoryOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      className="pl-3"
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="min-h-4">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-foreground">
                Status
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger className="h-11 w-full rounded-xl border-border bg-secondary/80 px-4 text-sm text-foreground data-placeholder:text-muted-foreground/80 dark:bg-secondary/80">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-xl border border-border bg-popover text-popover-foreground">
                  {statusOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      className="pl-3"
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="min-h-4">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-foreground">
                Descrição (opcional)
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-24 rounded-xl border-border bg-secondary/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80 focus-visible:ring-ring/30 dark:bg-secondary/80"
                  placeholder="Adicione detalhes sobre esta conta..."
                  value={field.value ?? ""}
                />
              </FormControl>
              <div className="min-h-4">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-3 pt-2">
          <DialogClose asChild>
            <Button
              className="h-10 flex-1 rounded-xl border-border bg-transparent text-foreground hover:bg-secondary/80"
              type="button"
              variant="outline"
            >
              Cancelar
            </Button>
          </DialogClose>

          <Button
            className="h-10 flex-1 rounded-xl cursor-pointer"
            type="submit"
            disabled={isExecuting}
          >
            {isExecuting ? "Salvando..." : isEditing ? "Salvar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
