"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { cellphoneSchema, type Cellphone } from "lib/schemas";
import { Input } from "components/da-loan/ui-premetive/input";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "components/da-loan/ui-premetive/button";

import { Timer } from "components/da-loan/ui-premetive/timer";
import { ConfirmCellPhoneComponentProps } from 'src/types/ConfirmCellPhone';
import { StandardNumberInput } from "../ui/standard-number-input";
import {	
	Text,
} from '@sitecore-content-sdk/nextjs';
// Utility function to convert string regex to RegExp
const getRegex = (regexString?: string): RegExp | undefined => {
	if (!regexString) return /^0(?!000000000)\d{9}$/; // Default cellphone regex
	try {
		// Remove leading/trailing slashes if present and create RegExp
		const cleaned = regexString.replace(/^\/|\/$/g, '');
		return new RegExp(cleaned);
	} catch {
		return /^0(?!000000000)\d{9}$/; // Fallback to default
	}
};

export const Default = (props: ConfirmCellPhoneComponentProps) => {
	const [inputValue, setInputValue] = useState("");
	const router = useRouter();
	
	
	// Safely access localStorage after component mounts
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedCellphone = localStorage.getItem("cellphone");
			if (storedCellphone) {
				setInputValue(storedCellphone);
			}
		}
	}, []);
	
const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm({
		mode: "onSubmit",
		reValidateMode: "onChange",
		defaultValues: {
			Confirmcellphone: "",
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
		router.push('/loans/thank-you'); 
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "");
		setInputValue(value);
		if (typeof window !== "undefined") {
			localStorage.setItem('cellphone', value);
		}
		
		// Only clear validation errors when the input matches the regex pattern
		if (errors.Confirmcellphone && value) {
			const regex = getRegex(props.fields?.CellPhone_ValidationRegex?.value?.toString()) || /^0(?!000000000)\d{9}$/;
			if (regex.test(value)) {
				clearErrors('Confirmcellphone');
			}
		}
	};

	return (
		<Card className="w-full mx-auto bg-white">
			<CardContent className="p-6 md:p-8 space-y-6">
				<div className="mb-4">
					<h2 className="text-2xl font-semibold text-gray-800"><Text field={props.fields.JourneyStep_Heading} /></h2>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<p className="text-sm text-gray-800">
							<Text field={props.fields.JourneyStep_SubHeading} />
						</p>
						<p className="text-sm text-gray-800">
							<Text field={props.fields.SubHeadingMessage} />
						</p>
					</div>

					<StandardNumberInput
						{...register(("Confirmcellphone"), {
							required: props.fields?.CellPhone_ValidationErrorMessage?.value?.toString() || "Cellphone number is required",
							pattern: {
								value: getRegex(props.fields?.CellPhone_ValidationRegex?.value?.toString()) || /^0(?!000000000)\d{9}$/,
								message: props.fields?.CellPhone_ValidationErrorMessage?.value?.toString() || "Invalid cellphone number format"
							}
						})}
						label={props.fields?.CellPhone_Label}
						placeholder={props.fields?.CellPhone_Placeholder?.value?.toString()}
						type="tel"
						showLabel={false}
						maxLength={10}
						value={inputValue}
						onChange={handleInputChange}
					inputRegex={getRegex(props.fields?.CellPhone_ValidationRegex?.value?.toString())}
					formatErrorMessage={props.fields?.CellPhone_ValidationErrorMessage?.value?.toString()}
					containerClassName="space-y-2"
					inputClassName="w-full text-lg font-medium text-center py-4"
					error={errors.Confirmcellphone?.message as string}
					/>

					<div className="flex gap-4">
					
							<Button type="button" onClick={() => router.back()} variant="outline" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-800 py-6 text-base font-medium">
								<Text field={props.fields.BackBtnText} />
							</Button>
						
						<Button type="submit" className="flex-1 bg-[#2c5f5d] hover:bg-[#234a48] text-white py-6 text-base font-medium">
							<Text field={props.fields.SubmitButtonText} />
							<ChevronRight className="w-4 h-4 ml-2" />
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

