"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { Timer } from "components/da-loan/ui-premetive/timer";
import { CreditCheckComponentProps } from 'src/types/CreditCheck';
import { StandardNumberInput } from "../ui/standard-number-input";
import {	
	Text,
} from '@sitecore-content-sdk/nextjs';

// Utility function to convert string regex to RegExp
const getRegex = (regexString?: string): RegExp | undefined => {
	if (!regexString) return /^0\d{9}$/; // Default cellphone regex
	try {
		// Remove leading/trailing slashes if present and create RegExp
		const cleaned = regexString.replace(/^\/|\/$/g, '');
		return new RegExp(cleaned);
	} catch {
		return /^0\d{9}$/; // Fallback to default
	}
};

export const Default = (props: CreditCheckComponentProps) => {
	const router = useRouter();
	
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm({
		mode: "onSubmit",
		reValidateMode: "onChange",
		defaultValues: {
			cellphone: "",
		},
	});

	const onSubmit = (data: Record<string, unknown>) => {
		// Handle form submission
		console.log('Credit check form submitted :', data);
		
		// Store cellphone number in localStorage
		if (data.cellphone) {
			localStorage.setItem('cellphone', data.cellphone as string);
		}
		
		// Redirect to next page (you can customize the URL)
		router.push('/loans/validate-otp'); // Replace with your desired route
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "");
		
		// Only clear validation errors when the input matches the regex pattern
		if (errors.cellphone && value) {
			const regex = getRegex(props.fields?.CellPhone_ValidationRegex?.value?.toString()) || /^0\d{9}$/;
			if (regex.test(value)) {
				clearErrors('cellphone');
			}
		}
	};

	return (
		<Card className="w-full mx-auto bg-white">
			<CardContent className="p-6 space-y-6">
				<div className="flex justify-center mb-4">
					<div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
						<Timer className="w-10 h-10 text-gray-600" />
					</div>
				</div>

				<h2 className="text-xl font-semibold text-center text-gray-800"><Text field={props.fields?.JourneyStep_Heading} /></h2>

				<p className="text-center text-gray-600 text-sm"><Text field={props.fields?.JourneyStep_SubHeading} /></p>

				<p className="text-center text-gray-600 text-sm"><Text field={props.fields?.SubHeadingMessage} /></p>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<StandardNumberInput
					{...register("cellphone", {
						required: props.fields?.CellPhone_ValidationErrorMessage?.value?.toString() || "Cellphone number is required",
						pattern: {
							value: getRegex(props.fields?.CellPhone_ValidationRegex?.value?.toString()) || /^0\d{9}$/,
							message: props.fields?.CellPhone_ValidationErrorMessage?.value?.toString() || "Invalid cellphone number format"
						}
					})}
					label={props.fields?.CellPhone_Label}
					placeholder={props.fields?.CellPhone_Placeholder?.value?.toString()}
					type="tel"
					showLabel={true}
					maxLength={10}
					onChange={handleInputChange}
					inputRegex={getRegex(props.fields?.CellPhone_ValidationRegex?.value?.toString())}
					formatErrorMessage={props.fields?.CellPhone_ValidationErrorMessage?.value?.toString()}
					containerClassName="space-y-2"
					labelContainerClassName="flex items-center gap-2"
					error={errors.cellphone?.message as string}
				/>
					<Button type="submit" className="w-full bg-[#2c5f5d] hover:bg-[#234a48] text-white py-6 text-base font-medium">
						<Text field={props.fields?.SubmitButtonText} />
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
