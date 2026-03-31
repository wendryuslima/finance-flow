import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const ALL_MONTHS_VALUE = "todos" as const;

const MONTH_VALUES = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
] as const;

export type MonthValue = (typeof MONTH_VALUES)[number];
export type MonthFilterValue = MonthValue | typeof ALL_MONTHS_VALUE;

const buildMonthLabel = (monthIndex: number) => {
  const label = format(new Date(2024, monthIndex, 1), "MMMM", {
    locale: ptBR,
  });

  return label.charAt(0).toUpperCase() + label.slice(1);
};

export const monthOptions: ReadonlyArray<{
  label: string;
  value: MonthFilterValue;
}> = [
  {
    label: "Todos",
    value: ALL_MONTHS_VALUE,
  },
  ...MONTH_VALUES.map((value, index) => ({
    label: buildMonthLabel(index),
    value,
  })),
];

export const getCurrentMonthValue = (): MonthValue => {
  return String(new Date().getMonth() + 1).padStart(2, "0") as MonthValue;
};

export const isValidMonthValue = (value: string | null | undefined): value is MonthValue => {
  if (!value) {
    return false;
  }

  return MONTH_VALUES.includes(value as MonthValue);
};

export const isAllMonthsValue = (
  value: string | null | undefined
): value is typeof ALL_MONTHS_VALUE => {
  return value === ALL_MONTHS_VALUE;
};

export const resolveMonthParam = (
  value: string | string[] | null | undefined
): MonthFilterValue => {
  const resolvedValue = Array.isArray(value) ? value[0] : value;

  if (isAllMonthsValue(resolvedValue)) {
    return resolvedValue;
  }

  if (isValidMonthValue(resolvedValue)) {
    return resolvedValue;
  }

  return getCurrentMonthValue();
};

export const buildMaturityMonthFilter = (month: MonthFilterValue) => {
  if (month === ALL_MONTHS_VALUE) {
    return undefined;
  }

  return {
    contains: `/${month}/`,
  };
};

export const getMonthIndex = (month: MonthValue) => {
  return MONTH_VALUES.indexOf(month);
};
