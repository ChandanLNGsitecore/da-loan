import Image from "next/image";
import Link from "next/link";
import { PromoCard } from "components/da-loan/blocks/promo-card";

const supportingTips = [
  "Financial Tips to Teach Your Older Kids",
  "How to Talk to your Kids About Money",
  "5 Tips on How to Teach Your Kids Practical Money Skills",
  "Money Lessons Your First Baby Can Teach You",
  "Financially Secure Your Child's Future",
  "Checklist: Spending too much on your kids?",
];

export default function SingleParentFinancesArticle() {
  return (
    <main className="bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16">
        <Link
          href="/direct-talk/talking-kids-and-money"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-secondary-teal mb-6"
        >
          <span aria-hidden="true">←</span>
          Back to Talking Kids and Money
        </Link>

        <article className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-wide text-secondary-teal font-semibold mb-4">
              Talking Kids and Money
            </p>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4 text-primary"
            >
              Single Parent Finances: Supporting Your Family
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-3xl" style={{ color: "var(--color-text-primary)" }}>
              As a parent, you want the best for your children and are willing to do anything to give them the brightest future possible. However, managing finances as a single parent can be tricky. It can be difficult to balance immediate home expenses and the future education of your children.
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

            <div className="space-y-6 text-base md:text-lg leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
              <p>
                Duwayne Marajkies was raised by a single parent. With the everyday expenses of running a household of five, including having three children in high school and the cost of textbooks and extras, Duwayne&apos;s mother had to seek financial assistance. She was granted a loan from DirectAxis to give Duwayne the chance to go to university to become a teacher.
              </p>
              <p className="font-semibold italic text-secondary-teal">
                &quot;I can see how my mother&apos;s decision to apply for financial assistance impacted my life and how it will set me up for a bright and secure future, both financially and career-wise,&quot; says Duwayne.
              </p>
              <p>
                Here he shares four major lessons he learned from the experience:
              </p>
            </div>

            <section className="mt-10 space-y-10 text-base md:text-lg leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-3">
                  Only Seek Financial Assistance When It&apos;s Necessary
                </h2>
                <p className="mb-4">
                  Taking out a loan for unnecessary wants is never a good idea, but in Duwayne&apos;s case, the loan gave him something incredibly important: a good education and opportunity for a brighter future.
                </p>
                <p>
                  &quot;It&apos;s important to differentiate your needs from your wants, to understand that taking out a loan requires you to think about things from a long-term perspective,&quot; says Duwayne. &quot;Investing in education or buying a house can improve your overall quality of life and can help you to build a better future.&quot;
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-3">
                  Get Financially Disciplined
                </h2>
                <p>
                  Paying your loan back on time helps improve your credit rating and spending behaviour, and helps you manage your finances better overall. When you are financially disciplined, your children can learn from your actions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-3">
                  Save Where You Can
                </h2>
                <p>
                  In Duwayne&apos;s mother&apos;s case, saving was difficult due to the expenses necessary to keep her family afloat. &quot;I learned the importance of setting aside money for future expenses,&quot; says Duwayne. &quot;You have to start saving now. A financial back-up not only gives you confidence for the future, but it secures you financially.&quot;
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-3">
                  Create a Budget
                </h2>
                <p className="mb-4">
                  A budget provides you with a clear blueprint for what you spend your money on and allows you to be aware of any financial adjustments you may need to make. It might seem obvious, but it&apos;s the first step towards understanding where your money goes every month.
                </p>
                <p>
                  &quot;Work hard and persevere to take advantage of the opportunities you&apos;re given. This is especially true for those whose parents have made plans to help their children become the people they want to be, with the right qualifications to get them there,&quot; says Duwayne. &quot;My ultimate dream is to become an educational and school psychologist because I love helping children and the next generation. I have no doubt I&apos;ll get there-even if I have to ask for help.&quot;
                </p>
              </div>
            </section>

            <section className="mt-10 space-y-6 text-base md:text-lg leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
              <p>
                If you need a stepping stone towards reaching your personal goals, to find out how to speak to your kids about money, or to learn more about how we can help with a personal loan, DirectAxis is here for you.
              </p>
              <p className="font-semibold">
                Get in touch with us today to find out how we can help you build your better tomorrow, together.
              </p>
            </section>
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

