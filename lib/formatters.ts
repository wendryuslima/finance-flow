import { format, isValid, parse, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const CURRENCY_DISPLAY = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const parseLocalizedNumber = (value: string) => {
  if (!value) {
    return NaN;
  }

  const normalized = value.replace(/\./g, "").replace(/,/g, ".");
  return Number(normalized);
};

export const toFixedCurrency = (value: number) => {
  return Number(value.toFixed(2));
};

export const formatCurrencyDisplay = (value: string) => {
  const amount = parseLocalizedNumber(value);

  if (Number.isNaN(amount)) {
    return "";
  }

  return CURRENCY_DISPLAY.format(amount);
};

export const normalizeCurrencyInput = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");

  if (!digitsOnly) {
    return "";
  }

  const centsValue = Number.parseInt(digitsOnly, 10) / 100;

  return centsValue.toFixed(2).replace(".", ",");
};

export const coerceCurrencyValue = (value: string) => {
  if (!value) {
    return "";
  }

  const amount = parseLocalizedNumber(value.trim());

  if (Number.isNaN(amount)) {
    return "";
  }

  return amount.toFixed(2).replace(".", ",");
};

const DATE_FORMAT = "dd/MM/yyyy";

export const formatDateToInput = (date: Date) => {
  return format(date, DATE_FORMAT);
};

export const formatMonthLabel = (date: Date) => {
  const formatted = format(date, "MMM", { locale: ptBR }).replace(".", "");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const parseDateString = (value: string) => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  const directParsed = parse(trimmed, DATE_FORMAT, new Date());

  if (isValid(directParsed)) {
    return directParsed;
  }

  const isoParsed = parseISO(trimmed);

  if (isValid(isoParsed)) {
    return isoParsed;
  }

  return null;
};

export const coerceDateValue = (value: string) => {
  const parsed = parseDateString(value);

  if (!parsed) {
    return "";
  }

  return formatDateToInput(parsed);
};

export const normalizeDateInput = (value: string) => {
  if (!value) {
    return "";
  }

  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (!digits) {
    return "";
  }

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4);

  return `${day}/${month}/${year}`;
};
