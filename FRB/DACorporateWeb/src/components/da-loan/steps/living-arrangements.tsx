"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { Button } from "components/da-loan/ui-primitive/button";
import { Card, CardContent } from "components/da-loan/ui-primitive/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DropDownList } from "components/da-loan/ui/drop-down-list";
import { RadioGroup } from "components/da-loan/ui/radio-group-input";
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { useRouter } from "next/navigation";
import { formatNumber, parseNumberInput } from "lib/format";
import { Input } from "components/da-loan/ui-primitive/input";
// Removed unused import: Input

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SitecoreFields = Record<string, any>;

type SitecoreOption = {
	fields: {
		Value: { value: string };
		Text: { value: string };
	};
};

type SitecoreRadioOption = {
	fields: {
		Value: { value: string };
		Text: { value: string };
		Id: { value: string };
	};
};

type LivingArrangements = {
	race: string;
	countryOfBirth: string;
	whereDoYouLive: string;
	homeLanguage: string;
	maritalStatus: string;
	maritalType?: string;
	numberOfDependents?: number;
	monthlyRent?: number;
};

interface LivingArrangementsProps {
	readonly onSubmit: (data: LivingArrangements) => void;
	readonly initialData?: Partial<LivingArrangements>;
	readonly onBack?: () => void;
	fields?: SitecoreFields;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export const Default = (props: LivingArrangementsProps) => {
	"use no memo";
		const router = useRouter();

	const { onSubmit, initialData, onBack } = props;
	const { fields: propsFields = {} } = props;
	const fields = propsFields.fields || propsFields;

		const [monthlyRentInput, setMonthlyRentInput] = useState(() =>
		initialData?.monthlyRent ? formatNumber(initialData.monthlyRent, { fractionDigits: 2 }) : ""
	);

	debugger;
	console.log("Props:", props);
	console.log("Fields:", fields);

	const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

	const {
		setValue,
		control,
		handleSubmit,
		trigger,
		register,
		formState: { errors },
	} = useForm<LivingArrangements>({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			race: initialData?.race || "",
			countryOfBirth: initialData?.countryOfBirth || "",
			whereDoYouLive: initialData?.whereDoYouLive || "",
			homeLanguage: initialData?.homeLanguage || "",
			maritalStatus: initialData?.maritalStatus || "",
			maritalType: initialData?.maritalType || "",
			numberOfDependents: initialData?.numberOfDependents,
			monthlyRent: initialData?.monthlyRent,
		},
	});

	const maritalStatus = useWatch({ control, name: "maritalStatus" });

	const whereDoYouLive = useWatch({ control, name: "whereDoYouLive" });

	// Reset monthlyRent when whereDoYouLive changes away from "Renting"
	
	useEffect(() => {
		if (whereDoYouLive !== "Renting") {
			setMonthlyRentInput("");
			setValue("monthlyRent", undefined, { shouldValidate: true });
		}
	}, [whereDoYouLive, setValue]);

		const onFormSubmit = handleSubmit((data) => {
		console.log("Liveing Arrangement form submitted:", data);
		if (onSubmit && typeof onSubmit === 'function') {
			onSubmit(data);
		} else {
			// Navigate to banking details page if no onSubmit handler provided
			router.push("/loans/offer-detail");
		}
	});


	const handleNext = async () => {
		setHasAttemptedSubmit(true);
		const isValid = await trigger();
		if (!isValid) {
			return;
		}
		onFormSubmit();
	};

	const handleBack = () => {
    if (onBack && typeof onBack === 'function') {
      onBack();
    } else {
      router.back();
    }
  };
	const handleMonthlyRentChange = (value: string) => {
		const sanitized = value.replace(/[^\d.]/g, "");
		setMonthlyRentInput(sanitized);
		const parsed = parseNumberInput(sanitized);
		setValue("monthlyRent", parsed, { shouldValidate: true });
	};

