"use client";
import Link from "next/link";
import { Button } from "components/da-loan/ui-primitive/button";
import { Card, CardContent } from "components/da-loan/ui-primitive/card";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Building2,
  User,
  FileText,
  CreditCard,
  Mail,
  Phone,
  Home,
  Info,
  FileCheck,
} from "lucide-react";
import { useState } from "react";
import reviewData from "lib/review.json";
import { Checkbox } from "../ui-primitive/checkbox";
import { Label } from "../ui-primitive/label";

interface LoanReviewProps {
  readonly onAccept?: () => void;
  readonly onBack?: () => void;
}

export const Default = ({ onAccept, onBack }: Readonly<LoanReviewProps>) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["CONTRACTING PARTIES"])
  );

  const toggleSection = (header: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(header)) {
      newExpanded.delete(header);
    } else {
      newExpanded.add(header);
    }
    setExpandedSections(newExpanded);
  };

  const formatAmount = (amount: number) => {
    return `R${amount
      .toLocaleString("en-ZA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/,/g, " ")}`;
  };

  const formatAddress = (address: Record<string, string>) => {
    return Object.values(address).filter(Boolean).join(", ");
  };

  return (
    <Card className="w-full mx-auto bg-white border-gray-300">
      <CardContent className="p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Review Your Loan Agreement
          </h2>
          <p className="text-sm text-gray-600">
            Please review all the details below before confirming your loan
            application.
          </p>
        </div>

        <div className="space-y-4">
          {reviewData.sections.map((section, index) => {
            const isExpanded = expandedSections.has(section.header);
            const Icon = getSectionIcon(section.header);

            return (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-0">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.header)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-[#2c5f5d]" />
                      <h3 className="text-lg font-semibold text-gray-900 text-left">
                        {section.header}
                      </h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
                      {renderSectionContent(
                        section.header,
                        section.content,
                        formatAmount,
                        formatAddress
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900">
                  Important Information
                </h4>
                <p className="text-sm text-gray-700">
                  By confirming this application, you agree to all the terms and
                  conditions outlined above. Please ensure all information is
                  correct before proceeding.
                </p>
                <p className="text-sm text-gray-700">
                  If you notice any errors, please contact us at{" "}
                  <span className="font-semibold">021 7643404</span> before
                  confirming.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col justify-between gap-4">
          <p>
            Click on the{" "}
            <Link href="#" target="_blank" className="text-blue-900 underline">
              NCA Marketing opt out link
            </Link>{" "}
            to view and maintain your Marketing preferences
          </p>
          <div className="flex items-center gap-3">
            <Checkbox id="r1" />
            <Label htmlFor="r1">
              I have read and understood the Terms of this Quote
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="r2" />
            <Label htmlFor="r2">
              I confirm that I can afford the instalment after taking into
              account all other credit and regular monthly expenses
            </Label>
          </div>
        </div>

        {onAccept && onBack ? (
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-6 border-gray-300 text-gray-700"
            >
              Back
            </Button>
            <Button
              onClick={onAccept}
              className="flex-1 bg-[#2c5f5d] hover:bg-[#234a48] text-white py-6"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />I am ready to accept
            </Button>
          </div>
        ) : (
          <div className="pt-4">
            <Button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-[#2c5f5d] hover:bg-[#234a48] text-white py-6"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function getSectionIcon(header: string) {
  if (header.includes("CONTRACTING")) return Building2;
  if (header.includes("QUOTATION") || header.includes("LOAN DETAIL"))
    return FileText;
  if (header.includes("INITIATION") || header.includes("CREDIT LIFE"))
    return Info;
  if (header.includes("DEBIT ORDER")) return CreditCard;
  if (header.includes("COMMUNICATION")) return Mail;
  if (header.includes("REVIEW")) return User;
  if (header.includes("DOCUMENTS")) return FileCheck;
  return FileText;
}

function renderSectionContent(
  header: string,
  content: Record<string, unknown>,
  formatAmount: (amount: number) => string,
  formatAddress: (address: Record<string, string>) => string
) {
  if (header === "CONTRACTING PARTIES") {
    const creditProvider = content.credit_provider as Record<string, unknown>;
    const borrower = content.borrower as Record<string, unknown>;

    return (
      <div className="space-y-6 pt-4">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900">
            Credit Provider
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-gray-900">
              {creditProvider.name as string}
            </p>
            <p className="text-xs text-gray-600">
              Company Registration:{" "}
              {creditProvider.company_registration_number as string}
            </p>
            <p className="text-xs text-gray-600">
              NCR Registration:{" "}
              {
                creditProvider.national_credit_regulator_registration_number as string
              }
            </p>
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">
                Address for Service:
              </p>
              <p className="text-xs text-gray-600">
                {formatAddress(
                  creditProvider.chosen_address_for_service as Record<
                    string,
                    string
                  >
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900">Borrower</h4>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-gray-900">
              {borrower.name as string}
            </p>
            <p className="text-xs text-gray-600">
              Contact: {borrower.contact_number as string}
            </p>
            <p className="text-xs text-gray-600">
              Email: {borrower.email_address as string}
            </p>
            <div className="pt-2 border-t border-gray-200 space-y-2">
              <div>
                <p className="text-xs font-medium text-gray-700 mb-1">
                  Residential Address:
                </p>
                <p className="text-xs text-gray-600">
                  {formatAddress(
                    borrower.residential_address as Record<string, string>
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700 mb-1">
                  Postal Address:
                </p>
                <p className="text-xs text-gray-600">
                  {formatAddress(
                    borrower.postal_address as Record<string, string>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (header === "QUOTATION 1 - LOAN DETAIL") {
    return (
      <div className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Loan Amount</p>
            <p className="text-lg font-bold text-[#2c5f5d]">
              {formatAmount(content.loan_amount as number)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">
              Initiation Fee (incl. VAT)
            </p>
            <p className="text-lg font-bold text-gray-900">
              {formatAmount(content.initiation_fee_including_vat as number)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Total Loan Amount</p>
            <p className="text-lg font-bold text-gray-900">
              {formatAmount(content.total_loan_amount as number)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Net Amount Deposited</p>
            <p className="text-lg font-bold text-[#2c5f5d]">
              {formatAmount(content.net_amount_deposited as number)}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 space-y-3 border border-blue-200">
          <h4 className="text-sm font-semibold text-gray-900">
            Monthly Payments
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Loan Repayment:</span>
              <span className="font-semibold text-gray-900">
                {formatAmount(content.monthly_loan_repayment as number)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Fee (incl. VAT):</span>
              <span className="font-semibold text-gray-900">
                {formatAmount(
                  content.monthly_service_fee_including_vat as number
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Credit Life Insurance:</span>
              <span className="font-semibold text-gray-900">
                {formatAmount(
                  (content.monthly_credit_life_insurance as { amount: number })
                    .amount
                )}
              </span>
            </div>
            <div className="pt-2 border-t border-blue-200 flex justify-between">
              <span className="text-sm font-semibold text-gray-900">
                Total Instalment:
              </span>
              <span className="text-lg font-bold text-[#2c5f5d]">
                {formatAmount(content.instalment_amount as number)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Number of Instalments</p>
            <p className="text-lg font-bold text-gray-900">
              {content.number_of_monthly_instalments as number} months
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Interest Rate (Annual)</p>
            <p className="text-lg font-bold text-gray-900">
              {
                (
                  content.total_interest as {
                    annual_interest_rate_fixed: number;
                  }
                ).annual_interest_rate_fixed
              }
              %
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Cost Summary
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Interest:</span>
              <span className="font-semibold text-gray-900">
                {formatAmount(
                  (content.total_interest as { amount: number }).amount
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Total Cost of Fees, Interest & Insurance:
              </span>
              <span className="font-semibold text-gray-900">
                {formatAmount(
                  content.total_cost_of_fees_interest_and_insurance as number
                )}
              </span>
            </div>
            <div className="pt-2 border-t border-gray-300 flex justify-between">
              <span className="text-sm font-semibold text-gray-900">
                Total Cost of Credit:
              </span>
              <span className="text-lg font-bold text-[#2c5f5d]">
                {formatAmount(content.total_cost_of_credit as number)}
              </span>
            </div>
            <div className="flex justify-between text-sm pt-1">
              <span className="text-gray-600">Credit Cost Multiple:</span>
              <span className="font-semibold text-gray-900">
                {(content.credit_cost_multiple as number).toFixed(2)}x
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (header === "INITIATION FEE AND CREDIT LIFE") {
    const choices = content.choices as string[];
    return (
      <div className="space-y-3 pt-4">
        <p>You have chosen to:</p>
        {choices.map((choice, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700">{choice}</p>
          </div>
        ))}
      </div>
    );
  }

  if (header === "NOTICE OF YOUR DEBIT ORDER AUTHORISATION AND MANDATE") {
    const debitDetails = content.debit_details as Record<string, unknown>;
    const firstInstalment = content.first_instalment as Record<string, unknown>;
    const finalInstalment = content.final_instalment as Record<string, unknown>;
    const terms = content.terms as string[];

    return (
      <div className="space-y-4 pt-4">
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-semibold text-gray-900">
            Debit Order Details
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-600">Bank</p>
              <p className="text-sm font-semibold text-gray-900">
                {debitDetails.bank as string}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Account Number</p>
              <p className="text-sm font-semibold text-gray-900">
                {debitDetails.account_number as string}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Deduction Date</p>
              <p className="text-sm font-semibold text-gray-900">
                Day {debitDetails.deduction_date as number}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Frequency</p>
              <p className="text-sm font-semibold text-gray-900 capitalize">
                {debitDetails.frequency as string}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 space-y-3 border border-blue-200">
          <h4 className="text-sm font-semibold text-gray-900">
            Instalment Schedule
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">First Instalment:</span>
              <span className="font-semibold text-gray-900">
                {formatAmount(firstInstalment.amount as number)}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              {firstInstalment.description as string}
            </p>
            <p className="text-xs text-gray-600">
              Deduction Date: {firstInstalment.deduction_date as string}
            </p>
            <div className="pt-2 border-t border-blue-200">
              <p className="text-xs text-gray-600">
                Final Instalment Date:{" "}
                {finalInstalment.deduction_date as string}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900">
            Terms & Conditions
          </h4>
          <ul className="space-y-2">
            {terms.map((term, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="text-[#2c5f5d] mt-1">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (header === "COMMUNICATION PREFERENCES") {
    return (
      <div className="space-y-3 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Language</p>
            <p className="text-sm font-semibold text-gray-900">
              {content.language as string}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Method</p>
            <p className="text-sm font-semibold text-gray-900 capitalize">
              {content.method as string}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Statement Frequency</p>
            <p className="text-sm font-semibold text-gray-900 capitalize">
              {content.statement_frequency as string}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Agreement Language</p>
            <p className="text-sm font-semibold text-gray-900">
              {content.agreement_language as string}
            </p>
          </div>
        </div>
        {(content.alternative_languages as string[]) &&
          (content.alternative_languages as string[]).length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-xs text-gray-600 mb-2">
                Alternative Languages Available:
              </p>
              <div className="flex gap-2 flex-wrap">
                {(content.alternative_languages as string[]).map(
                  (lang, index) => (
                    <span
                      key={index}
                      className="text-sm font-medium text-[#2c5f5d] bg-white px-3 py-1 rounded-full"
                    >
                      {lang}
                    </span>
                  )
                )}
              </div>
            </div>
          )}
      </div>
    );
  }

  if (header === "REVIEW YOUR INFORMATION") {
    const nameAndContact = content.name_and_contact_details as Record<
      string,
      unknown
    >;
    const contactDetails = content.contact_details as Record<string, unknown>;

    return (
      <div className="space-y-4 pt-4">
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-semibold text-gray-900">
            Personal Information
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-600">ID Number</p>
              <p className="text-sm font-semibold text-gray-900">
                {nameAndContact.id_number as string}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Full Name</p>
              <p className="text-sm font-semibold text-gray-900">
                {nameAndContact.first_name as string}{" "}
                {nameAndContact.middle_name as string}{" "}
                {nameAndContact.surname as string}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Marital Status</p>
              <p className="text-sm font-semibold text-gray-900">
                {nameAndContact.marital_status as string}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Home Language</p>
              <p className="text-sm font-semibold text-gray-900">
                {nameAndContact.home_language as string}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 space-y-3 border border-blue-200">
          <h4 className="text-sm font-semibold text-gray-900">
            Contact Details
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Email: </span>
              <span className="font-semibold text-gray-900">
                {contactDetails.email_address as string}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Cellphone: </span>
              <span className="font-semibold text-gray-900">
                {contactDetails.cellphone_number as string}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-600" />
            <div>
              <p className="text-xs text-gray-600">
                Contact Number for Errors:
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {content.contact_number_for_errors as string}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (header === "DOCUMENTS") {
    const documents = content.documents as Array<{
      name: string;
      status: string;
    }>;

    return (
      <div className="space-y-3 pt-4">
        <p className="text-sm text-gray-600 mb-4">
          The following documents have been uploaded and verified:
        </p>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-50 rounded-lg p-4"
            >
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-600 capitalize">{doc.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
