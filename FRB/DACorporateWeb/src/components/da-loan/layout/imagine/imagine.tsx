import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ImagineArticle = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const articles: ImagineArticle[] = [
  {
    id: "1",
    title: "Using a loan to Consolidate Your Credit",
    description:
      "Simplify your finances by combining multiple debts into one manageable loan with a fixed interest rate.",
    image: "/images/make-a-plan/financial-pressure.jpg",
  },
  {
    id: "2",
    title: "Using a Loan for Education",
    description:
      "Invest in your future or your children's education with flexible loan options designed for learning.",
    image: "/images/make-a-plan/RogerWilco.jpg",
  },
  {
    id: "3",
    title: "Using a Loan for Travel",
    description:
      "Make your dream vacation a reality with travel financing that lets you explore the world now.",
    image: "/images/make-a-plan/householdmaintenance.jpg",
  },
  {
    id: "4",
    title: "Using a Loan for Home Improvement",
    description:
      "Transform your living space with home improvement loans that help you create the home you've always wanted.",
    image: "/images/make-a-plan/car-insurance-09.jpg",
  },
  {
    id: "5",
    title: "Using a Loan for a Wedding",
    description:
      "Celebrate your special day without financial stress with wedding loans that cover all your celebration needs.",
    image: "/images/make-a-plan/RogerWilco.jpg",
  },
  {
    id: "6",
    title: "Using a Loan for Medical Emergencies",
    description:
      "Get the medical care you need when unexpected health issues arise with emergency medical financing.",
    image: "/images/make-a-plan/image-article-two.webp",
  },
  {
    id: "7",
    title: "Using a Loan for a Funeral",
    description:
      "Honor your loved ones with dignity during difficult times with compassionate funeral financing options.",
    image: "/images/make-a-plan/DA_NewHome_Shot27_147.jpg",
  },
  {
    id: "8",
    title: "Using a Loan for an Emergency",
    description:
      "Handle unexpected expenses with confidence using emergency loans designed for life's urgent moments.",
    image: "/images/make-a-plan/image-article-two.webp",
  },
];

export default function Imagine() {
  return (
    <main className="bg-white">
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
        <div className="mb-12 lg:mb-16">
          <p className="text-sm md:text-base uppercase tracking-wider mb-4 md:mb-6" style={{ color: "var(--color-da-green)" }}>
            IMAGINE
          </p>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight" style={{ color: "var(--color-text-primary)" }}>
            Make the most of
            <br />
            your money
          </h1>
        </div>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={article.id === "1" ? "/imagine/articles/using-a-loan-to-consolidate-your-credit" : "#"}
                className="group block h-full"
              >
                <article className="flex flex-col h-full rounded-md overflow-hidden bg-white border border-slate-100 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-shadow duration-300 group-hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                  <div className="relative w-full h-56 sm:h-52 lg:h-60 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
