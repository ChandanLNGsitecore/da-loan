"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "components/da-loan/ui-primitive/button";

interface PulseProps {
	heading?: string;
	description: string;
	loginText: string;
	loginLink: string;
	imageUrl: string;
	ctaText: string;
	ctaLink: string;
}

export function PulseBlock({ heading = "Pulse", description, loginText, loginLink, imageUrl, ctaText, ctaLink }: Readonly<PulseProps>) {
	return (
		<section className="relative w-full bg-white p-4 md:p-12 py-12 md:py-20">
			<div className="w-full max-w-[1500px] mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
					<div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-3">{heading}</h2>
						<p className="text-base md:text-lg text-gray-600 mb-6">{description} </p>

						<ul className="space-y-3 mb-6">
							<li className="flex items-start gap-3">
								<CheckCircle2 className="h-5 w-5 text-(--color-da-green) shrink-0 mt-0.5" />
								<span className="text-base text-gray-700">Compare your rating to others</span>
							</li>
							<li className="flex items-start gap-3">
								<CheckCircle2 className="h-5 w-5 text-(--color-da-green) shrink-0 mt-0.5" />
								<span className="text-base text-gray-700">Get personalized improvement tips</span>
							</li>
							<li className="flex items-start gap-3">
								<CheckCircle2 className="h-5 w-5 text-(--color-da-green) shrink-0 mt-0.5" />
								<span className="text-base text-gray-700">Spot fraud and track enquiries</span>
							</li>
							<li className="flex items-start gap-3">
								<CheckCircle2 className="h-5 w-5 text-(--color-da-green) shrink-0 mt-0.5" />
								<span className="text-base text-gray-700">Understand what impacts your score</span>
							</li>
						</ul>

						<div className="mt-6 flex items-center gap-2">
							<Link href={ctaLink}>
								<Button variant="default" size="lg">
									{ctaText}
								</Button>
							</Link>
							<Link href={loginLink} className="text-(--color-link) hover:underline font-medium">
								{loginText}
							</Link>
						</div>
					</div>

					<div className="relative">
						<Link href={ctaLink} className="group relative overflow-hidden rounded-2xl aspect-4/3 lg:aspect-4/3 block">
							<div className="relative w-full h-full">
								<Image
									src={imageUrl}
									alt={heading}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-105"
									sizes="(max-width: 1024px) 100vw, 50vw"
								/>

								<div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm p-5 rounded-2xl">
									<div className="flex items-start gap-3">
										<CheckCircle2 className="h-6 w-6 text-white shrink-0 mt-0.5" />
										<div className="flex-1">
											<h3 className="text-xl font-semibold text-white mb-2">Free Credit Check</h3>
											<p className="text-sm text-gray-200 leading-relaxed">
												Check your credit rating and learn how to improve your financial health with Pulse.
											</p>
										</div>
									</div>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
