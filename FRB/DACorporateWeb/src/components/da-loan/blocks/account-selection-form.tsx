"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/da-loan/ui-premetive/select";
import { Input } from "components/da-loan/ui-premetive/input";
import { Button } from "components/da-loan/ui-premetive/button";
import { Label } from "components/da-loan/ui-premetive/label";
import { X } from "lucide-react";
import { formatCurrency } from "lib/format";

export interface AccountItem {
  id: string;
  accountType: string;
  balance: string;
  installment: string;
}

interface AccountSelectionFormProps {
  onAccountsChange?: (accounts: AccountItem[]) => void;
}

export function AccountSelectionForm({ onAccountsChange }: Readonly<AccountSelectionFormProps>) {
  const [selectedAccountType, setSelectedAccountType] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [installment, setInstallment] = useState<string>("");
  const [accounts, setAccounts] = useState<AccountItem[]>([]);

  // Clear form state on component mount (handles page refresh)
  useEffect(() => {
    setSelectedAccountType("");
    setBalance("");
    setInstallment("");
    setAccounts([]);
    onAccountsChange?.([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount


  const accountTypes = [
    "Credit Card",
    "Retail Account",
    "Personal Loan",
    "Other",
  ];

  const handleAdd = () => {
    if (!selectedAccountType || !balance || !installment) {
      return;
    }

    const newAccount: AccountItem = {
      id: Date.now().toString(),
      accountType: selectedAccountType,
      balance: balance,
      installment: installment,
    };

    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    onAccountsChange?.(updatedAccounts);
    setSelectedAccountType("");
    setBalance("");
    setInstallment("");
  };

  const handleRemove = (id: string) => {
    const updatedAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(updatedAccounts);
    onAccountsChange?.(updatedAccounts);
  };

  const sanitizeCurrencyInput = (value: string) => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, "");
    return numericValue;
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = sanitizeCurrencyInput(e.target.value);
    setBalance(formatted);
  };

  const handleInstallmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = sanitizeCurrencyInput(e.target.value);
    setInstallment(formatted);
  };

  return (
    <div className="w-full space-y-6">
      {/* Form Section */}
      <div className="space-y-4">
        {/* Account Type Selection */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-6">
          <div className="w-fit">
            <Label
              htmlFor="account-type"
              className="text-sm font-medium mb-2 block"
              style={{ color: "var(--color-text-primary)" }}
            >
              Which account/s do you want to settle?
            </Label>
            <Select
              value={selectedAccountType}
              onValueChange={setSelectedAccountType}
            >
              <SelectTrigger
                id="account-type"
                className="w-full h-12!"
              >
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                {accountTypes.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Balance Input */}
          <div className="w-fit">
            <Label
              htmlFor="balance"
              className="text-sm font-medium mb-2 block"
              style={{ color: "var(--color-text-primary)" }}
            >
              Your balance
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">R</span>
              <Input
                id="balance"
                type="text"
                value={balance}
                onChange={handleBalanceChange}
                placeholder="0.00"
                className="pl-8"
              />
            </div>
          </div>

          {/* Installment Input */}
          <div className="w-fit">
            <Label
              htmlFor="installment"
              className="text-sm font-medium mb-2 block"
              style={{ color: "var(--color-text-primary)" }}
            >
              Your instalment
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">R</span>
              <Input
                id="installment"
                type="text"
                value={installment}
                onChange={handleInstallmentChange}
                placeholder="0.00"
                className="pl-8"
              />
            </div>
          </div>

          {/* Add Button */}
          <div className="flex items-end">
            <Button
              variant="default"
              onClick={handleAdd}
              disabled={!selectedAccountType || !balance || !installment}
              className="h-12 px-6 uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ADD
            </Button>
          </div>
        </div>
      </div>

      {/* Added Accounts List */}
      {accounts.length > 0 && (
        <div className="space-y-3 mt-6">
          <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
            Added Accounts
          </h3>
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between p-4 border border-border rounded-md bg-muted/30"
            >
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Account Type</p>
                  <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                    {account.accountType}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Balance</p>
                  <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                    {formatCurrency(Number.parseFloat(account.balance || "0"))}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Installment</p>
                  <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                    {formatCurrency(Number.parseFloat(account.installment || "0"))}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(account.id)}
                className="ml-4 h-8 w-8 text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
