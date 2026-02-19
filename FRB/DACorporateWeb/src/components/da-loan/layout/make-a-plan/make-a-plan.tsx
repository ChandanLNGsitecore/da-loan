import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PlanArticle = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const articles: PlanArticle[] = [
  {
    id: "1",
    title: "Options to consider if you're feeling financial pressure",
    description:
      "Create breathing room in your budget with clear priorities, calmer repayments, and practical support.",
    image: "/images/make-a-plan/financial-pressure.jpg",
  },
  {
    id: "2",
    title: "A Financial Safety Net can Protect You from Life Mishaps",
    description:
      "Set up emergency buffers and cover essentials so surprise expenses don’t derail your long-term goals.",
    image: "/images/make-a-plan/RogerWilco.jpg",
  },
  {
    id: "3",
    title: "Kitchen Upgrades",
    description:
      "Plan affordable refreshes, from energy-efficient appliances to finishes that boost resale value.",
    image: "/images/make-a-plan/householdmaintenance.jpg",
  },
  {
    id: "4",
    title: "Why You Should Have Comprehensive Car Insurance",
    description:
      "Protect your wheels, your wallet, and your peace of mind with cover that matches your driving reality.",
    image: "/images/make-a-plan/car-insurance-09.jpg",
  },
  {
    id: "5",
    title: "Reduce Your Electricity Costs",
    description:
      "Lower monthly bills with smart usage habits, energy audits, and scalable home upgrades.",
    image: "/images/make-a-plan/RogerWilco.jpg",
  },
  {
    id: "6",
    title: "The Rewards of Having a Reputable Financial Record",
    description:
      "Build credit confidence so better rates, faster approvals, and bigger plans stay within reach.",
    image: "/images/make-a-plan/image-article-two.webp",
  },
  {
    id: "7",
    title: "Personal Loans vs Home Equity",
    description:
      "Compare timelines, interest, and flexibility to choose the funding path that fits your project.",
    image: "/images/make-a-plan/DA_NewHome_Shot27_147.jpg",
  },
  {
    id: "8",
    title: "Think About Your Credit Rating When You Get Your First Paycheck",
    description:
      "Lay the groundwork early with mindful spending, debit orders, and a realistic savings split.",
    image: "/images/make-a-plan/image-article-two.webp",
  },
];

export default function MakeAPlan() {
  return (
    <main className="bg-white">
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
        <div className="mb-12 lg:mb-16">
          <p className="text-sm md:text-base uppercase tracking-wider mb-4 md:mb-6" style={{ color: "var(--color-da-green)" }}>
            MAKE A PLAN
          </p>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight" style={{ color: "var(--color-text-primary)" }}>
            Let&apos;s tackle this<br/>money headache
          </h1>
        </div>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={article.id === "1" ? "/make-a-plan/articles/options-to-consider-if-you-are-feeling-financial-pressure" : "#"}
                className="group block h-full"
              >
                <article className="flex flex-col h-full rounded-md overflow-hidden bg-white border border-slate-100 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-shadow duration-300 group-hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                  <div className="relative w-full h-56 sm:h-52 lg:h-60 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="flex flex-col flex-1 px-6 pb-6 pt-5 md:pt-6 md:pb-7 gap-3">
                    <h3 className="text-xl font-heading font-medium" style={{ color: "var(--color-text-primary)" }}>
                      {article.title}
                    </h3>
                    <p className="text-base leading-relaxed text-slate-600">
                      {article.description}
                    </p>
                    <span
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase"
                      style={{ color: "var(--color-da-green)" }}
                    >
                      Read More{" "}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

