import { CategoryType, StatusType } from "@/app/generated/prisma/enums";
import type { AccountRecord } from "@/types/accounts";
import { z } from "zod";

export const categoryOptions = [
  { label: "Moradia", value: CategoryType.HOUSING },
  { label: "Transporte", value: CategoryType.TRANSPORTATION },
  { label: "Alimentacao", value: CategoryType.FOOD },
  { label: "Lazer", value: CategoryType.ENTERTAINMENT },
  { label: "Saude", value: CategoryType.HEALTH },
  { label: "Utilidades", value: CategoryType.UTILITY },
  { label: "Salario", value: CategoryType.SALARY },
  { label: "Educacao", value: CategoryType.EDUCATION },
  { label: "Outros", value: CategoryType.OTHER },
] as const;

export const statusOptions = [
  { label: "Pendente", value: StatusType.PENDING },
  { label: "Paga", value: StatusType.PAID },
  { label: "Vencida", value: StatusType.DEFEATED },
] as const;

const categoryValues = categoryOptions.map(({ value }) => value);
const statusValues = statusOptions.map(({ value }) => value);

export const upsertAccountSchema = z.object({
  id: z.string().uuid({ message: "ID invalido." }).optional().or(z.literal("")),
  title: z
    .string()
    .trim()
    .min(1, { message: "Informe o titulo da conta." })
    .max(120, { message: "O titulo deve ter no maximo 120 caracteres." }),
  value: z
    .string()
    .trim()
    .min(1, { message: "Informe o valor da conta." })
    .regex(/^\d+(?:[.,]\d{1,2})?$/, {
      message: "Use um valor valido, como 120,00.",
    }),
  maturity: z
    .string()
    .trim()
    .min(1, { message: "Informe o vencimento." })
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, {
      message: "Use o formato dd/mm/aaaa.",
    }),
  category: z
    .string()
    .trim()
    .min(1, { message: "Selecione uma categoria." })
    .refine((value) => categoryValues.includes(value as CategoryType), {
      message: "Selecione uma categoria valida.",
    }),
  status: z
    .string()
    .trim()
    .min(1, { message: "Selecione um status." })
    .refine((value) => statusValues.includes(value as StatusType), {
      message: "Selecione um status valido.",
    }),
  description: z
    .string()
    .trim()
    .max(280, { message: "A descricao deve ter no maximo 280 caracteres." })
    .optional()
    .or(z.literal("")),
});

export type UpsertAccountInput = z.infer<typeof upsertAccountSchema>;

type AccountFormSeed = Partial<
  Pick<AccountRecord, "id" | "title" | "value" | "maturity" | "category" | "status" | "description">
>;

export const getUpsertAccountDefaultValues = (
  account?: AccountFormSeed
): UpsertAccountInput => ({
  id: account?.id ?? "",
  title: account?.title ?? "",
  value: account?.value ?? "",
  maturity: account?.maturity ?? "",
  category: account?.category ?? "",
  status: account?.status ?? StatusType.PENDING,
  description: account?.description ?? "",
});
