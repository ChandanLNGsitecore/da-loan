"use client";

import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { type Affordability } from "lib/schemas";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Info } from "lucide-react";
import { AffordabilityComponentProps } from "src/types/Affordability";
import { RichText, Text,RichText as ContentSdkRichText } from "@sitecore-content-sdk/nextjs";
import { IncomeInput } from "../ui/income-input";

export const Default = (props: AffordabilityComponentProps) => {
	const [showDetails, setShowDetails] = useState(false);
	const router = useRouter();



	const {
		register,
		handleSubmit,
		trigger,
		control,
		formState: { errors },
	} = useForm<Affordability>({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			monthlyIncomeAfterTax: undefined,
			monthlyCommitments: undefined,
			otherLivingExpenses: undefined,
		},
	});

	const monthlyIncomeAfterTax = useWatch({ control, name: "monthlyIncomeAfterTax" });
	const monthlyCommitments = useWatch({ control, name: "monthlyCommitments" });
	const otherLivingExpenses = useWatch({ control, name: "otherLivingExpenses" });

	const disposableIncome =
		(monthlyIncomeAfterTax || 0) - (monthlyCommitments || 0) - (otherLivingExpenses || 0);

	const formatCurrency = (value: number) =>
		`R${value.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

	const onFormSubmit = handleSubmit((data) => {
		console.log("Affordability form submitted:", data);
		router.push("/loans/documents-upload");
	});

	const handleBack = () => {
		router.back();
	};

	const handleNext = async () => {
		const isValid = await trigger();
		if (!isValid) {
			return;
		}
		onFormSubmit();
	};

	return (
		<Card className="w-full mx-auto bg-white">
			<CardContent className="p-6 md:p-8 space-y-6">
				<div className="space-y-2">
					<h2 className="text-2xl font-semibold text-gray-800"><Text field={props.fields.JourneyStep_Heading} /></h2>
					<p className="text-sm text-gray-600">
						<Text field={props.fields.JourneyStep_SubHeading} />
					</p>
				</div>

				<div className="bg-teal-50 border border-teal-200 rounded-lg p-3 flex gap-3">
					<Info className="w-5 h-5 text-[#2c5f5d] shrink-0 mt-0.5" />
					<p className="text-sm text-gray-700">
						<Text field={props.fields.SubHeadingMessage} />
					</p>
				</div>

				<div className="space-y-4">
					<Controller
						name="monthlyIncomeAfterTax"
						control={control}
						rules={{
							required: props.fields?.NetIncome_ValidationErrorMessage?.value?.toString() || "Monthly income is required",
							min: {
								value: 1,
								message: "Income must be greater than 0"
							}
						}}
						render={({ field }) => (
							<IncomeInput
								{...field}
								value={field.value || ""}
								onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
								label={<Text field={props?.fields?.NetIncome_Label} />}
								placeholder={props?.fields?.NetIncome_Placeholder?.value?.toString() || "e.g. 39 908.00"}
								prefix="R"
								type="number"
								showHelpIcon={false}
								containerClassName=""
								labelContainerClassName=""
							labelClassName="text-sm text-gray-800"
								error={errors.monthlyIncomeAfterTax?.message}
							/>
						)}
					/>
					<Controller
						name="monthlyCommitments"
						control={control}
						rules={{
							required: props.fields?.MonthlyCommitment_ValidationErrorMessage?.value?.toString() || "Monthly commitments is required",
							min: {
								value: 0,
								message: "Commitments cannot be negative"
							}
						}}
						render={({ field }) => (
							<IncomeInput
								{...field}
								value={field.value || ""}
								onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
								label={<Text field={props?.fields?.MonthlyCommitment_Label} />}
								placeholder={props?.fields?.MonthlyCommitment_Placeholder?.value?.toString() || "e.g. 17 027.00"}
								prefix="R"
								type="number"
								showHelpIcon={false}
								containerClassName=""
								labelContainerClassName=""
							labelClassName="text-sm text-gray-800"
								error={errors.monthlyCommitments?.message}
							/>
						)}
					/>

					<Controller
						name="otherLivingExpenses"
						control={control}
						rules={{
							required: props.fields?.LivingExpenses_ValidationErrorMessage?.value?.toString() || "Living expenses is required",
							min: {
								value: 0,
								message: "Expenses cannot be negative"
							}
						}}
						render={({ field }) => (
							<IncomeInput
								{...field}
								value={field.value || ""}
								onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
								label={<Text field={props?.fields?.LivingExpenses_Label} />}
								placeholder={props?.fields?.LivingExpenses_Placeholder?.value?.toString() || "e.g. 8 801.00"}
								prefix="R"
								type="number"
								showHelpIcon={false}
								containerClassName=""
								labelContainerClassName=""
							labelClassName="text-sm text-gray-800"
								error={errors.otherLivingExpenses?.message}
							/>
						)}
					/>
				</div>
				<div className="rounded-lg border border-gray-200 p-4 bg-gray-50 space-y-3">
					<div className="flex items-center justify-between">
						<p className="text-sm font-semibold text-gray-800"><Text field={props.fields.EstimatedDisposableTitle} /></p>
						<p className={`text-lg font-bold ${disposableIncome >= 0 ? "text-[#2c5f5d]" : "text-red-600"}`}>{formatCurrency(disposableIncome || 0)}</p>
					</div>
					<p className="text-xs text-gray-600"><Text field={props.fields.EstimatedDisposableSubTitle} /></p>
				</div>

				<div>
					<Button
						type="button"
						variant="outline"
						onClick={() => setShowDetails((prev) => !prev)}
						className="w-full border-gray-300 text-gray-800 flex items-center justify-center gap-2 py-6"
					>
						{showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
						<Text field={props.fields.ViewAffordabilityButtonText} />
					</Button>

					<div className={`mt-4 space-y-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300 ${showDetails ? 'block' : 'hidden'
						}`}>
						<p><Text field={props.fields.ViewAffordabilityTitle} /></p>
						<div className="[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
							<ContentSdkRichText field={props.fields.ViewAffordabilityDescription} />
						</div>
						<p className="text-xs text-gray-500">
							<Text field={props.fields.ViewAffordabilitDisclaimer} />
						</p>
					</div>
				</div>

				<div className="flex gap-3 pt-2">

					<Button onClick={handleBack} variant="outline" className="flex-1 py-6 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-800">
						<ChevronLeft className="w-4 h-4 mr-1" />
						<Text field={props.fields.BackBtnText} />
					</Button>

					<Button onClick={handleNext} className="flex-1 py-6 text-white bg-[#2c5f5d] hover:bg-[#234a48]">
						<Text field={props.fields.SubmitButtonText} />
						<ChevronRight className="w-4 h-4 ml-1" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

