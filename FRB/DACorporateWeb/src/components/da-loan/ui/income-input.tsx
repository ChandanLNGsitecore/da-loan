import * as React from "react";
import { cn } from "lib/utils";
import { CircleHelp } from "lucide-react";

interface IncomeInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "type"> {
	name: string;
	label: React.ReactNode;
	placeholder?: string;
	value?: number | string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	error?: string;
	required?: boolean;
	type?: "text" | "number" | "email" | "tel" | "password";
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
	notificationText?: React.ReactNode;
}

export const IncomeInput = React.forwardRef<HTMLInputElement, IncomeInputProps>(
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
			type = "text",
			containerClassName = "space-y-2",
			labelContainerClassName = "flex items-center gap-2",
			labelClassName = "text-sm text-gray-800",
			inputWrapperClassName = "relative",
			inputClassName = "w-full",
			errorClassName = "text-sm text-red-500",
			showHelpIcon = false,
			helpIconClassName = "w-4 h-4 text-gray-400",
			tooltipText,
			prefix,
			prefixClassName = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-900",
			notificationText,
			...props
		},
		ref
	) => {
		const formatSAAmount = (numString: string) => {
			// Remove non-digits and format with space as thousands separator
			const cleaned = numString.replace(/\D/g, "");
			if (!cleaned) return "";
			return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		};

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const rawValue = e.target.value.replace(/\D/g, "");
			// Remove leading zeros by converting to number and back to string
			const numValue = rawValue ? String(Number(rawValue)) : "";
			// Create a new event with the numeric value (unformatted)
			const newEvent = {
				...e,
				target: {
					...e.target,
					value: numValue,
				},
			} as React.ChangeEvent<HTMLInputElement>;
			onChange?.(newEvent);
		};

		const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
			const char = e.key;
			
			// Only allow digits
			if (char.length === 1 && !/\d/.test(char)) {
				e.preventDefault();
			}
		};

		return (
			<div className={containerClassName}>
				<div className={labelContainerClassName}>
					<label className={labelClassName}>{label}</label>
					{showHelpIcon && (
						<CircleHelp className={helpIconClassName} aria-label={tooltipText} />
					)}
				</div>
				<div className={inputWrapperClassName}>
					{prefix && <span className={prefixClassName}>{prefix}</span>}
					<input
						ref={ref}
						id={name}
						name={name}
						type={type}
						inputMode="numeric"
						value={typeof value === "number" || typeof value === "string" ? formatSAAmount(String(value)) : ""}
						placeholder={placeholder}
						onChange={handleChange}
						onKeyPress={handleKeyPress}
						onFocus={onFocus}
						onBlur={onBlur}
						required={required}
						className={cn(
							"flex h-12 w-full rounded-md border border-input-border-default bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
							prefix && "pl-8",
							inputClassName
						)}
						{...props}
					/>
				</div>
				{error && <p className={errorClassName}>{error}</p>}
				{notificationText &&
					(typeof notificationText === "string" ?
						<span className="text-xs text-gray-500 leading-snug" dangerouslySetInnerHTML={{ __html: notificationText }} />
						: <span className="text-xs text-gray-500 leading-snug">{notificationText}</span>
					)
				}
			</div>
		);
	}
);

IncomeInput.displayName = "IncomeInput";
