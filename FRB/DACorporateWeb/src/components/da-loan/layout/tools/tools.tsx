import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ToolsPage() {
  return (
    <main className="bg-white">
      <section className="w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16 lg:py-20">
        <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-secondary-teal font-semibold mb-4">
          Tools
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6 leading-tight">
          Financial tools to help you make better decisions
        </h1>
        <p
          className="text-base md:text-lg leading-relaxed max-w-4xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          Access our suite of free financial tools designed to help you
          understand your options, plan your finances, and make informed
          decisions about loans and credit.
        </p>
      </section>

      <section className="w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16 space-y-16 md:space-y-32">
        {/* Loan Calculators Section */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start mb-8 lg:mb-0">
            <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-3">
                Loan Calculators
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 lg:mb-8">
                Calculate your monthly repayments and explore how different loan amounts and terms can fit your budget and financial goals.
              </p>
            </div>
            <div className="hidden lg:block" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <Link href="/tools/loan-calculator" className="group relative overflow-hidden rounded-2xl aspect-4/3 lg:aspect-4/3">
              <div className="relative w-full h-full">
                <Image
                  src="/images/carousel-one.png"
                  alt="Loan Repayment Calculator"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm p-5 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-white shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">Loan Repayment Calculator</h3>
                      <p className="text-sm text-gray-200 leading-relaxed">
                        Calculate your monthly repayments and see how different loan amounts and terms affect your budget.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/tools/consolidation-calculator" className="group relative overflow-hidden rounded-2xl aspect-4/3 lg:aspect-4/3 lg:-mt-8">
              <div className="relative w-full h-full">
                <Image
                  src="/images/carousel-two.png"
                  alt="Consolidation Loan Calculator"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-1/3 left-4 max-w-[85%] bg-gray-900/80 backdrop-blur-sm p-5 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-white shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">Consolidation Loan Calculator</h3>
                      <p className="text-sm text-gray-200 leading-relaxed">
                        See how consolidating your debts into one loan could simplify your finances and reduce your monthly payments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Financial Wellness Tool Section */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start mb-8 lg:mb-0">
            <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-3">
                Financial Wellness Tools
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 lg:mb-8">
                Take control of your financial health with tools designed to help you understand your credit, set goals, and make informed decisions.
              </p>
            </div>
            <div className="hidden lg:block" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <Link href="/pulse" className="group relative overflow-hidden rounded-2xl aspect-4/3 lg:aspect-4/3">
              <div className="relative w-full h-full">
                <Image
                  src="/images/carousel-three.png"
                  alt="DirectAxis Pulse"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm p-5 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-white shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">DirectAxis Pulse</h3>
                      <p className="text-sm text-gray-200 leading-relaxed">
                        Check your credit rating for free and get personalized insights to improve your financial health.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="#" className="group relative overflow-hidden rounded-2xl aspect-4/3 lg:aspect-4/3 lg:-mt-8">
              <div className="relative w-full h-full">
                <Image
                  src="/images/make-a-plan/financial-pressure.jpg"
                  alt="Budgeting and goal setting"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-1/3 left-4 max-w-[85%] bg-gray-900/80 backdrop-blur-sm p-5 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-white shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">Budgeting and goal setting</h3>
                      <p className="text-sm text-gray-200 leading-relaxed">
                        Set financial goals and manage your finances like a pro with our comprehensive budgeting tools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
