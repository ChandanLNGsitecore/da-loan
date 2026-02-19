import { cn } from "lib/utils";
import { formatCurrency, formatPercentage } from "lib/format";

interface LoanSummaryProps {
  loanAmount: number;
  loanPeriod: number;
  interestRate?: number;
  initiationFee?: number;
  monthlyServiceFee?: number;
  className?: string;
}

export function LoanSummary({
  loanAmount,
  loanPeriod,
  interestRate = 28,
  initiationFee = 1207,
  monthlyServiceFee = 69,
  className,
}: Readonly<LoanSummaryProps>) {
  // Loan payment calculation for prototype
  // Convert annual interest rate to monthly rate
  const monthlyInterestRate = (interestRate / 100) / 12;
  // Standard loan payment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const monthlyRepayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanPeriod)) / (Math.pow(1 + monthlyInterestRate, loanPeriod) - 1);

  return (
    <div
      className={cn(
        "space-y-2",
        className
      )}
    >
      <LoanRow
        label="Loan repayment amount"
        value={formatCurrency(monthlyRepayment)}
        className="mb-4"
      />
      <SummaryRow
        label="Initiation fee"
        value={formatCurrency(initiationFee)}
      />
      <SummaryRow
        label="Monthly service fee"
        value={formatCurrency(monthlyServiceFee)}
      />
      <SummaryRow
        label="Interest rate"
        value={`${formatPercentage(interestRate)} per annum`}
      />
    </div>
  );
}

interface LoanRowProps {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}


interface SummaryRowProps {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}

function LoanRow({ label, value, className }: Readonly<LoanRowProps>) {
  return (
    <div className={cn(
      "bg-secondary-blue/20 p-4 rounded-lg flex items-center justify-between border-b border-gray-200 py-6",
      className
    )}>
      <span className="md:text-lg text-base">{label}</span>
      <span className="md:text-3xl text-xl font-bold">{value}</span>
    </div>
  );
}

function SummaryRow({ label, value, highlight, className }: Readonly<SummaryRowProps>) {
  return (
    <div className={cn(
      "flex items-center justify-between border-b border-gray-200 pb-4 px-4 last:border-0 last:pb-0",
      className
    )}>
      <span
        className={cn(
          "text-sm",
          highlight
            ? "font-semibold text-gray-900"
            : "text-gray-500"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "text-sm",
          highlight ? "font-bold text-gray-900" : "font-semibold"
        )}
      >
        {value}
      </span>
    </div>
  );
}