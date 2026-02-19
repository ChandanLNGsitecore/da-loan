import Image from "next/image";
import Link from "next/link";
import { directTalkTopics } from "./topics-data";

export default function DirectTalk() {
  return (
    <main className="bg-white">
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div className="flex flex-col justify-center">
            <p className="text-sm md:text-base uppercase tracking-wider mb-4 md:mb-6" style={{ color: "var(--color-secondary-teal)" }}>
              25 YEARS OF BUILDING YOUR TOMORROWS, TOGETHER
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-6 md:mb-8 leading-tight" style={{ color: "var(--color-text-primary)" }}>
              Real People.<br />
              Real Stories.<br />
              Real Financial<br />
              Lessons.
            </h1>

            <div className="lg:hidden relative w-full h-64 md:h-96 rounded-lg mb-8 overflow-hidden">
              <Image 
                src="/images/hero-image-articles.webp" 
                alt="DirectTalk" 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 50vw" 
              />
            </div>

            <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
              <p>
                For 25 years, we&apos;ve been trusted to help you achieve your goals, build your future, and make your dreams come true. Through personal loans, improved credit ratings, and financial tips, we&apos;ve been your partner in financial success.
              </p>
              <p>
                As we celebrate 25 years, we want to inspire you with success stories from real people who share their first-hand lessons and experiences.
              </p>
            </div>
          </div>

          <div className="hidden lg:block relative w-full h-[600px] bg-black rounded-lg overflow-hidden">
            <Image 
              src="/images/hero-image-articles.webp" 
              alt="DirectTalk" 
              fill 
              className="object-cover" 
              sizes="(max-width: 1024px) 0vw, 50vw" 
            />
          </div>
        </div>

        <section className="mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 md:mb-6" style={{ color: "var(--color-text-primary)" }}>
            Incoming: Financial Success Stories
          </h2>
          <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
            <p>
              We&apos;ve received countless stories from South Africans across the country. From funding renovations and legal fees to supporting education and side hustles, our customers have shared how DirectAxis has helped them achieve their goals. Many have also experienced the benefits of DirectAxis Pulse in improving their credit ratings.
            </p>
            <p>
              These stories inspire us every day and remind us why we do what we do.
            </p>
          </div>
        </section>

        <section className="mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 md:mb-6" style={{ color: "var(--color-text-primary)" }}>
            Lessons Learnt
          </h2>
          <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
            <p>
              Through our interactions with customers, we&apos;ve learned valuable insights about financial management. We understand that every day brings new financial decisions, and having a plan A, B, and C is essential for navigating life&apos;s uncertainties.
            </p>
            <p>
              In the coming months, we&apos;ll be sharing helpful hints, pointers, how-to guides, and step-by-step articles to help you build a stronger financial foundation. We&apos;re here to be your dependable partner in uncertain times, helping you build the financial path you deserve.
            </p>
            <p>
              Your financial journey matters to us, and we&apos;re committed to providing the tools and knowledge you need to succeed.
            </p>
          </div>
        </section>

        <section className="mb-12 lg:mb-16">
          <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
            <p>
              We&apos;ve inspired over 2 million success stories, and we look forward to the next 25 years and the next 2 million stories we&apos;ll help create together.
            </p>
            <p className="font-semibold">
              Get in touch with us today to see how we can help you build a better tomorrow, together.
            </p>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {directTalkTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/direct-talk/${topic.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-4/3"
                aria-label={`Explore ${topic.title}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

