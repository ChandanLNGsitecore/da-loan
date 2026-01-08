"use client";

import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DropDownList } from "components/da-loan/ui/drop-down-list";
import { RadioGroup } from "components/da-loan/ui/radio-group-input";
import { Text } from '@sitecore-content-sdk/nextjs';
import { useRouter } from "next/navigation";

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

	debugger;
	console.log("Props:", props);
	console.log("Fields:", fields);

	const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

	const {
		setValue,
		control,
		handleSubmit,
		trigger,
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
		},
	});

	const maritalStatus = useWatch({ control, name: "maritalStatus" });

	const onFormSubmit = handleSubmit((data) => {
		console.log("Liveing Arrangement form submitted:", data);
		if (onSubmit && typeof onSubmit === 'function') {
			onSubmit(data);
		} else {
			// Navigate to banking details page if no onSubmit handler provided
			router.push("/loans/affordability-detail");
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

	return (
		<Card className="w-full mx-auto bg-white">
			<CardContent className="p-6 md:p-8 space-y-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-semibold text-gray-800"><Text field={fields?.JourneyStep_Heading} /></h2>
					<div className="text-sm text-gray-600 font-medium"><Text field={fields?.StepCountText} /></div>
				</div>

				<div className="space-y-6">
					<Controller
						name="race"
						control={control}
						rules={{ required: fields?.RaceRequiredMessage?.value || "Please select your race" }}
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
						rules={{ required: fields?.CountryBirthRequiredMessage?.value || "Please select your country of birth" }}
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
						rules={{ required: fields?.AccomodationTypeRequiredMessage?.value || "Please select where you live" }}
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

					<Controller
						name="homeLanguage"
						control={control}
						rules={{ required: fields?.HomeLanguageRequiredMessage?.value || "Please select your home language" }}
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
						rules={{ required: fields?.MaritalStatusRequiredMessage?.value || "Please select your marital status" }}
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
										}))}
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
					{onBack && (
						<Button onClick={onBack} variant="outline" className="flex-1 py-6 border-gray-300 text-gray-700 hover:bg-gray-50">
							<ChevronLeft className="w-4 h-4 mr-1" />
							<Text field={fields?.BackButtonText?.value} />
						</Button>
					)}

					<Button onClick={handleNext} className="flex-1 py-6 text-white bg-[#2c5f5d] hover:bg-[#234a48]">
						<Text field={props.fields?.SubmitButtonText} />
						<ChevronRight className="w-4 h-4 ml-1" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

