import * as React from "react";
import { cn } from "lib/utils";
import { Slider } from "components/da-loan/ui-premetive/slider";

interface RangeSliderProps {
	name: string;
	label: React.ReactNode;
	value: number;
	placeholder?: string;
	min: number;
	max: number;
	step: number;
	minLength?: number;
	maxLength?: number;
	required?: boolean;
	onChange: (value: number) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	error?: string;
	containerClassName?: string;
	labelContainerClassName?: string;
	labelClassName?: string;
	inputClassName?: string;
	sliderContainerClassName?: string;
	sliderClassName?: string;
	minMaxLabelsClassName?: string;
	prefix?: string;
	formatDisplay?: (value: number) => string;
	parseInput?: (input: string) => number;
	roundValue?: (value: number) => number;
	showMinMaxLabels?: boolean;
	minLabel?: string;
	maxLabel?: string;
}

export const RangeSlider = ({
	name,
	label,
	value,
	placeholder,
	min,
	max,
	step,
	minLength,
	maxLength,
	required = false,
	onChange,
	onFocus,
	error,
	containerClassName = "space-y-2",
	labelContainerClassName,
	labelClassName,
	inputClassName,
	sliderContainerClassName = "space-y-4",
	sliderClassName,
	minMaxLabelsClassName = "flex justify-between text-xs text-gray-600",
	prefix,
	formatDisplay,
	parseInput,
	roundValue,
	showMinMaxLabels = true,
	minLabel,
	maxLabel,
}: RangeSliderProps) => {
	const [inputValue, setInputValue] = React.useState("");
	const [isFocused, setIsFocused] = React.useState(false);

	const displayValue = React.useMemo(() => {
		if (isFocused) {
			// When focused, show the raw input value
			return inputValue;
		}
		// When not focused, show formatted value
		if (formatDisplay && value) return formatDisplay(value);
		return value ? value.toString() : "";
	}, [isFocused, inputValue, value, formatDisplay]);

	const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(true);
		setInputValue(value ? value.toString() : "");
		e.target.select();
		onFocus?.(e);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value.replaceAll(/\D/g, "");
		setInputValue(rawValue);
	};

	const handleInputBlur = () => {
		setIsFocused(false);
		
		if (inputValue) {
			let parsedValue = parseInput ? parseInput(inputValue) : Number.parseInt(inputValue, 10);
			
			// Apply rounding if provided
			if (roundValue) {
				parsedValue = roundValue(parsedValue);
			}
			
			// Clamp to min/max (set to nearest valid value)
			const clampedValue = Math.min(Math.max(parsedValue, min), max);
			onChange(clampedValue);
		} else {
			// If input is empty, set to current value or minimum value
			onChange(value || min);
		}
		setInputValue("");
	};

	const handleSliderChange = (newValue: number[]) => {
		onChange(newValue[0]);
		setInputValue("");
		setIsFocused(false);
	};

	const renderInput = () => (
		<div className="relative">
			{prefix && (
				<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">
					{prefix}
				</span>
			)}
			<input
				id={name}
				name={name}
				type="text"
				inputMode="numeric"
				value={displayValue}
				placeholder={placeholder}
				minLength={minLength}
				maxLength={maxLength}
				required={required}
				onFocus={handleInputFocus}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
				className={cn(
					"flex h-12 w-full rounded-md border border-input-border-default bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					prefix && "pl-8",
					inputClassName
				)}
			/>
		</div>
	);

	return (
		<div className={containerClassName}>
			{labelContainerClassName ? (
				<div className={labelContainerClassName}>
					<label htmlFor={name} className={cn("text-sm text-gray-800", labelClassName)}>
						{label}
					</label>
					{renderInput()}
				</div>
			) : (
				<>
					<label htmlFor={name} className={cn("text-sm text-gray-800", labelClassName)}>
						{label}
					</label>
					{renderInput()}
				</>
			)}
			<div className={sliderContainerClassName}>
				<Slider
					value={[value ?? min]}
					onValueChange={handleSliderChange}
					min={min}
					max={max}
					step={step}
					className={cn("w-full", sliderClassName)}
				/>
				{showMinMaxLabels && (
					<div className={minMaxLabelsClassName}>
						<span>{minLabel ?? min}</span>
						<span>{maxLabel ?? max}</span>
					</div>
				)}
			</div>
			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	);
};
