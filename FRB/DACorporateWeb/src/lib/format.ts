export function formatCurrency(
  amount: number,
  options?: { includeSymbol?: boolean; fractionDigits?: number }
) {
  const { includeSymbol = true, fractionDigits = 2 } = options ?? {};
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  const formatted = safeAmount.toLocaleString("en-ZA", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).replace(/,/g, " ");

  return includeSymbol ? `R${formatted}` : formatted;
}

export function formatPercentage(value: number) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return `${safeValue.toFixed(2)}%`;
}
