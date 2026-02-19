import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type HomeArticles = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const articles: HomeArticles[] = [
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
];

export default function HomeArticles() {
  return (
    <main className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-32">
      <div className=" max-w-[1500px] mx-auto flex flex-col gap-6 md:gap-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
        <span className="text-secondary-teal block font-medium mb-2">Incoming:</span> Financial Success Stories
        </h2>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold tracking-wide"
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