	const handleMonthlyRentBlur = (value: string) => {
		const parsed = parseNumberInput(value);
		setMonthlyRentInput(parsed ? formatNumber(parsed, { fractionDigits: 2 }) : "");
	};
	return (
		<Card className="w-full mx-auto bg-white">
			<CardContent className="p-6 md:p-8 space-y-6">
				<div className="flex items-center justify-between mb-4">
						<h2 className="text-2xl font-semibold text-gray-800"><Text field={fields?.JourneyStep_Heading} /></h2>
						<div className="text-sm text-gray-600 font-medium"><Text field={fields?.StepCountText} /></div>
				</div>

				<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
					<div className="h-full bg-[#2c5f5d] transition-all duration-300" style={{ width: "80%" }} />
				</div>

				<div className="space-y-6">
					<Controller
						name="race"
						control={control}
						rules={{ required: fields?.RaceRequiredMessage?.value }}
						render={({ field }) => (
							<DropDownList
								id="race"
								label={<Text field={fields?.RaceLabel} />}
								value={field.value}
								onValueChange={field.onChange}
								options={fields?.RaceOptions?.map((option: SitecoreOption) => ({
									value: option.fields.Value.value,
									label: option.fields.Text.value
								}))}
								placeholder={fields?.RacePlaceholder?.value}
								error={errors.race?.message}
								required
								tooltip="Note that this is a legal requirement for the loan application process."
							/>
						)}
					/>

					<Controller
						name="countryOfBirth"
						control={control}
						rules={{ required: fields?.CountryBirthRequiredMessage?.value }}
						render={({ field }) => (
							<DropDownList
								id="countryOfBirth"
								label={<Text field={fields?.CountryBirthText} />}
								value={field.value}
								onValueChange={field.onChange}
								options={fields?.CountryBirthOptions?.map((option: SitecoreOption) => ({
									value: option.fields.Value.value,
									label: option.fields.Text.value
								}))}
								placeholder={fields?.CountryBirthPlaceholder?.value}
								error={errors.countryOfBirth?.message}
								required
							/>
						)}
					/>

					<Controller
						name="whereDoYouLive"
						control={control}
						rules={{ required: fields?.AccomodationTypeRequiredMessage?.value}}
						render={({ field }) => (
							<RadioGroup
								id="whereDoYouLive"
								label={<Text field={fields?.AccomodationTypeLabel} />}
								value={field.value}
								onValueChange={field.onChange}
								options={fields?.AccomodationTypeList?.map((option: SitecoreRadioOption) => ({
									value: option.fields.Value.value,
									label: option.fields.Text.value,
									id: option.fields.Id.value
								}))}
								error={errors.whereDoYouLive?.message}
								helperText="Only one option can be selected"
								required
							/>
						)}
					/>
{whereDoYouLive === "Renting" && (
							<div>
							<label className="block text-sm font-medium text-gray-800 mb-1">
								<Text field={fields?.MonthlyRentLabel} />
							</label>
							<Input
								id="monthlyRent"
								type="text"
								inputMode="decimal"
								placeholder={fields?.MonthlyRentPlaceholder?.value || "e.g. 6 500.00"}
								{...register("monthlyRent", {
									valueAsNumber: true,
									required: fields?.MonthlyRentRequiredMessage?.value || " Please select a monthly rent"
								})}
								value={monthlyRentInput}
								onFocus={() => setMonthlyRentInput((current) => current.replace(/\s/g, ""))}
								onChange={(e) => handleMonthlyRentChange(e.target.value)}
								onBlur={(e) => handleMonthlyRentBlur(e.target.value)}
							/>
							{errors.monthlyRent && (
								<p className="text-sm text-red-500 mt-1">{errors.monthlyRent.message}</p>
							)}
						</div>
					)}
					<Controller
						name="homeLanguage"
						control={control}
						rules={{ required: fields?.HomeLanguageRequiredMessage?.value }}
						render={({ field }) => (
							<DropDownList
								id="homeLanguage"
								label={<Text field={fields?.HomeLanguageLabel} />}
								value={field.value}
								onValueChange={field.onChange}
								options={fields?.HomeLanguageOptions?.map((option: SitecoreOption) => ({
									value: option.fields.Value.value,
									label: option.fields.Text.value
								}))}
								placeholder={fields?.HomeLanguagePlaceholder?.value}
								error={errors.homeLanguage?.message}
								required
							/>
						)}
					/>

					<Controller
						name="maritalStatus"
						control={control}
						rules={{ required: fields?.MaritalStatusRequiredMessage?.value }}
						render={({ field }) => (
							<RadioGroup
								id="maritalStatus"
								label={<Text field={fields?.MaritalStatusLabel} />}
								value={field.value}
								onValueChange={(value) => {
									field.onChange(value);
									if (value !== "Married") {
										setValue("maritalType", "", { shouldValidate: true });
									}
									trigger("maritalType");
								}}
								options={fields?.MaritalStatusList?.map((option: SitecoreRadioOption) => ({
									value: option.fields.Value.value,
									label: option.fields.Text.value,
									id: option.fields.Id.value
								}))}
								error={errors.maritalStatus?.message}
								required
							/>
						)}
					/>

					{maritalStatus === "Married" && (
						<div className="p-4 bg-gray-50 rounded-lg space-y-2">
							<Controller
								name="maritalType"
								control={control}
								rules={{ 
									validate: (value) => {
										if (maritalStatus === "Married" && !value) {
											return fields?.MaritalTypeRequiredMessage?.value;
										}
										return true;
									}
								}}
								render={({ field }) => (
									<RadioGroup
										id="maritalType"
										label={fields?.MaritalTypeLabel?.value}
										value={field.value || ""}
										onValueChange={field.onChange}
										options={fields?.MaritalTypeList?.map((option: SitecoreRadioOption) => ({
											value: option.fields.Value.value,
											label: option.fields.Text.value,
											id: option.fields.Id.value
										})) }
										error={hasAttemptedSubmit ? errors.maritalType?.message : undefined}
										required
										wrapperClassName=""
									/>
								)}
							/>
						</div>
					)}
				</div>

				<div className="flex gap-3 pt-4">
					
						<Button onClick={handleBack} variant="outline" className="flex-1 py-6 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-800">
							<ChevronLeft className="w-4 h-4 mr-1" />
							<Text field={props.fields?.BackButtonText} />
						</Button>
					

					<Button onClick={handleNext} className="flex-1 py-6 text-white bg-[#2c5f5d] hover:bg-[#234a48]">
						<Text field={props.fields?.SubmitButtonText} />
						<ChevronRight className="w-4 h-4 ml-1" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

