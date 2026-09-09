type CurrencyUnit = "cents" | "reais";

export const formatCurrency = (
  value: number,
  unit: CurrencyUnit = "reais"
) => {
  const amount = Number.isFinite(value)
    ? unit === "cents"
      ? value / 100
      : value
    : 0;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const parseCurrencyToCents = (raw: string) => {
  const digits = raw.replace(/\D+/g, "");
  if (!digits) return 0;
  return Number(digits);
};

export const parseCurrencyToReais = (raw: string) => {
  const cents = parseCurrencyToCents(raw);
  return Number((cents / 100).toFixed(2));
};

export const formatDate = (
  isoDate?: string,
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
  }
) => {
  if (!isoDate) return null;
  return new Date(isoDate).toLocaleDateString("pt-BR", options);
};

export const formatNumericDate = (isoDate?: string) =>
  formatDate(isoDate, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
