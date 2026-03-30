import type { CategoryType, StatusType } from "@/app/generated/prisma/enums";

export type AccountRecord = {
  id: string;
  title: string;
  value: string;
  maturity: string;
  category: CategoryType;
  status: StatusType;
  description: string | null;
};
