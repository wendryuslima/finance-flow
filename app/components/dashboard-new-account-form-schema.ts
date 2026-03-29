import { CategoryType, StatusType } from "@/app/generated/prisma/enums";
import { z } from "zod";

export const dashboardNewAccountCategoryOptions = [
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

export const dashboardNewAccountStatusOptions = [
  { label: "Pendente", value: StatusType.PENDING },
  { label: "Paga", value: StatusType.PAID },
  { label: "Vencida", value: StatusType.DEFEATED },
] as const;

const categoryValues = dashboardNewAccountCategoryOptions.map(
  ({ value }) => value,
);
const statusValues = dashboardNewAccountStatusOptions.map(({ value }) => value);

export const dashboardNewAccountFormSchema = z.object({
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

export type DashboardNewAccountFormValues = z.infer<
  typeof dashboardNewAccountFormSchema
>;

export const dashboardNewAccountFormDefaultValues: DashboardNewAccountFormValues =
  {
    title: "",
    value: "",
    maturity: "",
    category: "",
    status: StatusType.PENDING,
    description: "",
  };
