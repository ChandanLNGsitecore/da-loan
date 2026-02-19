"use client";

import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { cn } from "lib/utils";

export interface ReviewItem {
	id: string;
	stars: number; // 1-5
	textReviewExcerpt: string;
	profileImageUrl?: string;
	hasLike?: boolean;
}

interface StaggeredReviewsProps {
	reviews: ReviewItem[];
	className?: string;
}

function StarRating({ stars }: { stars: number }) {
	return (
		<div className="flex gap-0.5">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star key={i} className={cn("w-4 h-4", i < stars ? "fill-[#FF9500] text-[#FF9500]" : "fill-gray-200 text-gray-200")} />
			))}
		</div>
	);
}

function ReviewCard({ review, index }: { review: ReviewItem; index: number }) {
	// Create staggered positioning for desktop
	// Each item gets a different offset to create organic overlap
	const staggerOffsets = [
		{ x: 0, y: 0 },
		{ x: 14, y: -18 },
		{ x: -10, y: 22 },
		{ x: 18, y: -14 },
		{ x: -14, y: 26 },
		{ x: 10, y: -22 },
		{ x: -18, y: 14 },
		{ x: 16, y: -26 },
	];

	const offset = staggerOffsets[index % staggerOffsets.length];

	return (
		<div className="relative">
			<div
				className="relative flex flex-col md:flex-row md:items-start gap-3 md:gap-4"
				style={{
					transform: `translate(${offset.x}px, ${offset.y}px)`,
				}}
			>
				{/* Profile Picture */}
				<div className="relative shrink-0 z-10">
					<div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-linear-to-br from-gray-200 to-gray-300 overflow-hidden shadow-sm">
						{review.profileImageUrl ? (
							<Image src={review.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
						) : (
							<div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400" />
						)}
					</div>
					{review.hasLike && (
						<div className="absolute -bottom-1 -left-1 w-6 h-6 bg-white rounded-md shadow-sm flex items-center justify-center z-20">
							<Heart className="w-3.5 h-3.5 fill-[#FF9500] text-[#FF9500]" />
						</div>
					)}
				</div>

				{/* Review Card */}
				<div className="flex-1 bg-white rounded-xl shadow-md p-4 md:p-5 min-w-0 z-10 max-w-[240px]">
					<div className="flex flex-col gap-2">
						<StarRating stars={review.stars} />
						<p className="text-sm md:text-base text-gray-900 leading-snug line-clamp-1">{review.textReviewExcerpt}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export function StaggeredReviews({ reviews, className }: Readonly<StaggeredReviewsProps>) {
	return (
		<div className={cn("w-full px-4 md:px-8 py-8 md:py-12 bg-white", className)}>
			<div className="max-w-7xl mx-auto">
				{/* Mobile: Single column - no stagger */}
				<div className="block md:hidden space-y-6">
					{reviews.map((review) => (
						<div key={review.id} className="flex flex-col items-start gap-3">
							<div className="relative shrink-0">
								<div className="w-16 h-16 rounded-lg bg-linear-to-br from-gray-200 to-gray-300 overflow-hidden shadow-sm">
									{review.profileImageUrl ? (
										<Image src={review.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
									) : (
										<div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400" />
									)}
								</div>
								{review.hasLike && (
									<div className="absolute -bottom-1 -left-1 w-6 h-6 bg-white rounded-md shadow-sm flex items-center justify-center">
										<Heart className="w-3.5 h-3.5 fill-[#FF9500] text-[#FF9500]" />
									</div>
								)}
							</div>
							<div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full">
								<div className="flex flex-col gap-2">
									<StarRating stars={review.stars} />
									<p className="text-sm text-gray-900 leading-snug line-clamp-1">{review.textReviewExcerpt}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Desktop: Staggered multi-column layout */}
				<div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 auto-rows-max">
					{reviews.map((review, index) => (
						<ReviewCard key={review.id} review={review} index={index} />
					))}
				</div>
			</div>
		</div>
	);
}
