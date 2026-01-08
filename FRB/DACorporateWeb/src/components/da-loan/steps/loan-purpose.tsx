"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { Home, Wallet, Car, GraduationCap, Heart, Plane, ShoppingCart, MoreHorizontal, ChevronLeft } from "lucide-react";

const loanPurposeSchema = z.object({
	loanPurpose: z.string().min(1, "Please select a loan purpose"),
});

type LoanPurposeForm = z.infer<typeof loanPurposeSchema>;

interface LoanPurposeProps {
	readonly onSubmit: (data: LoanPurposeForm) => void;
	readonly initialData?: Partial<LoanPurposeForm>;
	readonly onBack?: () => void;
}

export const Default = ({ onSubmit, initialData, onBack }: Readonly<LoanPurposeProps>) => {
	const {
		setValue,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<LoanPurposeForm>({
		resolver: zodResolver(loanPurposeSchema),
		defaultValues: {
			loanPurpose: initialData?.loanPurpose || "",
		},
	});

	const loanPurpose = useWatch({
		control,
		name: "loanPurpose",
	});

	const onFormSubmit = handleSubmit((data) => {
		onSubmit(data);
	});

	return (
		<Card className="w-full mx-auto bg-white">
			<CardContent className="p-6 md:p-8 space-y-6">
				<form onSubmit={onFormSubmit} className="space-y-6">
					<div className="space-y-4">
						<h3 className="text-2xl font-medium text-gray-800 font-heading text-center">What would you like a loan for?</h3>
						<div className="grid md:grid-cols-2 gap-3">
							{[
								{ label: "HOME RENOVATIONS", icon: Home },
								{ label: "CONSOLIDATION LOAN", icon: Wallet },
								{ label: "VEHICLE REPAIRS AND PURCHASE", icon: Car },
								{ label: "EDUCATION EXPENSES", icon: GraduationCap },
								{ label: "MEDICAL EXPENSES", icon: Heart },
								{ label: "TRAVEL AND LEISURE", icon: Plane },
								{ label: "ASSET PURCHASE", icon: ShoppingCart },
								{ label: "OTHER", icon: MoreHorizontal },
							].map(({ label, icon: Icon }) => {
								const isSelected = loanPurpose === label;
								return (
									<button
										key={label}
										type="button"
										onClick={() => setValue("loanPurpose", label)}
										className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
											isSelected ? "border-secondary-blue bg-secondary-blue" : "border-gray-200 bg-white hover:border-secondary-blue hover:bg-secondary-blue/5"
										}`}
									>
										<div
											className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
												isSelected ? "bg-white/20 border-white" : "bg-gray-100 border-gray-300"
											}`}
										>
											<Icon className={`w-6 h-6 ${isSelected ? "text-white" : "text-gray-600"}`} />
										</div>
										<div className="flex-1 text-left">
											<div className={`font-semibold text-base ${isSelected ? "text-white" : "text-gray-800"}`}>{label}</div>
										</div>
									</button>
								);
							})}
						</div>
						{errors.loanPurpose && <p className="text-sm text-red-500">{errors.loanPurpose.message}</p>}
					</div>

					<div className="flex gap-4">
						{onBack && (
							<Button
								type="button"
								onClick={onBack}
								variant="outline"
								className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-6 text-base font-medium"
							>
								<ChevronLeft className="w-4 h-4 mr-1" />
								Back
							</Button>
						)}
						<Button type="submit" className="flex-1 bg-[#2c5f5d] hover:bg-[#234a48] text-white py-6 text-base font-medium">
							Review your application
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
