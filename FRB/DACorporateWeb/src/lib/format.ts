export function formatCurrency(
  amount: number,
  options?: { includeSymbol?: boolean; fractionDigits?: number }
) {
  const { includeSymbol = true, fractionDigits = 2 } = options ?? {};
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  let formatted = safeAmount.toLocaleString("en-ZA", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  // en-ZA uses comma as decimal separator; replace(/,/g," ") turns "483,00" into "483 00"
  // Fix: use period for decimal - replace space before decimal digits with period
  formatted = formatted.replace(/,/g, " ").replace(/\s(\d{2})$/, ".$1");

  return includeSymbol ? `R${formatted}` : formatted;
}

export function formatNumber(amount: number, options?: { fractionDigits?: number }) {
  const { fractionDigits = 0 } = options ?? {};
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  let formatted = safeAmount.toLocaleString("en-ZA", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  formatted = formatted.replace(/,/g, " ");
  if (fractionDigits > 0) {
    formatted = formatted.replace(/\s(\d{2})$/, ".$1");
  }
  return formatted;
}

export function parseNumberInput(value: string) {
  const normalized = value.replace(/\s/g, "").replace(/,/g, "");
  const numeric = Number.parseFloat(normalized.replace(/[^\d.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

export function formatPercentage(value: number) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return `${safeValue.toFixed(2)}%`;
}