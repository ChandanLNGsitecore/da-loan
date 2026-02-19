import { ConsolidationCalculator } from "components/da-loan/blocks/consolidation-calculator";
import { ConsolidationBenefits } from "components/da-loan/blocks/consolidation-benefits";
import { FAQAccordion } from "components/da-loan/blocks/faq-accordion";
import { LoanProductsBlock, type LoanProduct } from "components/da-loan/blocks/loan-products-block";
import { Button } from "components/da-loan/ui-premetive/button";
import Link from "next/link";

const relatedProducts: LoanProduct[] = [
	{
		id: "personal-loan",
		title: "Personal Loan",
		description: "Flexible personal loans for any purpose, with quick online approval and fixed repayments.",
		imageUrl: "/images/carousel-one.png",
		link: "/personal-loans",
	},
	{
		id: "pulse",
		title: "Pulse",
		description: "Free credit score tracking and financial wellness insights to help you make better financial decisions.",
		imageUrl: "/images/carousel-three.png",
		link: "/pulse",
	},
];

const criticalFAQs = [
	{
		question: "Why should I use DirectAxis to consolidate my accounts?",
		answer: (
			<>
				<p className="mb-4">
					DirectAxis has been helping South Africans consolidate their debts for over 20 years. We offer:
				</p>
				<ul className="list-disc pl-6 space-y-2">
					<li>A single service fee instead of multiple monthly fees</li>
					<li>Fixed monthly payments that never increase</li>
					<li>Dedicated credit consolidation teams to help settle your accounts</li>
					<li>Potential for additional cash if you qualify for more than your total debt</li>
					<li>A fixed loan term so you know exactly when you&apos;ll be debt-free</li>
				</ul>
			</>
		),
	},
	{
		question: "How will a consolidation loan improve my cash flow?",
		answer: (
			<>
				<p className="mb-4">
					By combining multiple debts into one loan, you can:
				</p>
				<ul className="list-disc pl-6 space-y-2">
					<li>Reduce your total monthly payments (depending on your current interest rates)</li>
					<li>Eliminate multiple service fees and replace them with one</li>
					<li>Simplify your finances with a single payment date to remember</li>
					<li>Potentially secure a lower interest rate than your current debts</li>
				</ul>
			</>
		),
	},
	{
		question: "When should I consider consolidating my credit?",
		answer: (
			<p>
				Consider consolidation if you&apos;re struggling to manage multiple payments, paying high interest rates on credit cards or store accounts, or want to simplify your finances. It&apos;s also a good option if you&apos;re looking to improve your cash flow and have a good credit record that could qualify you for better rates.
			</p>
		),
	},
	{
		question: "How will DirectAxis settle my credit?",
		answer: (
			<p>
				Once your consolidation loan is approved, our dedicated credit consolidation team will work directly with your creditors to settle your accounts. You don&apos;t need to manage this process yourself—we handle all the settlements on your behalf, ensuring a smooth transition to your single monthly payment.
			</p>
		),
	},
	{
		question: "Does consolidating my credit affect my credit score?",
		answer: (
			<>
				<p className="mb-4">
					Consolidation can actually help improve your credit score over time by:
				</p>
				<ul className="list-disc pl-6 space-y-2">
					<li>Reducing your credit utilization ratio</li>
					<li>Demonstrating consistent, on-time payments</li>
					<li>Closing multiple accounts and simplifying your credit profile</li>
				</ul>
				<p className="mt-4">
					You can track your credit score improvements using DirectAxis Pulse, our free financial wellness tool.
				</p>
			</>
		),
	},
	{
		question: "What type of accounts can I consolidate?",
		answer: (
			<p>
				You can consolidate various types of credit accounts including credit cards, retail store accounts, personal loans, and other unsecured debts. Our team will help you determine which accounts are eligible for consolidation when you apply.
			</p>
		),
	},
];

const additionalFAQs = [
	{
		question: "What do I need to apply for a consolidation loan?",
		answer: (
			<>
				<p className="mb-4">To apply, you&apos;ll need:</p>
				<ul className="list-disc pl-6 space-y-2">
					<li>A good credit record</li>
					<li>A regular monthly income of at least R5 000.00</li>
					<li>Your bank account details (where your salary is paid)</li>
					<li>Recent payslips (up to 3 months)</li>
					<li>A clear copy of your South African ID</li>
					<li>A recent document confirming your residential address</li>
				</ul>
			</>
		),
	},
	{
		question: "What other benefits can I expect with consolidating my credit?",
		answer: (
			<p>
				In addition to simplified payments and improved cash flow, consolidation loans offer fixed interest rates, predictable monthly payments, and the peace of mind that comes with a clear path to becoming debt-free. You&apos;ll also have access to DirectAxis&apos;s customer support team throughout your loan term.
			</p>
		),
	},
];

