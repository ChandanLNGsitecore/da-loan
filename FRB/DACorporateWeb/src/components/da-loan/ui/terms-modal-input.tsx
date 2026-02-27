"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { ScrollArea } from "components/da-loan/ui-premetive/scroll-area";
import { Checkbox } from "components/da-loan/ui-premetive/checkbox";
import { Button } from "components/da-loan/ui-premetive/button";
import { Label } from "components/da-loan/ui-premetive/label";
import { Text, type TextField } from "@sitecore-content-sdk/nextjs";

interface TermsModalInputProps
	extends Omit<React.ComponentProps<"input">, "onChange" | "type"> {
	name: string;
	label: React.ReactNode;
	value?: string | number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	required?: boolean;
	containerClassName?: string;
	labelContainerClassName?: string;
	labelClassName?: string;
	checkboxClassName?: string;
	errorClassName?: string;
	TermsAndConditions_InnerHTMLContentHeading?: React.ReactNode;
	TermsAndConditions_InnerHTMLContent?: React.ReactNode;
	TermsAndConditions_TermsAcceptButtonText?: React.ReactNode;
	TermsAndConditions_TermsDeclineButtonText?: React.ReactNode;
}

export const TermsModalInput = React.forwardRef<
	HTMLInputElement,
	TermsModalInputProps
>(
	(
		{
			name,
			label,
			value,
			onChange,
			error,
			required = true,
			containerClassName = "space-y-2",
			labelContainerClassName = "flex justify-start items-center gap-2",
			labelClassName = "",
			checkboxClassName = "",
			errorClassName = "text-sm text-red-500",
			TermsAndConditions_InnerHTMLContentHeading,
			TermsAndConditions_InnerHTMLContent,
			TermsAndConditions_TermsAcceptButtonText,
			TermsAndConditions_TermsDeclineButtonText,
		},
		ref
	) => {
		const [isTermsVisible, setIsTermsVisible] = useState(false);
		// FIX: Track a pending check state separately so ticking the checkbox opens the modal first,
		// instead of immediately committing acceptance to form value.
		const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

		// FIX: Treat accepted as a committed value only (set via Accept action).
		const isAccepted = value === "1" || value === 1;
		const isChecked = isCheckboxChecked || isAccepted;

		useEffect(() => {
			// FIX: Keep local pending check state in sync when parent clears accepted value.
			if (!isAccepted) {
				setIsCheckboxChecked(false);
			}
		}, [isAccepted]);

		const emitChange = (nextValue: string) => {
			if (!onChange) {
				return;
			}

			// FIX: Centralize synthetic event emission to avoid duplicated event construction logic.
			const syntheticEvent = {
				target: {
					name,
					value: nextValue,
				},
			} as React.ChangeEvent<HTMLInputElement>;

			onChange(syntheticEvent);
		};

		const handleCheckedChange = (checked: boolean | "indeterminate") => {
			const isNowChecked = checked === true;
			setIsCheckboxChecked(isNowChecked);
			setIsTermsVisible(isNowChecked);

			// FIX: Unchecking clears accepted value immediately.
			// Checking does not commit value; commit happens only on Accept.
			if (!isNowChecked) {
				emitChange("");
			}
		};

		const handleDecline = () => {
			// FIX: Decline clears both pending check UI state and committed form value.
			setIsTermsVisible(false);
			setIsCheckboxChecked(false);
			emitChange("");
		};

		const handleAccept = () => {
			// FIX: Guard against accidental acceptance without an active checked intent.
			if (!isCheckboxChecked) {
				return;
			}

			// FIX: Commit accepted value only from explicit Accept action.
			setIsTermsVisible(false);
			emitChange("1");
		};

		return (
			<div className={containerClassName}>
				{/* FIX: Hidden input keeps native form/ref compatibility while checkbox UI drives behavior. */}
				<input
					ref={ref}
					id={name}
					name={name}
					type="hidden"
					value={isAccepted ? "1" : ""}
					readOnly
					required={required}
				/>
				<div className={labelContainerClassName}>
					<Checkbox
						id={`${name}-terms-checkbox`}
						checked={isChecked}
						onCheckedChange={handleCheckedChange}
						className={checkboxClassName}
						aria-invalid={!!error}
						aria-describedby={error ? `${name}-terms-checkbox-error` : undefined}
					/>
					<Label
						htmlFor={`${name}-terms-checkbox`}
						className={error ? `text-red-500 ${labelClassName}` : labelClassName}
					>
						{label}
					</Label>
				</div>
				{error && (
					<p id={`${name}-terms-checkbox-error`} className={errorClassName}>
						{error}
					</p>
				)}
				{isTermsVisible && (
					<div className="space-y-3">
						<ScrollArea className="h-[140px] w-full rounded-md border border-gray-200 p-4">
							<div className="space-y-2">
								<p className="text-xs font-medium">
									{TermsAndConditions_InnerHTMLContentHeading}
								</p>
								{TermsAndConditions_InnerHTMLContent && (
									<div
										className="text-[11px] text-gray-600"
										dangerouslySetInnerHTML={{
											__html: typeof TermsAndConditions_InnerHTMLContent === 'string'
												? TermsAndConditions_InnerHTMLContent
												: (TermsAndConditions_InnerHTMLContent as any).props?.field?.value || ''
										}}
									/>
								)}
							</div>
						</ScrollArea>
						<div className="flex justify-end gap-2">
							{TermsAndConditions_TermsDeclineButtonText && (
								<Button
									type="button"
									size="sm"
									variant="outline"
									onClick={handleDecline}
								>
									{TermsAndConditions_TermsDeclineButtonText}
								</Button>
							)}
							{TermsAndConditions_TermsAcceptButtonText && (
								<Button
									type="button"
									size="sm"
									onClick={handleAccept}
									disabled={!isChecked}
								>
									{TermsAndConditions_TermsAcceptButtonText}
								</Button>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
);

TermsModalInput.displayName = "TermsModalInput";

export default TermsModalInput;
