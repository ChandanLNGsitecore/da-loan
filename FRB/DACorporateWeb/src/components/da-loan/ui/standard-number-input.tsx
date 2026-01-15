import * as React from "react";
import { cn } from "lib/utils";
import { CircleHelp } from "lucide-react";
import {
	
	TextField,
	Text
} from '@sitecore-content-sdk/nextjs';

interface StandardNumberInputProps extends Omit<React.ComponentProps<"input">, "onChange"> {
	name: string;
	label: TextField;
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	error?: string;
	required?: boolean;
	maxLength?: number;
	minLength?: number;
	minLengthErrorMessage?: string;
	inputRegex?: RegExp;
	containerClassName?: string;
	labelContainerClassName?: string;
	labelClassName?: string;
	inputWrapperClassName?: string;
	inputClassName?: string;
	errorClassName?: string;
	showLabel?: boolean;
	showHelpIcon?: boolean;
	helpIconClassName?: string;
	tooltipText?: string;
	prefix?: string;
	prefixClassName?: string;
	formatErrorMessage?: string;
}

export const StandardNumberInput = React.forwardRef<HTMLInputElement, StandardNumberInputProps>(
	(
		{
			name,
			label,
			placeholder,
			value,
			onChange,
			onFocus,
			onBlur,
			error,
			required = false,
			maxLength,
			minLength,
			minLengthErrorMessage,
			inputRegex,
			containerClassName = "",
			labelContainerClassName = "",
			labelClassName = "text-sm text-gray-800",
			inputWrapperClassName,
			inputClassName = "w-full",
			errorClassName = "text-sm text-red-500",
			showLabel = true,
			showHelpIcon = false,
			helpIconClassName = "w-4 h-4 text-gray-400",
			tooltipText,
			prefix,
			prefixClassName = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-900",
			type = "text",
			formatErrorMessage="",
			...props
		},
		ref
	) => {
		const [validationError, setValidationError] = React.useState<string>("");

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value;
		// Strip all non-digit characters (handles paste events)
		const cleanedValue = rawValue.replace(/\D/g, "");
		
		// Update the input value directly to prevent alphabets from showing
		if (e.target instanceof HTMLInputElement) {
			e.target.value = cleanedValue;
		}
		
		// Create a new event with the cleaned value
		const newEvent = {
			...e,
			target: {
				...e.target,
				value: cleanedValue,
			},
		} as React.ChangeEvent<HTMLInputElement>;
		
		// Call the onChange handler from props (like react-hook-form's register)
		onChange?.(newEvent);
		
		// Clear validation error when typing
		if (validationError) setValidationError("");
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const char = e.key;
		// Only allow digits (0-9) during keypress
		if (char.length === 1 && !/\d/.test(char)) {
			e.preventDefault();
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		
		// Validate regex pattern on blur if provided
		if (inputRegex && inputValue.length > 0 && !inputRegex.test(inputValue)) {
			setValidationError(formatErrorMessage || "Invalid format");
		}
		// Check minLength validation only if there is input
		else if (minLength && inputValue.length > 0 && inputValue.length < minLength) {
			setValidationError(minLengthErrorMessage || `Field must be at least ${minLength} characters`);
		} else {
			setValidationError("");
		}
		
		onBlur?.(e);
	};

		const displayError = validationError || error;

		return (
			<div className={containerClassName}>
				{showLabel && (
					<label htmlFor={name} className={labelClassName}>
						<Text field={label} />
					</label>
				)}
				{showHelpIcon && (
					<CircleHelp className={helpIconClassName} aria-label={tooltipText} />
				)}
				
			
					{prefix && <span className={prefixClassName}>{prefix}</span>}
					<input
						ref={ref}
						id={name}
						name={name}
						type={type}
						value={value}
						placeholder={placeholder}
						onChange={handleChange}
						onKeyPress={handleKeyPress}
						onFocus={onFocus}
						onBlur={handleBlur}
						required={required}
						maxLength={maxLength}
						className={cn(
							"flex h-12 w-full rounded-md border border-input-border-default bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
							prefix && "pl-8",
							inputClassName
						)}
						{...props}
					/>
				
				{displayError && <p className={errorClassName}>{displayError}</p>}
			</div>
		);
	}
);

StandardNumberInput.displayName = "StandardNumberInput";
