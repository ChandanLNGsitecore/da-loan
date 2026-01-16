"use client";

import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { Input } from "components/da-loan/ui-premetive/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DropDownList } from "components/da-loan/ui/drop-down-list";
import { StandardTextInput } from "components/da-loan/ui/standard-text-input";
import { StandardNumberInput } from "components/da-loan/ui/standard-number-input";
import { Text } from '@sitecore-content-sdk/nextjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SitecoreFields = Record<string, any>;

type SitecoreOption = {
	fields: {
		Value: { value: string };
		Text: { value: string };
	};
};

type Employment = {
	employmentStatus: string;
	employmentType?: string;
	selfEmployedDuration?: string;
	employerName: string;
	sector: string;
	occupation: string;
	incomeFrequency: string;
	salaryDate: string;
	incomeProvider: string;
	spxConsent?: string;
};

interface EmploymentProps {
	readonly onSubmit: (data: Employment) => void;
	readonly initialData?: Partial<Employment>;
	readonly onBack?: () => void;
	fields?: SitecoreFields;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}



const deriveSectorFromEmployer = (employerName: string): string => {
	const name = employerName.toLowerCase();

	if (name.includes("hospital") || name.includes("clinic") || name.includes("medical") || name.includes("health")) {
		return "Healthcare & Medical";
	}
	if (name.includes("school") || name.includes("university") || name.includes("college") || name.includes("education")) {
		return "Education & Training";
	}
	if (name.includes("bank") || name.includes("finance") || name.includes("insurance")) {
		return "Accounting & Finance";
	}
	if (name.includes("tech") || name.includes("software") || name.includes("it ") || name.includes("digital")) {
		return "Information Technology";
	}
	if (name.includes("government") || name.includes("municipality") || name.includes("dept") || name.includes("department")) {
		return "Government & Public Sector";
	}
	if (name.includes("retail") || name.includes("shop") || name.includes("store")) {
		return "Retail & Wholesale";
	}
	if (name.includes("hotel") || name.includes("restaurant") || name.includes("lodge")) {
		return "Hospitality & Tourism";
	}
	if (name.includes("construction") || name.includes("engineering") || name.includes("build")) {
		return "Construction & Engineering";
	}

	return "";

};

