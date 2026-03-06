 "use client";

 import * as React from "react";
 import Image from "next/image";
 import Link from "next/link";
 import { CheckCircle2, ArrowRight } from "lucide-react";
 import {
   Carousel,
   CarouselContent,
   CarouselItem,
   type CarouselApi,
 } from "components/da-loan/ui-primitive/carousel";
 import { Button } from "components/da-loan/ui-primitive/button";
 import Autoplay from "embla-carousel-autoplay";

 type HighlightTone = "cyan" | "yellow" | "teal" | "none";

 export interface HeroHighlightSegment {
   text: string;
   tone?: HighlightTone;
 }

 export interface HeroFeaturedSlide {
   id: string;
   heading: HeroHighlightSegment[];
   features: string[];
   primaryCta: {
     label: string;
     href: string;
   };
   secondaryCta?: {
     label: string;
     href: string;
   };
   imageUrl: string;
  imageAlt?: string;
   notification?: {
     icon: string;
     title: string;
     message: string;
   };
 }

 export interface HeroCarouselFeaturedProps {
   slides: HeroFeaturedSlide[];
   autoScrollInterval?: number;
 }

 const highlightClasses: Record<HighlightTone, string> = {
   cyan: "bg-[#25C5CC] text-white",
   yellow: "bg-[#D0B700] text-white",
   teal: "bg-[#006659] text-white",
   none: "",
 };

 export function HeroCarouselFeatured({
   slides,
   autoScrollInterval = 6000,
 }: Readonly<HeroCarouselFeaturedProps>) {
   const [api, setApi] = React.useState<CarouselApi>();
   const [activeIndex, setActiveIndex] = React.useState(0);
   const autoplayPlugin = React.useRef(
     Autoplay({
       delay: autoScrollInterval,
       stopOnMouseEnter: true,
       stopOnInteraction: false,
     })
   );

   React.useEffect(() => {
     if (!api) return;

     const updateIndex = () => {
       setActiveIndex(api.selectedScrollSnap());
     };

     updateIndex();
     api.on("select", updateIndex);
     return () => {
       api.off("select", updateIndex);
     };
   }, [api]);

   return (
     <div className="w-full">
       <Carousel
         setApi={setApi}
         className="w-full"
         opts={{ loop: true }}
         plugins={[autoplayPlugin.current]}
       >
         <CarouselContent className="ml-0">
           {slides.map((slide) => (
             <CarouselItem key={slide.id} className="pl-0">
               <section className="relative w-full overflow-hidden min-h-[520px] md:min-h-[620px] lg:min-h-[700px] xl:min-h-[900px]">
                 <Image
                   src={slide.imageUrl}
                  alt={slide.imageAlt ?? "Hero background"}
                   fill
                   priority={slide.id === slides[0]?.id}
                   className="object-cover"
                   sizes="100vw"
                 />
                {/* <div className="absolute inset-0 bg-linear-to-r from-black/30 via-black/20 to-black/10" /> */}

                <div className="absolute inset-0 z-10 flex">
                  <div className="mx-auto flex w-full max-w-[1400px] items-center px-4 py-12 sm:px-8 md:py-16 lg:px-16">
                     <div className="max-w-[720px] text-white">
                       <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-heading">
                         {slide.heading.map((segment, index) => (
                           <React.Fragment key={`${slide.id}-segment-${index}`}>
                             <span
                               className={
                                 segment.tone && segment.tone !== "none"
                                   ? `inline-block rounded-sm px-2 my-1 ${highlightClasses[segment.tone]}`
                                   : ""
                               }
                             >
                               {segment.text}
                             </span>
                             {index < slide.heading.length - 1 && " "}
                           </React.Fragment>
                         ))}
                       </h1>

                       <ul className="mt-6 flex flex-wrap items-center gap-4 text-sm sm:text-base">
                         {slide.features.map((feature) => (
                           <li key={feature} className="flex items-center gap-2">
                             <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                             <span className="text-white/90">{feature}</span>
                           </li>
                         ))}
                       </ul>

                       <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                         <Button
                           asChild
                           size="lg"
                           className="h-12 rounded-md bg-white px-6 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
                         >
                           <Link href={slide.primaryCta.href}>
                             {slide.primaryCta.label}
                           </Link>
                         </Button>
                         {slide.secondaryCta && (
                           <Link
                             href={slide.secondaryCta.href}
                             className="flex items-center gap-2 text-sm font-semibold text-white transition hover:text-white/80"
                           >
                             {slide.secondaryCta.label}
                             <ArrowRight className="h-4 w-4" />
                           </Link>
                         )}
                       </div>
                     </div>
                   </div>
                 </div>

                 {slide.notification && (
                   <div className="absolute right-4 top-4 z-20 rounded-lg bg-white/95 p-4 shadow-lg backdrop-blur sm:right-8 sm:top-8">
                     <div className="flex items-start gap-3">
                       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00AA28]">
                         <span className="text-sm font-bold text-white">
                           {slide.notification.icon}
                         </span>
                       </div>
                       <div>
                         <p className="text-sm font-semibold text-slate-900">
                           {slide.notification.title}
                         </p>
                         <p className="text-xs text-slate-600">
                           {slide.notification.message}
                         </p>
                       </div>
                     </div>
                   </div>
                 )}

                 <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 rounded-full bg-black/35 px-4 py-2 text-xs font-semibold text-white/60 backdrop-blur sm:bottom-8 sm:right-8">
                   {slides.map((_, index) => (
                     <span
                       key={`${slide.id}-pagination-${index}`}
                       className={
                         index === activeIndex
                           ? "text-white"
                           : "text-white/60"
                       }
                     >
                       {String(index + 1).padStart(2, "0")}
                     </span>
                   ))}
                 </div>
               </section>
             </CarouselItem>
           ))}
         </CarouselContent>
       </Carousel>
     </div>
   );
 }
