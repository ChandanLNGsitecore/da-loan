"use client";

import { useState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { ScrollArea } from "components/da-loan/ui-premetive/scroll-area";
import { Checkbox } from "components/da-loan/ui-premetive/checkbox";
import { Label } from "components/da-loan/ui-premetive/label";
import { Button } from "components/da-loan/ui-premetive/button";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { LoanApplication } from "lib/schemas";

interface TermsModalProps {
  readonly control: Control<LoanApplication>;
  readonly errors: FieldErrors<LoanApplication>;
}

export default function TermsModal({ control, errors }: TermsModalProps) {
  const [isTermsVisible, setIsTermsVisible] = useState(false);

  return (
    <div className="w-full flex flex-col justify-start gap-4">
      <div className="space-y-2">
        <Controller
          name="acceptTerms"
          control={control}
          rules={{
            required: "You must accept the terms and conditions"
          }}
          render={({ field }) => {
            const handleCheckedChange = (checked: CheckedState) => {
              const isChecked = checked === true;
              field.onChange(isChecked);
              setIsTermsVisible(isChecked);
            };

            const handleAccept = () => {
              field.onChange(true);
              setIsTermsVisible(false);
            };

            const handleDecline = () => {
              field.onChange(false);
              setIsTermsVisible(false);
            };

            return (
              <div className="space-y-2">
                <div className="flex justify-start items-center gap-2">
                  <Checkbox id="terms-checkbox" checked={Boolean(field.value)} onCheckedChange={handleCheckedChange} />
                  <Label htmlFor="terms-checkbox">I accept the terms and conditions.</Label>
                </div>
                {errors.acceptTerms && <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>}
                {isTermsVisible && (
                  <div className="space-y-3">
                    <ScrollArea className="h-[140px] w-full rounded-md border border-gray-200 p-4">
                      <div className="space-y-2">
                        <p className="text-xs font-medium">Terms and Conditions</p>
                        <p className="text-[11px] text-gray-600">
                          Loan repayment terms range from a minimum of 24 to a maximum of 72 months. The maximum interest
                          rate with regards to a DirectAxis Personal Loan is 28.00% per annum (compounded monthly). Your
                          rate and initiation fee will be determined according to your personal risk profile. An
                          illustrative example of a R50 000 loan at an interest rate of 28.00% per annum plus a once-off
                          initiation fee of R1 207.50 (added to the loan amount in this example) and a monthly admin fee
                          of R69.00, over 72 months would have a total cost of R111 760.74.
                        </p>
                      </div>
                    </ScrollArea>
                    <div className="flex justify-end gap-2">
                      <Button type="button" size="sm" variant="outline" onClick={handleDecline}>
                        Decline
                      </Button>
                      <Button type="button" size="sm" onClick={handleAccept}>
                        Accept
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
