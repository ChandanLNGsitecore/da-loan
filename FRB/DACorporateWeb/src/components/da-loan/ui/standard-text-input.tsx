import * as React from "react";
import { cn } from "lib/utils";
import { CircleHelp } from "lucide-react";

interface StandardTextInputProps extends Omit<React.ComponentProps<"input">, "onChange"> {
	name: string;
	label: React.ReactNode;
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
	showHelpIcon?: boolean;
	helpIconClassName?: string;
	tooltipText?: string;
	prefix?: string;
	prefixClassName?: string;
}

export const StandardTextInput = React.forwardRef<HTMLInputElement, StandardTextInputProps>(
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
			containerClassName = "space-y-2",
			labelContainerClassName = "flex items-center gap-2",
			labelClassName = "text-sm text-gray-800",
			inputWrapperClassName,
			inputClassName = "w-full",
			errorClassName = "text-sm text-red-500",
			showHelpIcon = false,
			helpIconClassName = "w-4 h-4 text-gray-400",
			tooltipText,
			prefix,
			prefixClassName = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-900",
			type = "text",
			...props
		},
		ref
	) => {
		const [validationError, setValidationError] = React.useState<string>("");

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (inputRegex) {
				const newValue = e.target.value;
				// Allow empty string or test against regex
				if (newValue === "" || inputRegex.test(newValue)) {
					onChange?.(e);
					// Clear validation error when typing
					if (validationError) setValidationError("");
				} else {
					// Prevent the change by stopping the event
					e.preventDefault();
				}
			} else {
				onChange?.(e);
				// Clear validation error when typing
				if (validationError) setValidationError("");
			}
		};

		const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (inputRegex) {
				const char = e.key;
				const currentValue = (e.target as HTMLInputElement).value;
				const newValue = currentValue + char;
				
				// Don't validate control keys
				if (char.length === 1 && !inputRegex.test(newValue)) {
					e.preventDefault();
				}
			}
		};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		if (inputRegex || maxLength) {
			e.preventDefault();
			
			const pastedText = e.clipboardData.getData('text');
			const input = e.target as HTMLInputElement;
			const currentValue = input.value;
			const selectionStart = input.selectionStart || 0;
			const selectionEnd = input.selectionEnd || 0;
			
			// Filter pasted text to only include valid characters (if regex provided)
			let filteredText = pastedText;
			if (inputRegex) {
				filteredText = pastedText.split('').filter(char => {
					const testValue = currentValue.substring(0, selectionStart) + char;
					return inputRegex.test(testValue);
				}).join('');
			}
			
			// Calculate the new value with filtered text
			let newValue = 
				currentValue.substring(0, selectionStart) + 
				filteredText + 
				currentValue.substring(selectionEnd);
			
			// Trim to maxLength if needed
			if (maxLength && newValue.length > maxLength) {
				const excessLength = newValue.length - maxLength;
				filteredText = filteredText.substring(0, filteredText.length - excessLength);
				newValue = 
					currentValue.substring(0, selectionStart) + 
					filteredText + 
					currentValue.substring(selectionEnd);
			}
			
			// Manually update the input value
			input.value = newValue;
			
			// Set cursor position after the pasted text
			const newCursorPosition = selectionStart + filteredText.length;
			input.setSelectionRange(newCursorPosition, newCursorPosition);
			
			// Trigger onChange event manually
			const changeEvent = new Event('change', { bubbles: true });
			input.dispatchEvent(changeEvent);
			
			// Call onChange handler if provided
			if (onChange) {
				onChange({
					target: input,
					currentTarget: input,
				} as React.ChangeEvent<HTMLInputElement>);
			}
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
		if (inputRegex || maxLength) {
			e.preventDefault();
			
			const droppedText = e.dataTransfer.getData('text');
			const input = e.target as HTMLInputElement;
			const currentValue = input.value;
			const selectionStart = input.selectionStart || 0;
			const selectionEnd = input.selectionEnd || 0;
			
			// Filter dropped text to only include valid characters (if regex provided)
			let filteredText = droppedText;
			if (inputRegex) {
				filteredText = droppedText.split('').filter(char => {
					const testValue = currentValue.substring(0, selectionStart) + char;
					return inputRegex.test(testValue);
				}).join('');
			}
			
			// Calculate the new value with filtered text
			let newValue = 
				currentValue.substring(0, selectionStart) + 
				filteredText + 
				currentValue.substring(selectionEnd);
			
			// Trim to maxLength if needed
			if (maxLength && newValue.length > maxLength) {
				const excessLength = newValue.length - maxLength;
				filteredText = filteredText.substring(0, filteredText.length - excessLength);
				newValue = 
					currentValue.substring(0, selectionStart) + 
					filteredText + 
					currentValue.substring(selectionEnd);
			}
			
			// Manually update the input value
			input.value = newValue;
			
			// Set cursor position after the dropped text
			const newCursorPosition = selectionStart + filteredText.length;
			input.setSelectionRange(newCursorPosition, newCursorPosition);
			
			// Trigger onChange event manually
			const changeEvent = new Event('change', { bubbles: true });
			input.dispatchEvent(changeEvent);
			
			// Call onChange handler if provided
			if (onChange) {
				onChange({
					target: input,
					currentTarget: input,
				} as React.ChangeEvent<HTMLInputElement>);
			}
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		
		// Check minLength validation only if there is input
		if (minLength && inputValue.length > 0 && inputValue.length < minLength) {
			setValidationError(minLengthErrorMessage || `${label} must be at least ${minLength} characters`);
		} else {
			setValidationError("");
		}
		
		onBlur?.(e);
	};

	const displayError = validationError || error;

		return (
			<div className={containerClassName}>
				<div className={labelContainerClassName}>
					<label className={labelClassName}>
						{label}
					</label>
					{showHelpIcon && (
						<CircleHelp className={helpIconClassName} aria-label={tooltipText} />
					)}
				</div>
				<div className={cn("relative", inputWrapperClassName)}>
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
					onPaste={handlePaste}					onDrop={handleDrop}					onFocus={onFocus}
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
				</div>
				{displayError && <p className={errorClassName}>{displayError}</p>}
			</div>
		);
	}
);

StandardTextInput.displayName = "StandardTextInput";
