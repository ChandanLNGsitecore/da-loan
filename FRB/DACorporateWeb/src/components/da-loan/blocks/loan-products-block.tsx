"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export interface LoanProduct {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	link: string;
}

interface LoanProductsProps {
	heading: string;
	description: string;
	products: LoanProduct[];
}

export function LoanProductsBlock({ heading, description, products }: Readonly<LoanProductsProps>) {
	if (products.length < 2) {
		console.warn("LoanProducts component requires at least 2 products");
		return null;
	}

	const [product1, product2] = products.slice(0, 2);

	return (
		<section className="relative w-full bg-white p-4 md:p-12 py-12 md:py-20">
			<div className="w-full max-w-[1500px] mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
					<div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-3">{heading}</h2>
						<p className="text-base md:text-lg text-gray-600 mb-6 lg:mb-8">{description}</p>
					</div>

					<div className="hidden lg:block" />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8 lg:mt-0">
					<Link href={product1.link} className="group relative overflow-hidden rounded-2xl aspect-4/3 lg:aspect-4/3">
						<div className="relative w-full h-full">
							<Image
								src={product1.imageUrl}
								alt={product1.title}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-105"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>

							<div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm p-5 rounded-2xl">
								<div className="flex items-start gap-3">
									<CheckCircle2 className="h-6 w-6 text-white shrink-0 mt-0.5" />
									<div className="flex-1">
										<h3 className="text-xl font-semibold text-white mb-2">{product1.title}</h3>
										<p className="text-sm text-gray-200 leading-relaxed">{product1.description}</p>
									</div>
								</div>
							</div>
						</div>
					</Link>

					<Link href={product2.link} className="group relative overflow-hidden rounded-2xl aspect-4/3 lg:aspect-4/3 lg:-mt-8">
						<div className="relative w-full h-full">
							<Image
								src={product2.imageUrl}
								alt={product2.title}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-105"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>

							<div className="absolute top-1/3 left-4 max-w-[85%] bg-gray-900/80 backdrop-blur-sm p-5 rounded-2xl">
								<div className="flex items-start gap-3">
									<CheckCircle2 className="h-6 w-6 text-white shrink-0 mt-0.5" />
									<div className="flex-1">
										<h3 className="text-xl font-semibold text-white mb-2">{product2.title}</h3>
										<p className="text-sm text-gray-200 leading-relaxed">{product2.description}</p>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
}
