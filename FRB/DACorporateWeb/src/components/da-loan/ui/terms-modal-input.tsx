"use client";

import * as React from "react";
import { Button } from "components/da-loan/ui-premetive/button";
import { ScrollArea } from "components/da-loan/ui-premetive/scroll-area";
import { Checkbox } from "components/da-loan/ui-premetive/checkbox";
import { Label } from "components/da-loan/ui-premetive/label";
import { useState } from "react";
import {
	TextField,
	Text
} from '@sitecore-content-sdk/nextjs';

interface TermsModalInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "type"> {
	name: string;
	label: TextField;
	value?: string | number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	required?: boolean;
	containerClassName?: string;
	labelContainerClassName?: string;
	labelClassName?: string;
	checkboxClassName?: string;
	errorClassName?: string;
	TermsAndConditions_InnerHTMLContentHeading?: TextField;
	TermsAndConditions_InnerHTMLContent?: TextField;
	TermsAndConditions_TermsAcceptButtonText?: TextField;
	TermsAndConditions_TermsDeclineButtonText?: TextField;
	TermsAndConditions_TermsInputText?: string;
	children?: React.ReactNode;
}


export const TermsModalInput = React.forwardRef<HTMLInputElement, TermsModalInputProps>(
	(
		{
			name,
			label,
			value,
			onChange,
			error,
			required = false,
			containerClassName = "space-y-2",
			labelContainerClassName = "flex justify-start items-center gap-2",
			labelClassName = "",
			checkboxClassName = "",
			errorClassName = "text-sm text-red-500",
			TermsAndConditions_InnerHTMLContentHeading,
			TermsAndConditions_InnerHTMLContent,
			TermsAndConditions_TermsAcceptButtonText,
			TermsAndConditions_TermsDeclineButtonText,
			children,
			...props
		},
		ref
	) => {
		// const [isError, setError] = useState(false);
		const [isTermsVisible, setIsTermsVisible] = useState(false);
		const isChecked = value === "1" || value === 1;

		const handleCheckedChange = (checked: boolean | "indeterminate") => {
			setIsTermsVisible(checked === true);
			if (onChange) {
				const syntheticEvent = {
					target: {
						name,
						value: checked ? "1" : "",
					},
				} as unknown as React.ChangeEvent<HTMLInputElement>;
				onChange(syntheticEvent);
			}
		};

		function handleDecline(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
			setIsTermsVisible(false);
			if (onChange) {
				const syntheticEvent = {
					target: {
						name,
						value: "",
					},
				} as unknown as React.ChangeEvent<HTMLInputElement>;
				onChange(syntheticEvent);
			}
		}

		function handleAccept(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
			setIsTermsVisible(false);
			if (onChange) {
				const syntheticEvent = {
					target: {
						name,
						value: "1",
					},
				} as unknown as React.ChangeEvent<HTMLInputElement>;
				onChange(syntheticEvent);
			}
		}

		return (
			<div className={containerClassName}>
				<div className={labelContainerClassName}>
					<Checkbox
						id={name + "-terms-checkbox"}
						checked={isChecked}
						onCheckedChange={handleCheckedChange}
						className={checkboxClassName}
						aria-invalid={!!error}
						aria-describedby={error ? name + "-terms-checkbox-error" : undefined}
					/>
					<Label htmlFor={name + "-terms-checkbox"} className={labelClassName}>
						<Text field={label} />
					</Label>
				</div>
				{error && (
					<p id={name + "-terms-checkbox-error"} className={errorClassName}>
						{error}
					</p>
				)}
				{isTermsVisible && (
					<div className="space-y-3">
						<ScrollArea className="h-[140px] w-full rounded-md border border-gray-200 p-4">
							<div className="space-y-2">
								<p className="text-xs font-medium">
									{TermsAndConditions_InnerHTMLContentHeading && (
										<Text field={TermsAndConditions_InnerHTMLContentHeading} />
									)}
								</p>
								<p className="text-[11px] text-gray-600">
									{TermsAndConditions_InnerHTMLContent && (
										<Text field={TermsAndConditions_InnerHTMLContent} />
									)}
								</p>
								{children}
							</div>
						</ScrollArea>
						<div className="flex justify-end gap-2">

							{TermsAndConditions_TermsDeclineButtonText && (
								<Button type="button" size="sm" variant="outline" onClick={handleDecline}>
									<Text field={TermsAndConditions_TermsDeclineButtonText} />
								</Button>
							)}

							{TermsAndConditions_TermsAcceptButtonText && (
								<Button type="button" size="sm" onClick={handleAccept} disabled={!isChecked}>
									<Text field={TermsAndConditions_TermsAcceptButtonText} />
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
