import Image from "next/image";
import Link from "next/link";
import { cn } from "lib/utils";

interface PromoCardProps {
  badgeText: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  title: string;
  subtitle: string;
  linkHref: string;
  linkText: string;
  className?: string;
}

export function PromoCard({
  badgeText,
  description,
  imageSrc,
  imageAlt,
  imageWidth = 60,
  imageHeight = 60,
  title,
  subtitle,
  linkHref,
  linkText,
  className,
}: Readonly<PromoCardProps>) {
  return (
    <section className={cn("bg-white border border-gray-200 rounded-lg p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]", className)}>
      <p className="text-xs uppercase tracking-wide text-secondary-teal font-semibold mb-3">
        {badgeText}
      </p>
      <p className="text-base leading-relaxed mb-5" style={{ color: "var(--color-text-primary)" }}>
        {description}
      </p>
      <div className="flex items-center gap-3 mb-6">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
            {title}
          </p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      <Link
        href={linkHref}
        className="inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white"
        style={{ backgroundColor: "var(--color-secondary-teal)" }}
      >
        {linkText}
      </Link>
    </section>
  );
}
