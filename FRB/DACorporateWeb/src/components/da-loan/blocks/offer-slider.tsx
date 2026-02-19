"use client";

import { Slider } from "components/da-loan/ui-premetive/slider";
import { formatCurrency } from "lib/format";
import { cn } from "lib/utils";

interface OfferSliderProps {
  requestedAmount: number;
  offerAmount: number;
  min: number;
  max: number;
  step?: number;
  onRequestedChange: (value: number) => void;
  className?: string;
  formatValue?: (value: number) => string;
  labels?: {
    requested?: string;
    offer?: string;
    max?: string;
  };
}

const DEFAULT_LABELS = {
  requested: "Requested",
  offer: "Offer",
  max: "Max",
};

export function OfferSlider({
  requestedAmount,
  offerAmount,
  min,
  max,
  step = 100,
  onRequestedChange,
  className,
  formatValue,
  labels,
}: Readonly<OfferSliderProps>) {
  const resolvedLabels = { ...DEFAULT_LABELS, ...labels };
  const range = Math.max(max - min, 1);
  const clamp = (value: number) => Math.min(max, Math.max(min, value));
  const toPercent = (value: number) => ((clamp(value) - min) / range) * 100;
  const clampRequested = (value: number) =>
    Math.min(clamp(offerAmount), clamp(value));

  const formatted = (value: number) =>
    formatValue
      ? formatValue(value)
      : formatCurrency(value, { includeSymbol: true, fractionDigits: 0 });

  const safeRequested = clampRequested(requestedAmount);
  const safeOffer = clamp(offerAmount);
  const requestedPercent = toPercent(safeRequested);
  const offerPercent = toPercent(safeOffer);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative pb-16 pt-2">
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-3 w-full -translate-y-1/2 rounded-full bg-gray-200"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-3 -translate-y-1/2 rounded-full bg-linear-to-r from-green-900 to-emerald-400"
          style={{ width: `${offerPercent}%` }}
          aria-hidden="true"
        />
        <Slider
          value={[safeRequested]}
          min={min}
          max={max}
          step={step}
          onValueChange={(values) => onRequestedChange(clampRequested(values[0]))}
          className="relative z-10 h-8 w-full"
          //trackClassName="h-3 rounded-full bg-transparent"
          //rangeClassName="bg-transparent"
          //thumbClassName="-translate-y-4 h-5 w-5 rounded-full bg-white border-2 border-gray-300 shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label={resolvedLabels.requested}
        />

        <SliderMarker
          percent={requestedPercent}
          value={formatted(safeRequested)}
          label={resolvedLabels.requested}
          highlight
        />
        <SliderMarker
          percent={offerPercent}
          value={formatted(safeOffer)}
          label={resolvedLabels.offer}
        />

        <div
          className="absolute right-0 top-1/2 h-6 -translate-y-1/2 w-px bg-gray-400"
          aria-hidden="true"
        />
        <div className="absolute right-0 top-1/2 mt-6 -translate-y-1/2 text-xs font-medium text-gray-500">
          {resolvedLabels.max}
        </div>
      </div>
    </div>
  );
}

interface SliderMarkerProps {
  percent: number;
  value: string;
  label: string;
  highlight?: boolean;
}

function SliderMarker({
  percent,
  value,
  label,
  highlight = false,
}: Readonly<SliderMarkerProps>) {
  return (
    <div
      className="absolute top-1/2 h-0 w-0 -translate-x-1/2"
      style={{ left: `${percent}%` }}
      aria-hidden="true"
    >
      <div className="absolute bottom-full flex flex-col items-center">
        <div className="h-6 w-px bg-gray-400" />
        <div className="mt-1 h-0 w-0 border-l-4 border-r-4 border-b-[6px] border-l-transparent border-r-transparent border-b-gray-500" />
      </div>
      <div className="absolute top-full mt-4 flex flex-col items-center">
        <div
          className={cn(
            "text-base font-semibold",
            highlight ? "text-gray-900" : "text-gray-700"
          )}
        >
          {value}
        </div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}
