"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
  defaultExpanded?: number[];
}

export function FAQAccordion({ items, defaultExpanded = [] }: Readonly<FAQAccordionProps>) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(
    new Set(defaultExpanded)
  );

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isExpanded = expandedItems.has(index);
        const itemKey = `faq-${index}-${item.question.slice(0, 20)}`;
        return (
          <div
            key={itemKey}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 md:p-6 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                {item.question}
              </h3>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
              )}
            </button>
            {isExpanded && (
              <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-100">
                <div className="pt-4 text-base md:text-lg leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
