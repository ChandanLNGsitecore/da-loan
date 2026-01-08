import * as React from "react";
import { cn } from "lib/utils";

interface SouthAfricanIDInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "maxLength" | "minLength"> {
	name: string;
	label: React.ReactNode;
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	error?: string;
	required?: boolean;
	containerClassName?: string;
	labelClassName?: string;
	inputClassName?: string;
	errorClassName?: string;
	customValidationError?: string;
}

export const SouthAfricanIDInput = React.forwardRef<HTMLInputElement, SouthAfricanIDInputProps>(
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
			containerClassName = "space-y-2",
			labelClassName = "text-sm text-gray-800",
			inputClassName = "w-full",
			errorClassName = "text-sm text-red-500",
			customValidationError,
			...props
		},
		ref
	) => {
		const [validationError, setValidationError] = React.useState<string>("");

		const validateSouthAfricanID = (idNumber: string): boolean => {
			if (idNumber.length !== 13) return false;

			// Check if all characters are digits
			if (!/^\d{13}$/.test(idNumber)) return false;

			// Extract date parts
			const year = parseInt(idNumber.substring(0, 2), 10);
			const month = parseInt(idNumber.substring(2, 4), 10);
			const day = parseInt(idNumber.substring(4, 6), 10);

			// Validate month
			if (month < 1 || month > 12) return false;

			// Validate day
			if (day < 1 || day > 31) return false;

			// Convert 2-digit year to 4-digit year (assume 1900s for >= 00, 2000s for < current year last 2 digits)
			const currentYear = new Date().getFullYear();
			const currentCentury = Math.floor(currentYear / 100) * 100;
			const fullYear = year <= currentYear % 100 ? currentCentury + year : currentCentury - 100 + year;

			// Validate the actual date exists
			const date = new Date(fullYear, month - 1, day);
			if (date.getFullYear() !== fullYear || date.getMonth() !== month - 1 || date.getDate() !== day) {
				return false;
			}

			// Ensure birth date is not in the future
			if (date > new Date()) return false;

			// Luhn algorithm check (checksum validation)
			let sum = 0;
			for (let i = 0; i < 13; i++) {
				const digit = parseInt(idNumber[i], 10);
				
				if (i % 2 === 0) {
					// Odd positions (1st, 3rd, 5th, etc.) - 0-indexed
					sum += digit;
				} else {
					// Even positions (2nd, 4th, 6th, etc.)
					const doubled = digit * 2;
					sum += doubled > 9 ? doubled - 9 : doubled;
				}
			}

			return sum % 10 === 0;
		};

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			
			// Only allow digits
			if (newValue === "" || /^\d*$/.test(newValue)) {
				// Limit to 13 digits
				if (newValue.length <= 13) {
					onChange?.(e);
					setValidationError("");
				}
			}
		};

		const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
			const idValue = e.target.value;
			
			if (idValue && idValue.length === 13) {
				if (!validateSouthAfricanID(idValue)) {
					setValidationError(customValidationError || "Invalid South African ID number");
				} else {
					setValidationError("");
				}
			} else if (idValue && idValue.length > 0 && idValue.length < 13) {
				setValidationError("ID number must be exactly 13 digits");
			}
			
			onBlur?.(e);
		};

		const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
			const char = e.key;
			
			// Only allow digits
			if (char.length === 1 && !/\d/.test(char)) {
				e.preventDefault();
			}
		};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pastedText = e.clipboardData.getData("text");
		
		// Extract only digits from pasted text
		const digitsOnly = pastedText.replace(/\D/g, "");
		
		// Limit to 13 digits
		const limitedDigits = digitsOnly.substring(0, 13);
		
		if (limitedDigits) {
			// Update the input element's value directly
			const input = e.currentTarget;
			const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
			if (nativeInputValueSetter) {
				nativeInputValueSetter.call(input, limitedDigits);
			}
			
			// Create a synthetic event to trigger onChange with the cleaned value
			const syntheticEvent = new Event('input', { bubbles: true });
			input.dispatchEvent(syntheticEvent);
			
			setValidationError("");
		}
	};

	const displayError = validationError || error;

	return (
		<div className={containerClassName}>
			<label htmlFor={name} className={labelClassName}>
				{label}
			</label>
			<input
				ref={ref}
				id={name}
				name={name}
				type="text"
				inputMode="numeric"
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				onPaste={handlePaste}
				onFocus={onFocus}
				onBlur={handleBlur}
				required={required}
				maxLength={13}
					className={cn(
						"flex h-12 w-full rounded-md border border-input-border-default bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						inputClassName
					)}
					{...props}
				/>
				{displayError && <p className={errorClassName}>{displayError}</p>}
			</div>
		);
	}
);

SouthAfricanIDInput.displayName = "SouthAfricanIDInput";
