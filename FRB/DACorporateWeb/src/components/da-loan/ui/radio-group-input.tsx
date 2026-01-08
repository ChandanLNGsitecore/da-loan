"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as LabelPrimitive from "@radix-ui/react-label";
import { CircleIcon } from "lucide-react";
import { cn } from "lib/utils";

export interface RadioOption {
	value: string;
	label: string;
	id: string;
}

interface RadioGroupProps {
	readonly id?: string;
	readonly label: React.ReactNode;
	readonly value: string;
	readonly onValueChange: (value: string) => void;
	readonly options: RadioOption[];
	readonly error?: string;
	readonly helperText?: string;
	readonly required?: boolean;
	readonly containerClassName?: string;
	readonly labelClassName?: string;
	readonly itemContainerClassName?: string;
	readonly itemLabelClassName?: string;
	readonly wrapperClassName?: string;
}

export const RadioGroup = ({
	id,
	label,
	value,
	onValueChange,
	options,
	error,
	helperText,
	required = false,
	containerClassName = "",
	labelClassName = "block text-sm font-medium text-gray-800 mb-2",
	itemContainerClassName = "flex items-center space-x-2",
	itemLabelClassName = "text-sm font-medium text-gray-800 cursor-pointer",
	wrapperClassName = "",
}: RadioGroupProps) => {
	return (
		<div className={wrapperClassName}>
			<LabelPrimitive.Root htmlFor={id} className={cn("flex items-center gap-2 text-sm leading-none font-medium select-none", labelClassName)}>
				{label}
			</LabelPrimitive.Root>
			<RadioGroupPrimitive.Root value={value} onValueChange={onValueChange} className={cn("grid gap-3", containerClassName)}>
				{options.map((option) => (
					<div key={option.id} className={itemContainerClassName}>
						<RadioGroupPrimitive.Item
							value={option.value}
							id={option.id}
							className={cn(
								"border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
							)}
						>
							<RadioGroupPrimitive.Indicator className="relative flex items-center justify-center">
								<CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
							</RadioGroupPrimitive.Indicator>
						</RadioGroupPrimitive.Item>
						<LabelPrimitive.Root htmlFor={option.id} className={cn("flex items-center gap-2 text-sm leading-none font-medium select-none cursor-pointer", itemLabelClassName)}>
							{option.label}
						</LabelPrimitive.Root>
					</div>
				))}
			</RadioGroupPrimitive.Root>
			{error && <p className="text-sm text-red-500 mt-1">{error}</p>}
			{helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
		</div>
	);
};
