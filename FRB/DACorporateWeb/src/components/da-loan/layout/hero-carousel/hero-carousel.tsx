import * as React from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPagination, type CarouselApi, } from "components/da-loan/ui-premetive/carousel";
import { Button } from "components/da-loan/ui-premetive/button";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

export interface HeroSlide {
  id: string;
  stats: string;
  successStoriesLink: string;
  successStoriesText?: string;
  successStoriesLinkText?: string;
  headline: string;
  subheadline: string;
  features: string[];
  primaryCta: string;
  primaryCtaLink: string;
  secondaryCta?: string;
  secondaryCtaLink?: string;
  imageUrl: string;
  notification?: {
    icon: string;
    title: string;
    message: string;
  };
}

export interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: Readonly<HeroCarouselProps>) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [isPaused, setIsPaused] = React.useState(false);
  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    })
  );

  React.useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 5000);
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full p-4 md:p-16">
      <Carousel 
        setApi={setApi} 
        className="w-full max-w-[1500px] mx-auto"
        opts={{ loop: true }}
        plugins={[autoplayPlugin.current]}
      >
        <CarouselContent className="ml-0">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-12 lg:py-0">
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mr-4 font-bold">
                      {slide.stats}
                    </p>
                    <p className="mt-2">
                      {slide.successStoriesText || "Read our"}{" "}
                      <Link
                        href={slide.successStoriesLink}
                        className=" text-gray-600 underline hover:text-gray-900 transition-colors ml-1"
                      >
                        <strong>{slide.successStoriesLinkText || "Success Stories"}</strong>
                      </Link>
                    </p>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-4">
                    {slide.headline}
                  </h1>

                  <p className="text-lg text-gray-600 mb-8">
                    {slide.subheadline}
                  </p>

                  <ul className="flex flex-col gap-3 mb-8">
                    {slide.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className=" hover:bg-gray-800 text-white rounded-md px-6 py-3 h-auto font-medium"
                    >
                      <Link href={slide.primaryCtaLink}>
                        {slide.primaryCta}
                      </Link>
                    </Button>
                    {slide.secondaryCta && slide.secondaryCtaLink && (
                      <Link
                        href={slide.secondaryCtaLink}
                        className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors font-medium self-center sm:self-auto"
                      >
                        {slide.secondaryCta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="relative overflow-hidden">


                  <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px]">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.headline}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={slide.id === "1"}
                      width={680}
                      height={600}
                    />
                  </div>

                  {slide.notification && (
                    <div className="absolute bottom-24 left-8 z-20 bg-white rounded-lg shadow-lg p-4 max-w-[280px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {slide.notification.icon}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm mb-1">
                            {slide.notification.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {slide.notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex align-end w-full justify-end z-30 backdrop-blur-sm px-4 py-2 rounded-md">
          <CarouselPagination 
            className="gap-3" 
            autoScrollInterval={5000} 
            isPaused={isPaused}
          />
        </div>
      </Carousel>
    </div>
  );
}

