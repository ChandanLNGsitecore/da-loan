"use client";

import Link from "next/link";
import { AccountItem } from "./account-selection-form";
import { Button } from "components/da-loan/ui-premetive/button";
import { formatCurrency } from "lib/format";

interface ConsolidationSummaryProps {
  accounts: AccountItem[];
  interestRate?: number;
  loanPeriod?: number;
  monthlyServiceFee?: number;
}

export function ConsolidationSummary({
  accounts,
  interestRate = 28,
  loanPeriod = 60,
  monthlyServiceFee = 69,
}: Readonly<ConsolidationSummaryProps>) {
  // Calculate totals from accounts
  const totalBalance = accounts.reduce((sum, account) => {
    return sum + Number.parseFloat(account.balance || "0");
  }, 0);

  const totalInstallments = accounts.reduce((sum, account) => {
    return sum + Number.parseFloat(account.installment || "0");
  }, 0);

  // Calculate new installment using loan formula
  // Only calculate if there are accounts
  let baseInstallment = 0;
  let newInstallment = 0;

  if (accounts.length > 0 && totalBalance > 0) {
    // Convert annual interest rate to monthly rate
    const monthlyInterestRate = interestRate / 100 / 12;
    // Standard loan payment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    baseInstallment =
      (totalBalance *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanPeriod))) /
      (Math.pow(1 + monthlyInterestRate, loanPeriod) - 1);
    // Add monthly service fee to the installment
    newInstallment = baseInstallment + monthlyServiceFee;
  }

  // Calculate cashflow gain (current total installments - new installment)
  const cashflowGain = totalInstallments - newInstallment;

  return (
    <div className="w-full space-y-0 rounded-lg overflow-hidden">
      {/* Current Total Section */}
      <div className="p-4" style={{ backgroundColor: "var(--color-grey-200)" }}>
        <div className="flex items-center justify-between">
          <span
            className="text-sm font-medium"
          >
            Current total
          </span>
          <span
            className="text-lg font-bold"
          >
            {formatCurrency(totalBalance)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className="text-sm font-medium"
          >
            Current installments
          </span>
          <span
            className="text-sm font-medium"
          >
            {formatCurrency(totalInstallments)}
          </span>
        </div>
        {/* </div> */}
      </div>

      {/* New Installment Section - Dark Green Background */}
      <div className="p-4 flex items-center justify-between rounded-b-lg bg-secondary-blue/20">
        <span className="md:text-lg text-base">Your new installment :</span>
        <span className="md:text-3xl text-xl font-bold">
          {formatCurrency(newInstallment)}
        </span>
      </div>

      {/* Cashflow Gain Section - White Background */}
      <div className="p-4 flex items-center justify-between bg-white">
        <span
          className="text-base font-medium"
          style={{ color: "var(--color-da-green)" }}
        >
          Your cashflow gain:
        </span>
        <span
          className="text-xl font-bold"
          style={{ color: "var(--color-da-green)" }}
        >
          {formatCurrency(cashflowGain)}
        </span>
      </div>

      {/* Apply Now Button */}
      <div className="mt-4">
        <Button
          asChild
          className="w-full h-12 uppercase font-semibold rounded-md"
          style={{
            backgroundColor: "var(--color-secondary-teal)",
            color: "white",
          }}
        >
          <Link href="/loan-ui-small/">APPLY NOW</Link>
        </Button>
      </div>
    </div>
  );
}
