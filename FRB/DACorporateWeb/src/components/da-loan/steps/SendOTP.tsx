"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "components/da-loan/ui-primitive/button";
import { Card, CardContent } from "components/da-loan/ui-primitive/card";
import { Timer } from "components/da-loan/ui-primitive/timer";
import { CreditCheckComponentProps } from 'src/types/CreditCheck';
import { StandardNumberInput } from "../ui/standard-number-input";
import { Text, Link as ContentSdkLink, RichText as ContentSdkRichText } from "@sitecore-content-sdk/nextjs";
import { SendOTPComponentProps } from "src/types/SendOTP";

import { useState } from "react";
import { Input } from "../ui-primitive/input";

// Utility function to convert string regex to RegExp
const getRegex = (regexString?: string): RegExp | undefined => {
	if (!regexString) return /^0[678]\d{8}$/; // Default cellphone regex
	try {
		// Remove leading/trailing slashes if present and create RegExp
		const cleaned = regexString.replace(/^\/|\/$/g, '');
		return new RegExp(cleaned);
	} catch {
		return /^0[678]\d{8}$/; // Fallback to default
	}
};

export const Default = (props: SendOTPComponentProps) => {
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
			email: ""
		},
	});

	const [sentMethod, setSentMethod] = useState<'cellphone' | 'email' | null>(null);

	const handleSend = (method: 'cellphone' | 'email') => {
		setSentMethod(method);
		
		if (method === 'cellphone') {
			const href = props.fields?.SendCellPhoneLink?.value?.href;
			if (href) router.push(href);
		} else if (method === 'email') {
			const href = props.fields?.SendEmailLink?.value?.href;
			if (href) router.push(href);
		}
	};



	return (
		<Card className="w-full mx-auto bg-white">
			<CardContent className="p-6 md:p-8 space-y-6">
				<div className="mb-4">
					<h2 className="text-2xl font-semibold text-gray-800"><Text field={props.fields?.JourneyStep_Heading} /></h2>
				</div>

				<div className="space-y-4 text-sm text-gray-800">
					<p>
						<Text field={props.fields?.JourneyStep_SubHeading} />
					</p>
					<p><ContentSdkRichText field={props.fields?.SubHeadingMessage} /></p>
				</div>

				<div className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="cellphone" className="text-sm font-medium text-gray-700">
							<Text field={props.fields?.CellPhone_Label} />
						</label>
						<div className="flex gap-2">
							<Input
								id="cellphone"
								readOnly
							
								value="8105911372"
								placeholder={props.fields?.CellPhone_Placeholder?.value?.toString() || "E.g. 079 343 2356"}
								className="text-lg font-medium text-left py-4"
							/>
							<Button
								type="button"
								onClick={() => handleSend("cellphone")}
							
								variant="outline"
								className="bg-[#2c5f5d] hover:bg-[#234a48] text-white py-6 text-base font-medium"
							>
								{props.fields?.SendCellPhoneLink?.value?.text}
							</Button>
						</div>
						{sentMethod === "cellphone" && (
							<p className="text-sm text-green-600 text-center"><Text field={props.fields?.SendCellPhoneMessage} /></p>
						)}
					</div>

					<div className="space-y-2">
						<label htmlFor="email" className="text-sm font-medium text-gray-700">
							<Text field={props.fields?.Email_Label} />
						</label>
						<div className="flex gap-2">
						<Input
							id="email"
							readOnly
						
							value="chandan.kumar@lngconsultancy.co.in"
							placeholder={props.fields?.Email_Placeholder?.value?.toString() || "No email provided"}
							className="text-lg font-medium text-left py-4"
						/>
						<Button
							type="button"
							onClick={() => handleSend("email")}
							
							variant="outline"
							className="bg-[#2c5f5d] hover:bg-[#234a48] text-white py-6 text-base font-medium"
						>
								{props.fields?.SendEmailLink.value.text}
							</Button>
						</div>
						{sentMethod === "email" && <p className="text-sm text-green-600 text-center"><Text field={props.fields?.SendEmailMessage} /></p>}
					</div>
				</div>

			
					<div className="flex gap-4">
						<Button
							type="button"
							variant="outline"
							className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800 py-6 text-base font-medium"
							onClick={() => router.back()}
						>
							<Text field={props.fields?.BackButtonText} />
						</Button>
					</div>
			</CardContent>
		</Card>
	);
}
