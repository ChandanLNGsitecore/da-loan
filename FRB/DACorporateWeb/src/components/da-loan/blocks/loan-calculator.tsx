"use client";

import { LoanSlider } from "./slider-component";
import { useState } from "react";
import { LoanSummary } from "./loan-summary";
import { Check } from "lucide-react";
import { Button } from "components/da-loan/ui-primitive/button";
import Link from "next/link";
import { formatCurrency } from "lib/format";

export function LoanCalculator() {
  const [borrowedAmount, setBorrowedAmount] = useState(50000);
  const [repaymentPeriod, setRepaymentPeriod] = useState(60);

  return (
    <section className="relative w-full p-4 md:p-12 py-12 md:py-20 bg-primary">
      <div className="w-full max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
          <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-8 text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Loan Calculator
            </h2>
            <p className="text-base md:text-lg mb-6 lg:mb-8">
              Whether you&apos;re looking to do home renovations, upgrade your
              electronics, invest in solar solutions, install a borehole or JoJo
              tank for water security, or take a break overseas, a personal loan
              offers a flexible solution.
            </p>
            <p className="text-base md:text-lg mb-6 lg:mb-8">
              Want to know what the monthly repayment could be on the loan
              amount you need?
            </p>
            <p className="text-base md:text-lg mb-6 lg:mb-8">
              Try our{" "}
              <span className="font-bold">Personal Loan Calculator</span>.
              Simply select the loan amount and repayment term, and we&apos;ll
              calculate the monthly instalment.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span>Safe and secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span>Fixed interest rate</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl flex flex-col justify-center px-4 sm:px-6 md:p-12 py-6 gap-4">
            <h2 className="text-4xl  font-medium text-gray-800 font-heading text-center mb-3">
              Select your loan amount and period
            </h2>
            <div className="space-y-8">
              <LoanSlider
                label="Loan Amount"
                value={borrowedAmount}
                min={5000}
                max={350000}
                step={1000}
                unit="R"
                unitPosition="prefix"
                formatValue={(val) =>
                  formatCurrency(val, { includeSymbol: false, fractionDigits: 0 })
                }
                onChange={setBorrowedAmount}
              />

              <LoanSlider
                label="Repayment Period"
                value={repaymentPeriod}
                min={24}
                max={72}
                step={1}
                unit=" months"
                unitPosition="suffix"
                onChange={setRepaymentPeriod}
              />
              <LoanSummary
                loanAmount={borrowedAmount}
                loanPeriod={repaymentPeriod}
              />
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
          </div>
        </div>
      </div>
    </section>
  );
}
