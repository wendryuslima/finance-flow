"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays } from "lucide-react";
import { useForm } from "react-hook-form";

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
  dashboardNewAccountCategoryOptions,
  dashboardNewAccountFormDefaultValues,
  dashboardNewAccountFormSchema,
  dashboardNewAccountStatusOptions,
  type DashboardNewAccountFormValues,
} from "./dashboard-new-account-form-schema";

export const DashboardNewAccountForm = () => {
  const form = useForm<DashboardNewAccountFormValues>({
    resolver: zodResolver(dashboardNewAccountFormSchema),
    defaultValues: dashboardNewAccountFormDefaultValues,
  });

  const onSubmit = () => {};

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
                Titulo
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
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Valor (R$)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-11 rounded-xl border-border bg-secondary/80 px-4 text-sm text-foreground placeholder:text-muted-foreground/80 focus-visible:ring-ring/30 dark:bg-secondary/80"
                    inputMode="decimal"
                    placeholder="0,00"
                  />
                </FormControl>
                <div className="min-h-4">
                  <FormMessage className="text-xs" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maturity"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Vencimento
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 rounded-xl border-border bg-secondary/80 px-4 pr-11 text-sm text-foreground placeholder:text-muted-foreground/80 focus-visible:ring-ring/30 dark:bg-secondary/80"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="dd/mm/aaaa"
                    />
                  </FormControl>
                  <CalendarDays className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="min-h-4">
                  <FormMessage className="text-xs" />
                </div>
              </FormItem>
            )}
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
                  {dashboardNewAccountCategoryOptions.map((option) => (
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
                  {dashboardNewAccountStatusOptions.map((option) => (
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
                Descricao (opcional)
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

          <Button className="h-10 flex-1 rounded-xl cursor-pointer" type="submit">
            Adicionar
          </Button>
        </div>
      </form>
    </Form>
  );
};
