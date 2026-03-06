"use client";

import { useState } from "react";
import { Button } from "components/da-loan/ui-primitive/button";
import { Card, CardContent } from "components/da-loan/ui-primitive/card";
import { Slider } from "components/da-loan/ui-primitive/slider";
import { type LoanOffer } from "lib/schemas";
import { useRouter } from "next/navigation";
import { OfferComponentProps } from "src/types/Offer";
import { Text, RichText as ContentSdkRichText } from "@sitecore-content-sdk/nextjs";
import { AppPlaceholder } from "@sitecore-content-sdk/nextjs";


export const Default = (props: OfferComponentProps) => {
  const router = useRouter();

  const redirectUrl = "/loans/documents-upload";

  
  // State for loan offer data from API
  const [initialOffer, setInitialOffer] = useState<LoanOffer>({
    approvedAmount: 15000,
    requestedAmount: 20000,
    maxCredit: 20000,
    loanTerm: 11,
    interestRate: 28.5,
    monthlyRepayment: 1500
  });
  
  // Initialize based on offer data
  const hasShortfallInit = initialOffer.approvedAmount < initialOffer.requestedAmount;
  const isOverQualifiedInit = initialOffer.approvedAmount > initialOffer.requestedAmount;
  
  const [selectedAmount, setSelectedAmount] = useState(
    isOverQualifiedInit ? initialOffer.requestedAmount : initialOffer.approvedAmount
  );
  const [selectedMonths, setSelectedMonths] = useState(initialOffer.loanTerm);
  
  const { approvedAmount, requestedAmount, maxCredit } = initialOffer; 

	const hasShortfall = approvedAmount < requestedAmount;
	const isExactMatch = approvedAmount === requestedAmount;
	const isOverQualified = approvedAmount > requestedAmount;

	const approvedPercentage = (approvedAmount / maxCredit) * 100;
	const requestedPercentage = (requestedAmount / maxCredit) * 100;

	const formatAmount = (amount: number) => {
		return `R${amount.toLocaleString("en-ZA").replace(/,/g, " ")}`;
	};

	const calculateLoanDetails = (amount: number, months: number) => {
		const interestMultiplier = 1 + initialOffer.interestRate / 100;
		const totalToRepay = amount * interestMultiplier;
		const monthlyRepayment = Math.round(totalToRepay / months);

		return { monthlyRepayment, loanTerm: months };
	};

	const currentLoanDetails = calculateLoanDetails(selectedAmount, selectedMonths);

	return (
		<Card className="w-full mx-auto bg-white">
			<CardContent className="p-6 space-y-6">
				<h2 className="text-2xl font-semibold text-gray-800"><Text field={props.fields.JourneyStep_Heading} /></h2>

				<div className="space-y-1">
					<p>
						<Text field={props.fields.JourneyStep_SubHeading} /><sup>*</sup>
					</p>
					<p className="text-3xl font-bold text-gray-900">{formatAmount(approvedAmount)}</p>
					{hasShortfall && (
						<p className="text-sm text-gray-600"><Text field={props.fields.ShortfallFallMessage} />{formatAmount(requestedAmount)}</p>
					)}
					{isExactMatch && <p className="text-sm text-green-600 font-medium">✓ <Text field={props.fields.ExactMatchMessage} /></p>}
					{isOverQualified && (
						<p className="text-sm text-green-600 font-medium">
							✓ 
							{props.fields.OverQualifiedMessage.value?.toString().replace("[requestedAmount]", formatAmount(requestedAmount)).replace(" [approvedAmount]", formatAmount(approvedAmount))}
						</p>
					)}
				</div>
				<p className="text-sm text-gray-600">*This is an indicative quote and terms and conditions apply</p>

				<div className="">
					<div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
						{isOverQualified ? (
							<>
								<div className="absolute left-0 top-0 h-full bg-[#2c5f5d] transition-all duration-500" style={{ width: `${requestedPercentage}%` }} />
								<div
									className="absolute top-0 h-full bg-emerald-400 transition-all duration-500"
									style={{
										left: `${requestedPercentage}%`,
										width: `${approvedPercentage - requestedPercentage}%`,
									}}
								/>
							</>
						) : (
							<div className="absolute left-0 top-0 h-full bg-[#2c5f5d] transition-all duration-500" style={{ width: `${approvedPercentage}%` }} />
						)}

						{hasShortfall && (
							<div
								className="absolute top-0 h-full bg-amber-200 transition-all duration-500"
								style={{
									left: `${approvedPercentage}%`,
									width: `${requestedPercentage - approvedPercentage}%`,
								}}
							/>
						)}
					</div>

					<div className="relative w-full">
						<div className="absolute top-0 right-[-6px] text-center h-full text-xs">
							<div className="text-xl mb-1">|</div>
							<div>Max</div>
						</div>
						{hasShortfall && (
							<div
								className="absolute flex flex-col items-center -translate-x-1/2"
								style={{ left: `${approvedPercentage + (requestedPercentage - approvedPercentage) / 2}%` }}
							>
								<div className="text-xl mb-1">↑</div>
								<div className="text-center">
									<div className="text-xs font-semibold text-gray-900">{formatAmount(requestedAmount)}</div>
									<div className="text-xs text-gray-600 whitespace-nowrap">Requested</div>
								</div>
							</div>
						)}

						{hasShortfall && (
							<div className="absolute flex flex-col items-center -translate-x-1/2" style={{ left: `${approvedPercentage / 2}%` }}>
								<div className="text-xl mb-1">↑</div>
								<div className="text-center">
									<div className="text-xs font-semibold text-gray-900">{formatAmount(approvedAmount)}</div>
									<div className="text-xs text-gray-600 whitespace-nowrap">Offer</div>
								</div>
							</div>
						)}

						{isExactMatch && (
							<div className="absolute flex flex-col items-center -translate-x-1/2" style={{ left: `${approvedPercentage}%` }}>
								<div className="text-xl mb-1">↑</div>
								<div className="text-center">
									<div className="text-xs font-semibold text-gray-900">{formatAmount(approvedAmount)}</div>
									<div className="text-xs text-gray-600 whitespace-nowrap">Approved</div>
								</div>
							</div>
						)}

						{isOverQualified && (
							<>
								<div className="absolute flex flex-col items-center -translate-x-1/2" style={{ left: `${requestedPercentage / 2}%` }}>
									<div className="text-xl mb-1">↑</div>
									<div className="text-center">
										<div className="text-xs font-semibold text-gray-900">{formatAmount(requestedAmount)}</div>
										<div className="text-xs text-gray-600 whitespace-nowrap">Requested</div>
									</div>
								</div>
								<div className="absolute flex flex-col items-center -translate-x-1/2" style={{ left: `${(requestedPercentage + approvedPercentage) / 2}%` }}>
									<div className="text-xl mb-1">↑</div>
									<div className="text-center">
										<div className="text-xs font-semibold text-gray-900">{formatAmount(approvedAmount)}</div>
										<div className="text-xs text-gray-600 whitespace-nowrap">Offer</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>

{hasShortfall && props.componentMap && (
					<AppPlaceholder
						name="loan-card"
						rendering={props.rendering}
						page={props.page}
						componentMap={props.componentMap}
					/>
				)}

				{isExactMatch && (
					<Card className="bg-green-50 border-green-200 mt-24">
						<CardContent className="p-4">
							<div className="flex items-start gap-2">
								<div className="space-y-1">
									<h3 className="font-semibold text-gray-900">Perfect match!</h3>
									<p className="text-sm text-gray-700">
										You&apos;ve been approved for what you requested. You can proceed with confidence knowing you have the full amount you need.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{isOverQualified && (
					<Card className="bg-emerald-50 border-emerald-200 mt-24">
						<CardContent className="p-4">
							<div className="flex items-start gap-2">
								<div className="space-y-1">
									<h3 className="font-semibold text-gray-900">Congratulations on your excellent credit profile!</h3>
									<p className="text-sm text-gray-700">
										Based on your financial standing, we can offer you <span className="font-medium">{formatAmount(approvedAmount - requestedAmount)}</span>{" "}
										more than you requested. This gives you extra flexibility for your needs.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{isOverQualified && (
					<div className="space-y-4 p-4 bg-gray-100 rounded-lg">
						<h3>Select your preferred amount and period</h3>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-gray-700">My loan</span>
								<span className="text-lg font-bold text-[#2c5f5d]">{formatAmount(selectedAmount)}</span>
							</div>

							<div style={{ touchAction: "none", WebkitTapHighlightColor: "transparent" }}>
								<Slider
									value={[selectedAmount]}
									onValueChange={(value) => setSelectedAmount(value[0])}
									min={requestedAmount}
									max={approvedAmount}
									step={1000}
									className="w-full"
								/>
							</div>

							<div className="flex items-center justify-between text-xs text-gray-500">
								<span>{formatAmount(requestedAmount)}</span>
								<span>{formatAmount(approvedAmount)}</span>
							</div>
						</div>

						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-gray-700">Repayment period</span>
								<span className="text-lg font-bold text-[#2c5f5d]">{selectedMonths} months</span>
							</div>

							<div style={{ touchAction: "none", WebkitTapHighlightColor: "transparent" }}>
								<Slider value={[selectedMonths]} onValueChange={(value) => setSelectedMonths(value[0])} min={7} max={24} step={1} className="w-full" />
							</div>

							<div className="flex items-center justify-between text-xs text-gray-500">
								<span>7 months</span>
								<span>24 months</span>
							</div>
						</div>

					</div>
				)}
				<div className="bg-gray-100 rounded-lg p-4 space-y-2">
					<div className="flex justify-between text-sm">
						<span className="text-gray-600"><Text field={props.fields.MonthlyRepayment} /></span>
						<span className="font-semibold text-gray-900">R{currentLoanDetails.monthlyRepayment.toLocaleString("en-ZA").replace(/,/g, " ")}</span>
					</div>
					<div className="flex justify-between text-sm">
						<span className="text-gray-600"><Text field={props.fields.LoanTerm} /></span>
						<span className="font-semibold text-gray-900">{currentLoanDetails.loanTerm} months</span>
					</div>
					<div className="flex justify-between text-sm">
						<span className="text-gray-600"><Text field={props.fields.IntrestRate} /></span>
						<span className="font-semibold text-gray-900">{initialOffer.interestRate}%</span>
					</div>
				</div>
				<p className="text-sm text-gray-600">
					<ContentSdkRichText field={props.fields.IncomeExpenseMessage} />
					
				</p>
				<Button
					onClick={(e) => {
						e.preventDefault();
						
						// Prepare final offer data
						const finalOffer: LoanOffer = {
							...initialOffer,
							approvedAmount: selectedAmount,
							loanTerm: selectedMonths,
							monthlyRepayment: currentLoanDetails.monthlyRepayment,
						};
						
					
						// Redirect to next page
						router.push(redirectUrl);
					}}
					className="w-full bg-[#2c5f5d] hover:bg-[#234a48] text-white py-6 text-base font-medium uppercase"
				>
					<Text field={props.fields.SubmitButtonText} /> {formatAmount(selectedAmount)}
				</Button>
			</CardContent>
		</Card>
	);
}
