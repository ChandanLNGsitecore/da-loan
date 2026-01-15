"use client";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { RadioGroupWithIcon, RadioOption } from "components/da-loan/ui/radio-group-with-icon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Text } from '@sitecore-content-sdk/nextjs';

type LoanPurposeForm = {
	loanPurpose: string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SitecoreFields = Record<string, any>;

type SitecoreOption = {
	fields: {
		Value: { value: string };
		Text: { value: string };
		Id: { value: string };
		Icon: { value: string };
	};
};

interface LoanPurposeProps {
	readonly onSubmit: (data: LoanPurposeForm) => void;
	readonly initialData?: Partial<LoanPurposeForm>;
	readonly onBack?: () => void;
	fields?: SitecoreFields;
	[key: string]: unknown;
}

export const Default = (props: LoanPurposeProps) => {
	const { onSubmit, initialData, onBack } = props;
	const { fields: propsFields = {} } = props;
	const fields = propsFields.fields || propsFields;

	const router = useRouter();

	const {
		handleSubmit,
		control,
		trigger,
		formState: { errors },
	} = useForm<LoanPurposeForm>({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			loanPurpose: initialData?.loanPurpose || "",
		},
	});

	const onFormSubmit = handleSubmit((data) => {
		console.log("Loan Purpose form submitted:", data);
		if (onSubmit && typeof onSubmit === 'function') {
			onSubmit(data);
		} else {
			// Navigate to next page if no onSubmit handler provided
			router.push("/loans/next-step");
		}
	});

	const handleNext = async () => {
		const isValid = await trigger();
		if (!isValid) {
			return;
		}
		onFormSubmit();
	};

	const loanPurposeOptions: RadioOption[] = fields?.LoanPurposeOptions?.map((option: SitecoreOption) => ({
		label: option.fields.Text.value,
		id: option.fields.Id.value,
		value: option.fields.Value.value,
		icon: option.fields.Icon.value
	})) || [];

	return (
		<Card className="w-full mx-auto bg-white">
			<CardContent className="p-6 md:p-8 space-y-6">
				<form className="space-y-6">
					<div className="space-y-4">
						<h3 className="text-2xl font-medium text-gray-800 font-heading text-center">
							<Text field={fields?.LoanPurposeLabel} />
						</h3>
						<Controller
							name="loanPurpose"
							control={control}
							rules={{ required: fields?.LoanPurposeErrorMessage?.value }}
							render={({ field }) => (
								<RadioGroupWithIcon
									options={loanPurposeOptions}
									value={field.value}
									onChange={field.onChange}
									error={errors.loanPurpose?.message}
								/>
							)}
						/>
					</div>

					<div className="flex gap-4">

						<Button
							type="button"
							onClick={onBack}
							variant="outline"
							className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-700 py-6 text-base font-mediumflex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-6 text-base font-medium"
						>
							<ChevronLeft className="w-4 h-4 mr-1" />
							<Text field={fields?.BackBtnText} />
						</Button>

						<Button type="button" onClick={handleNext} className="flex-1 bg-[#2c5f5d] hover:bg-[#234a48] text-white py-6 text-base font-medium">
							<Text field={fields?.SubmitButtonText} />
							<ChevronRight className="w-4 h-4 ml-1" />
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
