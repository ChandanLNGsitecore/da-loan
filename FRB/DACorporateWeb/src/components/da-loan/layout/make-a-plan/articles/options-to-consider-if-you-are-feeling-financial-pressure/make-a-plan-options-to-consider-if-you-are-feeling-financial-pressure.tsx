import { PromoCard } from "components/da-loan/blocks/promo-card";
import Image from "next/image";
import Link from "next/link";

const supportingTips = [
  "Financial Tips to Teach Your Older Kids",
  "How to Talk to your Kids About Money",
  "5 Tips on How to Teach Your Kids Practical Money Skills",
  "Money Lessons Your First Baby Can Teach You",
  "Financially Secure Your Child's Future",
  "Checklist: Spending too much on your kids?",
];

export default function OptionsToConsiderIfYouAreFeelingFinancialPressureArticle() {
  return (
    <main className="bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16">
        <Link
          href="/make-a-plan"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-secondary-teal mb-6"
        >
          <span aria-hidden="true">←</span>
          Back to Make a Plan
        </Link>

        <article className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-wide text-secondary-teal font-semibold mb-4">
              Make a Plan
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4 text-primary">
              Options to Consider if You&apos;re Feeling Financial Pressure
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-3xl"
            >
              Despite some positive signs, particularly a prolonged period
              without load-shedding, many South Africans still feel the
              cumulative effects of high interest rates, inflation and an
              underperforming economy.
            </p>

            <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg mb-8">
              <Image
                src="/images/make-a-plan/financial-pressure.jpg"
                alt="Single parent planning finances with their child"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 60vw"
                priority
              />
            </div>

            <div
              className="space-y-6 text-base md:text-lg leading-relaxed"
            >
              <p>
                The repo rate has been steady for over a year but increased from
                3.5% in 2021 to 8.25%, where it remains for the moment. The repo
                rate is the rate at which the Reserve Bank lends money to
                private banks and when it increases, so does the prime lending
                rate.
              </p>
              <p>
                Inflation too has remained reasonably consistent and despite a
                recent decline is still at the upper end of the Reserve
                Bank&apos;s 3% - 6% range. This means the purchasing power of
                the money in people&apos;s bank accounts is worth 4.6% less than
                a year ago. This is an average rate so consumers may experience
                higher inflation on some goods and services, including
                essentials such as energy and some foodstuffs.
              </p>
              <p>
                Real GDP growth declined from 1.9% in 2022 to 0.6% in 2023. The
                constrained economy makes it difficult for businesses and
                companies to increase salaries. The result is that take-home pay
                is not keeping pace with inflation.
              </p>
              <p>
                All this has contributed to many of us having to tighten our
                belts.
              </p>
              <p>
                There are various strategies people can adopt to make it through
                the month.
              </p>
              <p>
                Perhaps the simplest is setting a budget. Understanding where
                your money is going each month and cutting out any unnecessary
                expenditure is a sensible first step towards better managing
                your money.
              </p>
              <p>
                If you can, try to focus on paying off debts that attract the
                highest interest. There are plenty of free tools such as
                www.directaxis.co.za/pulse that you can use to check your credit
                rating and which also provide a summary of your credit
                agreements, such as bonds, vehicle finance, cellphone contracts
                and store accounts.
              </p>
              <p>
                If you&apos;re still struggling to meet your monthly
                obligations, speak to your creditors. It may sound daunting, but
                reaching some arrangement is better than not paying at all. If
                you miss payments or stop paying it&apos;ll negatively affect
                your credit score, which in turn can limit your ability to
                borrow money in future or mean you pay a higher rate of
                interest.
              </p>
              <p>
                Debt consolidation is another option. While it isn&apos;t a
                silver bullet and may not be the best solution for everyone, it
                can be a useful tool to get your financial affairs under
                control, particularly if you&apos;re feeling stressed about
                dealing with a complicated financial situation.
              </p>
              <p>
                As the name suggests, debt consolidation involves taking out one
                loan to pay off a range of debts such as loans, credit cards or
                store cards.
              </p>
              <p>
                Critics argue that the only real advantage of doing this is that
                rather than having a whole lot of smaller creditors to manage,
                you have one large one.
              </p>
              <p>
                While this is true there are some other potential benefits.
                Consolidation loans usually have fixed interest rates so
                it&apos;s easier to budget and manage your financial affairs.
                Having only one loan to repay also means you&apos;re less likely
                to accidentally miss a payment.
              </p>
              <p>
                It can also save money on service fees and credit-life-cover
                costs. Depending on how it&apos;s structured the consolidation
                loan could also improve your cash flow by allowing smaller
                payments over a longer period. Bear in mind, though, that you
                will be paying interest over a longer term too.
              </p>
              <p>
                If you do find yourself in the fortunate situation where the
                loan frees up some additional cash each month, either use the
                money to repay the loan faster or put it into a savings or
                investment account.
              </p>
              <p>
                Another, more drastic alternative for people struggling to repay
                debt is debt counselling or debt review.
              </p>
              <p>
                This is a voluntary, formal process in terms of the National
                Credit Act for over-indebted consumers. It&apos;s important to
                understand that while under debt counselling consumers cannot
                apply for any further credit until they receive their clearance
                certificates.
              </p>
              <p>
                Anyone considering debt counselling should also take care to
                deal with a reputable debt counsellor, who&apos;s registered
                with the National Credit Regulator and make sure they fully
                understand what they are entering into.
              </p>
              <p>
                The National Credit Regulator recently published a circular
                warning about unscrupulous debt counsellors placing people under
                debt review without the consumer realising they had agreed to
                this.
              </p>
              <p>According to the circular debt counsellors have a duty to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Explain the debt review process to ensure consumers understand
                  the implications of the process and make an informed decision;
                </li>
                <li>Provide consumers with proof of the application;</li>
                <li>
                  Conduct a proper assessment of a consumer&apos;s financial
                  position before placing them under debt review; and
                </li>
                <li>
                  Keep a record of all activities relating to a consumer&apos;s
                  debt review application process.
                </li>
              </ul>
              <p>
                If you are struggling to make ends meet burying your head in the
                sand isn&apos;t a solution.
              </p>
              <p>
                Rather calmly assess your situation and do your homework as to
                which is the best solution for you. If you&apos;re still not
                sure, speak to your bank or a financial professional you trust
                to confirm your decision.
              </p>
            </div>
          </div>

          <aside className="lg:pl-8 space-y-10">
            <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3
                className="text-xl font-heading font-semibold mb-4"
                style={{ color: "var(--color-text-primary)" }}
              >
                You might also like
              </h3>
              <ul
                className="space-y-3 text-sm md:text-base"
                style={{ color: "var(--color-text-primary)" }}
              >
                {supportingTips.map((tip) => (
                  <li key={tip} className="flex gap-2 items-start">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary-teal shrink-0"
                      aria-hidden="true"
                    />
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
              badgeText="Calculate your loan repayments"
              description="Calculate your loan repayments with our loan calculator."
              imageSrc="/images/hero-image-articles.webp"
              imageAlt="Loan calculator"
              imageWidth={60}
              imageHeight={60}
              title="Loan Calculator"
              subtitle="A DirectAxis tool"
              linkHref="/tools/loan-calculator"
              linkText="Calculate now"
            />
          </aside>
        </article>
      </div>
    </main>
  );
}
