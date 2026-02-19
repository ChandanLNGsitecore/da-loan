"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface FinancialCard {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
}

export interface FinancialCardCarouselProps {
  cards?: FinancialCard[];
  initialActiveId?: string;
}

const defaultCards: FinancialCard[] = [
  {
    id: "personal-loans",
    title: "Personal loans",
    description:
      "Apply for a personal loan of up to R350 000.00 with a fixed interest rate.",
    imageUrl: "/images/banners/personal-loans.png",
    imageAlt: "Person with water bottle",
    href: "/personal-loans",
  },
  {
    id: "debt-consolidation",
    title: "Debt consolidation",
    description: "Combine multiple debts into a single manageable repayment plan.",
    imageUrl: "/images/banners/consolidate.png",
    imageAlt: "Person on pool float",
    href: "/consolidation-loans",
  },
  {
    id: "credit-score",
    title: "Credit score",
    description: "Check your credit score for free and improve your financial health.",
    imageUrl: "/images/banners/pulse.png",
    imageAlt: "Person holding phone with coffee",
    href: "/pulse",
  },
];

export function FinancialCardCarousel({
  cards = defaultCards,
  initialActiveId,
}: Readonly<FinancialCardCarouselProps>) {
  const initialIndex = Math.max(
    0,
    cards.findIndex((card) => card.id === initialActiveId)
  );
  const [activeIndex, setActiveIndex] = React.useState(
    Number.isFinite(initialIndex) ? initialIndex : 0
  );

  return (
    <section className="w-full px-4 py-10 md:px-10 mx-auto max-w-[1500px]">
      <div
        className="group/carousel flex flex-col gap-6 md:flex-row md:gap-5 md:justify-center"
      >
        {cards.map((card, index) => {
          const isActive = index === activeIndex;

          return (
            <Link
              key={card.id}
              href={card.href}
              aria-label={`${card.title} details`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className="group/card relative min-h-[280px] w-full overflow-hidden rounded-3xl text-left outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-white/80 md:min-h-[380px] md:transition-[max-width] md:duration-500 md:ease-out"
              style={{ maxWidth: isActive ? "655px" : "400px" }}
            >
              <Image
                src={card.imageUrl}
                alt={card.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                priority={index === 0}
                className="object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10" />

              <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-7">
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                <div className="relative">
                  <h3 className="text-2xl font-semibold text-white md:text-3xl">
                    {card.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm text-white/90 transition-[max-height,opacity,transform] duration-500 ease-out md:text-base ${
                      isActive
                        ? "max-h-32 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 translate-y-2"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </div>

              <span
                aria-hidden="true"
                className={`absolute left-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-all duration-300 ${
                  isActive
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 group-hover/card:opacity-100 group-hover/card:scale-100 group-focus-visible/card:opacity-100 group-focus-visible/card:scale-100"
                }`}
              >
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
