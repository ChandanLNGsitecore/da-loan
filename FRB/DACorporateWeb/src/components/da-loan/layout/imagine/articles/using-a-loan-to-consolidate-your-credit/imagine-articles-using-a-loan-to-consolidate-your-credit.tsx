import Image from "next/image";
import Link from "next/link";
import { PromoCard } from "components/da-loan/blocks/promo-card";

const supportingTips = [
  "Understanding Debt Consolidation Benefits",
  "How to Choose the Right Consolidation Loan",
  "5 Steps to Successfully Consolidate Your Debt",
  "Managing Multiple Credit Accounts",
  "Improving Your Credit Score Through Consolidation",
  "Checklist: Is Debt Consolidation Right for You?",
];

export default function UsingALoanToConsolidateYourCreditArticle() {
  return (
    <main className="bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16">
        <Link
          href="/imagine"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-secondary-teal mb-6"
        >
          <span aria-hidden="true">←</span>
          Back to Imagine
        </Link>

        <article className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-wide text-secondary-teal font-semibold mb-4">
              Imagine
            </p>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4 text-primary"
            >
              Using a loan to Consolidate Your Credit
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-3xl" style={{ color: "var(--color-text-primary)" }}>
              Simplify your financial life by combining multiple debts into one manageable loan. Debt consolidation can help you regain control of your finances and work towards a debt-free future.
            </p>

            <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg mb-8">
              <Image
                src="/images/make-a-plan/financial-pressure.jpg"
                alt="Financial planning and debt consolidation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 60vw"
                priority
              />
            </div>

            <div className="space-y-6 text-base md:text-lg leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
              <p>
                Managing multiple credit accounts, store cards, and loans can be overwhelming. Each account comes with its own payment date, interest rate, and minimum payment requirement. This complexity can make it difficult to stay on top of your finances and can lead to missed payments or financial stress.
              </p>
              <p>
                Debt consolidation offers a practical solution by combining all your debts into a single loan. Instead of juggling multiple payments each month, you make one payment to one lender. This simplification alone can reduce stress and help you better manage your financial obligations.
              </p>
              <p>
                One of the key advantages of a consolidation loan is the potential for a fixed interest rate. Unlike credit cards or variable-rate loans, a fixed-rate consolidation loan means your monthly payment stays the same throughout the loan term. This predictability makes budgeting easier and gives you peace of mind.
              </p>
              <p>
                When you consolidate your debts, you may also benefit from lower overall interest costs, especially if you&apos;re currently paying high interest rates on credit cards or store accounts. By securing a loan with a lower interest rate, you can reduce the total amount you pay over time.
              </p>
              <p>
                Another significant benefit is the reduction of service fees. Multiple accounts often mean multiple monthly service fees. With a single consolidation loan, you typically pay one set of fees, which can add up to meaningful savings over the course of a year.
              </p>
              <p>
                Consolidation loans can also improve your cash flow by allowing you to spread payments over a longer period. While this means you&apos;ll be paying interest for a longer time, it can provide the breathing room you need to manage your monthly expenses more effectively.
              </p>
              <p>
                It&apos;s important to note that debt consolidation isn&apos;t a magic solution. It requires discipline to avoid accumulating new debt while paying off your consolidation loan. The goal is to use the loan as a tool to get your finances under control, not as a way to free up credit for more spending.
              </p>
              <p>
                Before deciding on debt consolidation, take time to assess your financial situation. List all your current debts, their interest rates, and minimum payments. Calculate your total monthly debt payments and compare them to what a consolidation loan would cost.
              </p>
              <p>
                Consider your credit score as well. A good credit score can help you secure a consolidation loan with favorable terms. If your credit score needs improvement, you might want to work on that first, or explore consolidation options designed for those with less-than-perfect credit.
              </p>
              <p>
                When shopping for a consolidation loan, compare offers from multiple lenders. Look at the interest rate, loan term, monthly payment amount, and any fees associated with the loan. Make sure the consolidation loan actually improves your financial situation rather than just moving your debt around.
              </p>
              <p>
                If you do decide to consolidate your debts, commit to a plan. Use any money you save on monthly payments to either pay down the loan faster or build an emergency fund. Having savings can prevent you from needing to take on new debt when unexpected expenses arise.
              </p>
              <p>
                Remember, debt consolidation is a tool to help you manage your finances better. It works best when combined with good financial habits like budgeting, tracking expenses, and avoiding unnecessary debt. With the right approach, consolidation can be a stepping stone to financial freedom.
              </p>
            </div>
          </div>

          <aside className="lg:pl-8 space-y-10">
            <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-heading font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>
                You might also like
              </h3>
              <ul className="space-y-3 text-sm md:text-base" style={{ color: "var(--color-text-primary)" }}>
                {supportingTips.map((tip) => (
                  <li key={tip} className="flex gap-2 items-start">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary-teal shrink-0" aria-hidden="true" />
                    <Link
                      href="#"
                      className="font-medium transition-colors text-secondary-teal hover:text-secondary-teal-dark"
                    >
                      {tip}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <PromoCard
              badgeText="Find out how well you score!"
              description="Pulse is a free financial wellness tool that allows you to check and improve your credit rating."
              imageSrc="/images/hero-image-articles.webp"
              imageAlt="Pulse logo"
              imageWidth={60}
              imageHeight={60}
              title="Pulse"
              subtitle="A DirectAxis tool"
              linkHref="#"
              linkText="Register now"
            />
          </aside>
        </article>
      </div>
    </main>
  );
}
