"use client";

import * as React from "react";
import { useIsInView } from "hooks/use-is-in-view";
import { formatPercentage } from "lib/format";

export interface Statistic {
	id: string;
	percentage: number;
	title: string;
	description: string;
}

interface StatisticsProps {
	brandName: string;
	statsLabel: string;
	statistics: Statistic[];
}

function AnimatedPercentage({
	targetValue,
	isAnimating,
}: Readonly<{
	targetValue: number;
	isAnimating: boolean;
}>) {
	const [displayValue, setDisplayValue] = React.useState(0);
	const [hasMounted, setHasMounted] = React.useState(false);
	const animationRef = React.useRef<number | null>(null);

	React.useEffect(() => {
		setHasMounted(true);

		return () => {
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, []);

	React.useEffect(() => {
		if (!hasMounted) {
			return;
		}

		if (animationRef.current !== null) {
			cancelAnimationFrame(animationRef.current);
			animationRef.current = null;
		}

		if (!isAnimating) {
			setDisplayValue(targetValue);
			return;
		}

		const startAnimation = () => {
			const duration = 2000;
			const startTime = performance.now();
			const startValue = 0;

			const animate = (currentTime: number) => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);

				const easeOut = 1 - Math.pow(1 - progress, 3);
				const currentValue = startValue + (targetValue - startValue) * easeOut;
				setDisplayValue(Number(currentValue.toFixed(2)));

				if (progress < 1) {
					animationRef.current = requestAnimationFrame(animate);
				} else {
					setDisplayValue(targetValue);
					animationRef.current = null;
				}
			};

			animationRef.current = requestAnimationFrame(animate);
		};

		const timeoutId = setTimeout(startAnimation, 100);

		return () => {
			clearTimeout(timeoutId);
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current);
				animationRef.current = null;
			}
		};
	}, [targetValue, isAnimating, hasMounted]);

	return (
		<span className="text-5xl md:text-6xl font-bold" style={{ color: "var(--color-secondary-yellow)" }}>
			{formatPercentage(displayValue)}
		</span>
	);
}

export function Statistics({ brandName, statsLabel, statistics }: Readonly<StatisticsProps>) {
	const { ref, isInView } = useIsInView<HTMLElement>(null, {
		inViewOnce: true,
		inViewMargin: "0px",
	});

	return (
		<section ref={ref} className="relative w-full p-4 md:p-12 py-12 md:py-20">
			<div className="w-full max-w-[1500px] mx-auto">
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
					<div className="shrink-0">
						<div className="border-t border-gray-700 pt-6">
							<h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-1">{brandName}</h2>
							<h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">{statsLabel}</h3>
						</div>
					</div>

					<div className="w-full lg:flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
						{statistics.map((stat) => (
							<div key={stat.id} className="flex flex-col">
								<div className="border-t border-gray-700 mb-4"></div>

								<div className="flex items-baseline gap-3 mb-2">
									<AnimatedPercentage targetValue={stat.percentage} isAnimating={isInView} />
									<span className="text-xl md:text-2xl font-bold text-gray-900">{stat.title}</span>
								</div>

								<p className="text-sm md:text-base text-gray-500 leading-relaxed">{stat.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
