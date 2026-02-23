"use client";

import { useState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { ScrollArea } from "components/da-loan/ui-premetive/scroll-area";
import { Checkbox } from "components/da-loan/ui-premetive/checkbox";
import { Label } from "components/da-loan/ui-premetive/label";
import { Button } from "components/da-loan/ui-premetive/button";
import { Controller, type Control, type FieldErrors, type FieldValues, useWatch, type Path } from "react-hook-form";

interface TermsModalProps<TFieldValues extends FieldValues> {
  readonly control: Control<TFieldValues>;
  readonly errors: FieldErrors<TFieldValues>;
}

export default function TermsModal<TFieldValues extends FieldValues>({ control, errors }: TermsModalProps<TFieldValues>) {
  const [isTermsVisible, setIsTermsVisible] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const acceptedTerms = useWatch({ control, name: "acceptTerms" as Path<TFieldValues> });

  return (
    <div className="w-full flex flex-col justify-start gap-4">
      <div className="space-y-2">
        <Controller
          name={"acceptTerms" as Path<TFieldValues>}
          control={control}
          render={({ field }) => {
            const handleCheckedChange = (checked: CheckedState) => {
              const isChecked = checked === true;
              setIsCheckboxChecked(isChecked);
              setIsTermsVisible(isChecked);
              if (!isChecked) {
                field.onChange(false);
              }
            };

            const handleAccept = () => {
              if (!isChecked) {
                return;
              }
              field.onChange(true);
              setIsTermsVisible(false);
            };

            const handleDecline = () => {
              field.onChange(false);
              setIsTermsVisible(false);
              setIsCheckboxChecked(false);
            };

            const hasError = Boolean(errors.acceptTerms);
            const isChecked = isCheckboxChecked || Boolean(acceptedTerms);

            return (
              <div className="space-y-2">
                <div className="flex justify-start items-center gap-2">
                  <Checkbox
                    id="terms-checkbox"
                    checked={isChecked}
                    onCheckedChange={handleCheckedChange}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? "terms-checkbox-error" : undefined}
                  />
                  <Label htmlFor="terms-checkbox" className={hasError ? "text-red-500" : undefined}>
                    I accept the terms and conditions.
                  </Label>
                </div>
                {errors.acceptTerms && (
                  <p id="terms-checkbox-error" className="text-sm text-red-500">
                    {typeof errors.acceptTerms === "object" && errors.acceptTerms !== null && "message" in errors.acceptTerms
                      ? String(errors.acceptTerms.message)
                      : "You must accept the terms and conditions to continue"}
                  </p>
                )}
                {isTermsVisible && (
                  <div className="space-y-3">
                    <ScrollArea className="h-[140px] w-full rounded-md border border-gray-200 p-4">
                      <div className="space-y-2">
                        <p className="text-xs font-medium">Terms and Conditions</p>
                        <p className="text-[11px] text-gray-600">
                          Loan repayment terms range from a minimum of 24 to a maximum of 72 months. The maximum interest
                          rate with regards to a DirectAxis Personal Loan is 28.00% per annum (compounded monthly). Your
                          rate and initiation fee will be determined according to your personal risk profile. An
                          illustrative example of a R50 000.00 loan at an interest rate of 28.00% per annum plus a once-off
                          initiation fee of R1 207.50 (added to the loan amount in this example) and a monthly admin fee
                          of R69.00, over 72 months would have a total cost of R111 760.74.
                        </p>
                      </div>
                    </ScrollArea>
                    <div className="flex justify-end gap-2">
                      <Button type="button" size="sm" variant="outline" onClick={handleDecline}>
                        Decline
                      </Button>
                      <Button type="button" size="sm" onClick={handleAccept} disabled={!isChecked}>
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
