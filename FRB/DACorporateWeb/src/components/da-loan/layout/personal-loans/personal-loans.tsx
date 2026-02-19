import { LoanProductsBlock, type LoanProduct } from "components/da-loan/blocks/loan-products-block";
import { LoanCalculator } from "components/da-loan/blocks/loan-calculator";

const personalLoanProducts: LoanProduct[] = [
	{
		id: "small-loan",
		title: "Small Loan",
		description: "Tap into a streamlined experience for smaller loan amounts with guided steps and instant status updates.",
		imageUrl: "/images/carousel-one.png",
		link: "/small-loan-ui",
	},
	{
		id: "bigger-loan",
		title: "Bigger Loan",
		description: "Access higher loan amounts with flexible repayment plans and support from our team every step of the way.",
		imageUrl: "/images/carousel-two.png",
		link: "/loan-ui",
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
	"Up to 3 months’ recent bank-generated PDF statements or payslips as proof of income",
];

export default function PersonalLoansPage() {
	return (
    <main className="bg-white">
      <section className="w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16 lg:py-20">
        <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-secondary-teal font-semibold mb-4">
          Personal Loans
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6 leading-tight">
          Personal loans that flex around your plans
        </h1>
        <p
          className="text-base md:text-lg leading-relaxed max-w-4xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          Whether you need a quick boost to manage everyday expenses or a larger
          amount to tackle life-changing upgrades, DirectAxis personal loans
          make it simple to apply online, keep repayments predictable, and move
          forward with confidence.
        </p>
      </section>

      <LoanProductsBlock
        heading="Choose the DirectAxis loan that suits you"
        description="Explore streamlined options for both small and bigger loan needs—each built on the same trusted, 100% online process."
        products={personalLoanProducts}
      />

      <section className="w-full max-w-[1100px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16 space-y-10">
        <div>
          <h2
            className="text-2xl md:text-3xl font-heading font-bold mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Why apply for a personal loan with DirectAxis?
          </h2>
          <div
            className="space-y-4 text-base md:text-lg leading-relaxed"
            style={{ color: "var(--color-text-primary)" }}
          >
            <p>A personal loan of up to R350 000.00.</p>
            <p>
              It is secure and straightforward to complete your loan application
              online.
            </p>
            <p>
              Your repayments are fixed at our current interest rate for the
              full term of your loan. They never go up – no matter how much
              interest rates do.
            </p>
            <p>Repayments are over a term from 24 months up to 6 years.</p>
            <p>
              Feedback is given quickly and your money could be in your bank
              account within 48 hours.
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <h2
              className="text-2xl font-heading font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              How to apply for a loan?
            </h2>
            <div
              className="space-y-4 text-base md:text-lg leading-relaxed"
              style={{ color: "var(--color-text-primary)" }}
            >
              <p>
                Apply via our online form, or call the DirectAxis call centre at
                086 102 0304 Monday to Sunday, 8am - 8pm.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <h2
              className="text-2xl font-heading font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              What will you need to apply for a loan?
            </h2>
            <ul
              className="space-y-2 text-base md:text-lg leading-relaxed list-disc pl-6"
              style={{ color: "var(--color-text-primary)" }}
            >
              {loanRequirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2
            className="text-2xl font-heading font-bold mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            What documents do you need when you apply for a loan?
          </h2>
          <ul
            className="space-y-2 text-base md:text-lg leading-relaxed list-disc pl-6"
            style={{ color: "var(--color-text-primary)" }}
          >
            {documentChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p
            className="mt-4 text-base md:text-lg leading-relaxed"
            style={{ color: "var(--color-text-primary)" }}
          >
            We’ve made applying for personal loans online quick and streamlined.
            It is also easy for you to upload any documents via our online
            application.
          </p>
        </div>

        <div
          className="space-y-6 text-base md:text-lg leading-relaxed"
          style={{ color: "var(--color-text-primary)" }}
        >
          <div>
            <h2 className="text-2xl font-heading font-bold mb-3">
              What can I use my personal loan for?
            </h2>
            <p>
              A DirectAxis personal loan is paid directly into your bank account
              and the money can be used for any needs you may have. Whether
              you’re looking to do home renovations, upgrade your electronics,
              invest in solar solutions, install a borehole or JoJo tank for
              water security, or take a break overseas, a personal loan offers a
              flexible solution.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold mb-3">
              What do you get with a DirectAxis Personal Loan?
            </h2>
            <p>
              When you take out a loan with DirectAxis you’ll deal with an
              authorised Financial Services Provider, with many years of
              financial services experience in South Africa. We support
              responsible lending, so if your application is approved, you’ll
              only be approved for an amount that you can afford comfortably.
              We’ll do our utmost to give you the best offer that we possibly
              can.
            </p>
            <p>
              Because DirectAxis Personal Loans are unsecured this means that we
              won’t ask you to use your car, home or any other asset as
              collateral. To apply for a loan is quick and you can also use your
              loan for anything you want.
            </p>
            <p>
              For your security and peace of mind, all our loans are subject to
              the National Credit Act of 2005. Keep in mind, we consider all
              loan applications and every application is subject to credit
              approval.
            </p>
            <p>
              Your loan will include a Personal Protection Plan, which settles
              your outstanding balance in the event of your death or permanent
              disability. This plan also offers some cover for temporary
              disability and retrenchment – and the level of your cover will be
              based on your risk profile. You can substitute the Personal
              Protection Plan with a policy of your choice, provided the cover
              offered is equivalent.
            </p>
            <p>
              DirectAxis administers loans for FirstRand Bank Limited, an
              authorised Financial Services and Credit Provider, and has been
              providing loans to South Africans for over 20 years.
            </p>
            <p>
              Loan repayment terms range from a minimum of 24 to a maximum of 72
              months. The maximum interest rate with regards to a DirectAxis
              Personal Loan is 27.75% per annum (compounded monthly). Your rate
              and initiation fee will be determined according to your personal
              risk profile. An illustrative example of a R50 000.00 loan at an
              interest rate of 27.75% per annum plus a once-off initiation fee
              of R1 207.50 (added to the loan amount in this example) and a
              monthly admin fee of R69.00, over 72 months would have a total
              cost of R111 760.74.
            </p>
          </div>
        </div>
      </section>
      <LoanCalculator />
    </main>
  );
}
