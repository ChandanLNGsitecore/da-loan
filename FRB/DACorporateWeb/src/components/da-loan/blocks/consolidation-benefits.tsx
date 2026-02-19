import { Wallet, Calendar, TrendingDown, Shield } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Single monthly payment",
    description: "Combine all your debts into one manageable payment instead of juggling multiple accounts.",
  },
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Lower monthly payments",
    description: "Potentially reduce your total monthly debt payments and improve your cash flow.",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Fixed repayment term",
    description: "Know exactly when you'll be debt-free with a fixed loan term from 24 to 72 months.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Fixed interest rate",
    description: "Your interest rate stays the same for the full term, making budgeting predictable.",
  },
];

export function ConsolidationBenefits() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--color-secondary-teal)", color: "white" }}
              >
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