export const Default = (props: EmploymentProps) => {
	"use no memo";

	const router = useRouter();
	const { onSubmit, initialData, onBack } = props;
	const { fields: propsFields = {} } = props;
	const fields = propsFields.fields || propsFields;

	debugger;
	console.log("Props:", props);
	console.log("Fields:", fields);

	const incomeProviderManuallyEdited = useRef(false);
	const sectorManuallyEdited = useRef(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		trigger,
		control,
		formState: { errors },
	} = useForm<Employment>({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			employmentStatus: initialData?.employmentStatus || "",
			employmentType: initialData?.employmentType || "",
			selfEmployedDuration: initialData?.selfEmployedDuration || "",
			employerName: initialData?.employerName || "",
			sector: initialData?.sector || "",
			occupation: initialData?.occupation || "",
			incomeFrequency: initialData?.incomeFrequency || "Monthly",
			salaryDate: initialData?.salaryDate || "",
			incomeProvider: initialData?.incomeProvider || "",
			spxConsent: initialData?.spxConsent || "",
		},
	});

	const employerName = watch("employerName");
	const sector = watch("sector");
	const incomeFrequency = watch("incomeFrequency");
	const employmentStatus = watch("employmentStatus");

	useEffect(() => {
		if (employerName) {
			if (!incomeProviderManuallyEdited.current) {
				setValue("incomeProvider", employerName, { shouldValidate: true });
			}

			if (!sectorManuallyEdited.current && (!sector || sector === "")) {
				const derivedSector = deriveSectorFromEmployer(employerName);
				if (derivedSector) {
					setValue("sector", derivedSector, { shouldValidate: true });
				}
			}
		}
	}, [employerName, sector, setValue]);

	const onFormSubmit = handleSubmit((data) => {
		console.log("Employment form submitted:", data);
		if (onSubmit && typeof onSubmit === 'function') {
			onSubmit(data);
		} else {
			// Navigate to banking details page if no onSubmit handler provided
			router.push("/loans/banking-detail");
		}
	});

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
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-semibold text-gray-800">{fields?.JourneyStep_Heading?.value}</h2>
					<div className="text-sm text-gray-600 font-medium">Step 1 of 5</div>
				</div>

				<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
					<div className="h-full bg-[#2c5f5d] transition-all duration-300" style={{ width: "20%" }} />
				</div>

				<div className="space-y-4">
					<Controller
						name="employmentStatus"
						control={control}
						rules={{ required: "Employment status is required" }}
						render={({ field }) => (
							<DropDownList
								id="employmentStatus"
								label={<Text field={fields?.EmploymentStatusLabel} />}
								value={field.value}
								onValueChange={(value) => {
									field.onChange(value);
									if (value !== "Employed" && value !== "Other") {
										setValue("employmentType", "", { shouldValidate: true });
									}
									if (value !== "Self-Employed") {
										setValue("selfEmployedDuration", "", { shouldValidate: true });
									}
									if (value !== "Employed") {
										setValue("spxConsent", "", { shouldValidate: true });
									}
									trigger(["employmentType", "selfEmployedDuration", "spxConsent"]);
								}}
								options={fields?.EmploymentStatusOptions?.map((option: SitecoreOption) => ({
									value: option.fields.Value.value,
									label: option.fields.Text.value
								}))}
								placeholder={fields?.EmploymentStatusPlaceholder?.value}
								error={errors.employmentStatus?.message}
							/>
						)}
					/>
					{(employmentStatus === "Employed" || employmentStatus === "Other") && (
						<Controller
							name="employmentType"
							control={control}
							rules={{ required: "Employment type is required" }}
							render={({ field }) => (
								<DropDownList
									id="employmentType"
									label={<Text field={fields?.EmploymentTypeLabel} />}
									value={field.value || ""}
									onValueChange={field.onChange}
									options={
										employmentStatus === "Employed"
											? (fields?.EmploymentTypeEmployedOptions?.map((option: SitecoreOption) => ({
												value: option.fields.Value.value,
												label: option.fields.Text.value
											})))
											: (fields?.EmploymentTypeOthersOptions?.map((option: SitecoreOption) => ({
												value: option.fields.Value.value,
												label: option.fields.Text.value
											})))
									}
									placeholder={fields?.EmploymentTypePlaceholder?.value}
									error={errors.employmentType?.message}
								/>
							)}
						/>					)}

					{employmentStatus === "Self-Employed" && (
						<Controller
							name="selfEmployedDuration"
							control={control}
							rules={{ required: "Employment duration is required" }}
							render={({ field }) => (
								<DropDownList
									id="selfEmployedDuration"
									label={<Text field={fields?.EmploymentDurationLabel} />}
									value={field.value || ""}
									onValueChange={field.onChange}
									options={fields?.EmploymentDurationOptions?.map((option: SitecoreOption) => ({
										value: option.fields.Value.value,
										label: option.fields.Text.value
									}))}
									placeholder={fields?.EmploymentDurationPlaceholder?.value}
									error={errors.selfEmployedDuration?.message}
								/>
							)}
						/>
					)}
					<StandardTextInput
						{...register("employerName", {
							required: fields?.EmployerNameRequiredErrorMessage?.value || "Employer name is required",
							minLength: {
								value: 2,
								message: fields?.EmployerNameMinLengthErrorMessage?.value || "Employer name must be at least 2 characters"
							}
						})}
						label={<Text field={fields?.EmployerNameLabel} />}
						placeholder={fields?.EmployerNamePlaceholder?.value}
						inputRegex={/^[a-zA-Z\s]*$/}
						containerClassName="space-y-2"
						labelContainerClassName="flex items-center gap-2"
						labelClassName="text-sm font-medium text-gray-800"
						inputClassName="w-full"
						error={errors.employerName?.message}
					/>

					<Controller
						name="sector"
						control={control}
						rules={{ required: "Sector is required" }}
						render={({ field }) => (
							<DropDownList
								id="sector"
								label={<Text field={fields?.EmploymentSectorLabel} />}
								value={field.value}
								onValueChange={(value) => {
									field.onChange(value);
									sectorManuallyEdited.current = true;
								}}
								options={fields?.EmploymentSectorOptions?.map((option: SitecoreOption) => ({
									value: option.fields.Value.value,
									label: option.fields.Text.value
								}))}
								placeholder={fields?.EmploymentSectorplaceholder?.value}
								error={errors.sector?.message}
							/>
						)}
					/>

					<StandardTextInput
						{...register("occupation", {
							required: fields?.OccupationRequiredErrorMessage?.value,
							minLength: {
								value: fields?.OccupationMinLength?.value,
								message: fields?.OccupationMinLengthErrorMessage?.value
							}
						})}
						label={<Text field={fields?.EmploymentOccupationLabel} />}
						placeholder={fields?.EmploymentOccupationPlaceholder?.value}
						inputRegex={/^[a-zA-Z\s]*$/}
						containerClassName="space-y-2"
						inputClassName="w-full"
						error={errors.occupation?.message}
					/>

					<Controller
						name="incomeFrequency"
						control={control}
						rules={{ required: "Income frequency is required" }}
						render={({ field }) => (
							<DropDownList
								id="incomeFrequency"
								label={<Text field={fields?.EmploymentIncomeFrequencyLabel} />}
								value={field.value}
								onValueChange={field.onChange}
								options={fields?.EmploymentIncomeFrequencyOptions?.map((option: SitecoreOption) => ({
									value: option.fields.Value.value,
									label: option.fields.Text.value
								}))}
								placeholder={fields?.EmploymentIncomeFrequencyPlaceholder?.value}
								error={errors.incomeFrequency?.message}
							/>
						)}
					/>

					<div>
					<Controller
						name="salaryDate"
						control={control}
						rules={{
							required: fields?.SalaryDateRequiredErrorMessage?.value || "Salary date is required",
							validate: (value) => {
								if (!value || value === "") {
									return fields?.SalaryDateRequiredErrorMessage?.value || "Salary date is required";
								}
								const num = parseInt(value);
								if (isNaN(num) || num < 1 || num > 31) {
									return "Please enter a day between 1 and 31";
								}
								return true;
							}
						}}
						render={({ field }) => (
							<StandardNumberInput
								{...field}
								label={fields?.EmploymentSalaryDateLabel}
								placeholder={fields?.EmploymentSalaryDatePlaceholder?.value}
								maxLength={2}
								inputRegex={/^\d{0,2}$/}
								type="tel"
								labelContainerClassName="flex items-center gap-2"
								labelClassName="text-sm font-medium text-gray-800"
								error={errors.salaryDate?.message}
							/>
						)}
				/>
				<p className="text-xs text-gray-500 mt-1">Enter the day you typically receive payment</p>
			</div>

			<div className="space-y-1">
						<StandardTextInput
							{...register("incomeProvider", {
								required: fields?.IncomeProviderRequiredErrorMessage?.value,
								minLength: {
									value: fields?.IncomeProviderMinLength?.value,
									message: fields?.IncomeProviderMinLengthErrorMessage?.value
								},
								onChange: () => {
									incomeProviderManuallyEdited.current = true;
								},
							})}
							name="incomeProvider"
							label={<Text field={fields?.EmploymentIncomeProviderLabel} />}
							placeholder={fields?.IncomeProviderPlaceHolder?.value}
							inputRegex={/^[a-zA-Z\s]*$/}
							containerClassName="space-y-2"
							labelContainerClassName="flex items-center gap-2"
							labelClassName="text-sm font-medium text-gray-800"
							inputClassName="w-full"
							error={errors.incomeProvider?.message}
						/>
						<p className="text-xs text-gray-500 mt-1">Usually the same as your employer</p>
					</div>

					{employmentStatus === "Employed" && (
						<Controller
							name="spxConsent"
							control={control}
							rules={{ required: "SPX consent is required" }}
							render={({ field }) => (
								<DropDownList
									id="spxConsent"
									label={<Text field={fields?.SpxConsentLabel} />}
									value={field.value || ""}
									onValueChange={field.onChange}
									options={fields?.SpxConsentOptions?.map((option: SitecoreOption) => ({
										value: option.fields.Value.value,
										label: option.fields.Text.value
									}))}
									placeholder={fields?.SpxConsentPlaceholder?.value}
									error={errors.spxConsent?.message}
								/>
							)}
						/>
					)}
				</div>
				<div className="flex gap-3 pt-4">
					
						<Button onClick={onBack} variant="outline" className="flex-1 py-6 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-800">
							<ChevronLeft className="w-4 h-4 mr-1" />
							<Text field={fields?.BackButtonText} />
						</Button>
					

					<Button onClick={handleNext} className="flex-1 py-6 text-white bg-[#2c5f5d] hover:bg-[#234a48]">
						<Text field={fields?.SubmitButtonText} />
						<ChevronRight className="w-4 h-4 ml-1" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
