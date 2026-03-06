"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui-primitive/tooltip";
import { HelpCircle } from "lucide-react";
import React, { useState } from "react";

export interface DropDownOption {
	value: string;
	label: string;
}

interface DropDownListProps {
	readonly id?: string;
	readonly label: React.ReactNode;
	readonly value: string;
	readonly onValueChange: (value: string) => void;
	readonly options: DropDownOption[];
	readonly placeholder?: string;
	readonly error?: string;
	readonly helperText?: string;
	readonly className?: string;
	readonly required?: boolean;
	readonly requiredMessage?: string;
	readonly tooltip?: string;
}

export const DropDownList = ({
	id,
	label,
	value,
	onValueChange,
	options,
	placeholder = "Select an option",
	error,
	helperText,
	className = "w-full",
	required = false,
	requiredMessage = "This field is required",
	tooltip,
}: DropDownListProps) => {
	const [touched, setTouched] = useState(false);
	const [internalError, setInternalError] = useState<string>("");

	const handleValueChange = (newValue: string) => {
		onValueChange(newValue);
		setTouched(true);
		// Clear internal error when a value is selected
		if (newValue) {
			setInternalError("");
		}
	};

	const handleOpenChange = (open: boolean) => {
		// When dropdown closes, mark as touched and validate
		if (!open) {
			setTouched(true);
			if (required && !value) {
				setInternalError(requiredMessage);
			}
		}
	};

	// Show external error first, then internal error if touched
	const displayError = error || (touched && internalError);

	return (
		<div>
			{tooltip ? (
				<div className="flex items-center gap-2 mb-1">
					<label className="block text-sm text-gray-800">
						{label}
					</label>
					<Tooltip>
						<TooltipTrigger asChild>
							<button type="button" className="inline-flex items-center">
								<HelpCircle className="w-4 h-4 text-gray-400" />
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{tooltip}</p>
						</TooltipContent>
					</Tooltip>
				</div>
			) : (
				<label className="block text-sm text-gray-800 mb-1">
					{label}
				</label>
			)}
			<Select value={value} onValueChange={handleValueChange} onOpenChange={handleOpenChange}>
				<SelectTrigger className={className}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{displayError && <p className="text-sm text-red-500 mt-1">{displayError}</p>}
			{helperText && !displayError && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
		</div>
	);
};
