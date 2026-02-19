"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { AccountSelectionForm, AccountItem } from "./account-selection-form";
import { ConsolidationSummary } from "./consolidation-summary";

export function ConsolidationCalculator() {
  const pathname = usePathname();
  // Initialize state as empty - key prop will force remount on navigation
  const [accounts, setAccounts] = useState<AccountItem[]>([]);

  // Reset accounts state when pathname changes (handles navigation)
  // Using key prop on child will also force remount, but we need to reset parent state too
  // Note: This setState in useEffect is necessary to reset state on navigation/refresh
  // as Next.js client-side navigation may not remount the component
  useEffect(() => {
    setAccounts([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Memoize the callback to prevent unnecessary re-renders
  const handleAccountsChange = useCallback((newAccounts: AccountItem[]) => {
    setAccounts(newAccounts);
  }, []);

  return (
    <section className="relative w-full p-4 md:p-12 py-12 md:py-20 bg-primary">
      <div className="w-full max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-6 lg:gap-16 items-center">
          <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-8 text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Consolidation Calculator
            </h2>
            <p className="text-base md:text-lg mb-6 lg:mb-8">
              Simplify your financial life by combining multiple debts into one manageable loan. Try out our Debt Consolidation Loan Calculator to see if you could improve your monthly cash flow.
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
            <h2 className="text-3xl md:text-4xl font-medium text-gray-800 font-heading text-center mb-3 text-balance">
            This is how much you could save on cashflow each month
            </h2>
            <div className="space-y-8">
              <AccountSelectionForm key={pathname} onAccountsChange={handleAccountsChange} />
              <ConsolidationSummary accounts={accounts} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