const loanRequirements = [
	"A good credit record",
	"A regular monthly income of at least R5 000.00",
	"The details of your bank account into which your salary is paid",
];

const documentChecklist = [
	"A clear copy of your South African ID",
	"A recent document confirming your residential address",
	"Up to 3 months' recent bank-generated PDF statements or payslips as proof of income",
];

export default function ConsolidationLoansPage() {
	return (
    <main className="bg-white">
      {/* Hero Section - Simplified with single CTA */}
      <section className="w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16 lg:py-20">
        <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-secondary-teal font-semibold mb-4">
          Consolidation Loans
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6 leading-tight">
          Simplify your finances with one monthly payment
        </h1>
        <p
          className="text-base md:text-lg leading-relaxed max-w-4xl mb-8"
          style={{ color: "var(--color-text-primary)" }}
        >
          Combine all your debts into a single consolidation loan and enjoy
          lower monthly payments, fixed interest rates, and the peace of mind
          that comes with simplified finances.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="h-12 px-8 uppercase font-semibold rounded-md"
            style={{
              backgroundColor: "var(--color-secondary-teal)",
              color: "white",
            }}
          >
            <Link href="/loan-ui-small/">Apply Now</Link>
          </Button>
        </div>
      </section>

      {/* Benefits Section with Icons */}
      <ConsolidationBenefits />

      {/* How It Works - Simplified intro with icons */}
      <section className="w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <h2
          className="text-2xl md:text-3xl font-heading font-bold mb-8"
          style={{ color: "var(--color-text-primary)" }}
        >
          How consolidation works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-full bg-secondary-teal/20 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-secondary-teal">1</span>
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Apply online
            </h3>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-text-primary)" }}
            >
              Complete our simple online application in minutes. We&apos;ll
              assess your eligibility and provide a loan offer.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-full bg-secondary-teal/20 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-secondary-teal">2</span>
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              We settle your debts
            </h3>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-text-primary)" }}
            >
              Our team works directly with your creditors to settle all your
              accounts on your behalf.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-full bg-secondary-teal/20 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-secondary-teal">3</span>
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              One simple payment
            </h3>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-text-primary)" }}
            >
              Make one fixed monthly payment instead of juggling multiple
              accounts and payment dates.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator in Dedicated Section */}
      <ConsolidationCalculator />

      {/* FAQ Section - Streamlined with critical questions visible */}
      <section className="w-full max-w-[1100px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <h2
          className="text-2xl md:text-3xl font-heading font-bold mb-8"
          style={{ color: "var(--color-text-primary)" }}
        >
          Frequently Asked Questions
        </h2>
        <FAQAccordion items={criticalFAQs} defaultExpanded={[0]} />

        {/* Additional FAQs - Collapsed by default */}
        {additionalFAQs.length > 0 && (
          <div className="mt-8">
            <FAQAccordion items={additionalFAQs} />
          </div>
        )}
      </section>

      {/* Application Requirements */}
      <section className="w-full max-w-[1100px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2
              className="text-2xl font-heading font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              What you need to apply
            </h2>
            <ul
              className="space-y-3 text-base md:text-lg leading-relaxed list-disc pl-6"
              style={{ color: "var(--color-text-primary)" }}
            >
              {loanRequirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2
              className="text-2xl font-heading font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Documents you&apos;ll need
            </h2>
            <ul
              className="space-y-3 text-base md:text-lg leading-relaxed list-disc pl-6"
              style={{ color: "var(--color-text-primary)" }}
            >
              {documentChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p
              className="mt-6 text-base md:text-lg leading-relaxed"
              style={{ color: "var(--color-text-primary)" }}
            >
              We&apos;ve made applying for consolidation loans quick and
              streamlined. You can easily upload any documents via our online
              application.
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <LoanProductsBlock
        heading="Explore related products"
        description="Discover other DirectAxis products that can help you achieve your financial goals."
        products={relatedProducts}
      />
    </main>
  );
}
