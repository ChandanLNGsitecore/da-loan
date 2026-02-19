"use client";

import { Slider } from "components/da-loan/ui-premetive/slider";
import { cn } from "lib/utils";

interface LoanSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  unitPosition?: "prefix" | "suffix";
  formatValue?: (value: number) => string;
  onChange: (value: number) => void;
  className?: string;
}

export function LoanSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  unitPosition = "prefix",
  formatValue,
  onChange,
  className,
}: Readonly<LoanSliderProps>) {
  const displayValue = formatValue
    ? formatValue(value)
    : value.toLocaleString("en-ZA");

  const formattedValue =
    unitPosition === "prefix"
      ? `${unit}${displayValue}`
      : `${displayValue}${unit}`;

  const displayMin = formatValue ? formatValue(min) : min.toLocaleString("en-ZA");
  const displayMax = formatValue ? formatValue(max) : max.toLocaleString("en-ZA");
  const formattedMin =
    unitPosition === "prefix" ? `${unit}${displayMin}` : `${displayMin}${unit}`;
  const formattedMax =
    unitPosition === "prefix" ? `${unit}${displayMax}` : `${displayMax}${unit}`;

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">
          {label}
        </p>
        <p className="text-4xl font-bold text-gray-900">
          {formattedValue}
        </p>
      </div>

      <div className="space-y-2">
        <Slider
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={(values) => onChange(values[0])}
          className="w-full"
        />

        <div className="flex justify-between text-sm text-gray-600">
          <span>{formattedMin}</span>
          <span>{formattedMax}</span>
        </div>
      </div>
    </div>
  );
}