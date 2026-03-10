"use client";

import { forwardRef } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Text } from '@sitecore-content-sdk/nextjs';

export interface RadioOption {
    label: string | { value: string };
    id: string;
    value: string;
    icon: string;
}

export interface RadioGroupWithIconProps {
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    className?: string;
}

export const RadioGroupWithIcon = forwardRef<HTMLDivElement, RadioGroupWithIconProps>(
    ({ options, value, onChange, error, className = "" }, ref) => {
        return (
            <div ref={ref} className={className}>
                <div className="grid md:grid-cols-2 gap-3">
                    {options.map(({ label, id, value: optionValue, icon: iconName }) => {
                        const isSelected = value === optionValue;
                        const Icon = ((LucideIcons as unknown as Record<string, LucideIcon>)[iconName] || LucideIcons.Circle) as LucideIcon;
                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => onChange?.(optionValue)}
                                className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${isSelected ? "border-primary bg-primary" : "border-gray-200 bg-white hover:border-primary hover:bg-secondary-blue/5"
                                    }`}
                            >
                                <div
                                    className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${isSelected ? "bg-white/10 border-white" : "bg-gray-100"
                                        }`}
                                >
                                    <Icon className={`w-6 h-6 ${isSelected ? "text-white" : "text-gray-600"}`} />
                                </div>
                                <div className="flex-1 text-left font-heading">
                                    <div className={`font-light text-base ${isSelected ? "text-white" : "text-gray-800"}`}>
                                        {typeof label === 'string' ? label : <Text field={label} />}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </div>
        );
    }
);

RadioGroupWithIcon.displayName = "RadioGroupWithIcon";
