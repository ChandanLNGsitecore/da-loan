"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { Input } from "components/da-loan/ui-premetive/input";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { residentialAddressSchema, type ResidentialAddress } from "lib/schemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/da-loan/ui-premetive/select";

const PROVINCES = ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape"];

interface ResidentialAddressProps {
	readonly onSubmit: (data: ResidentialAddress) => void;
	readonly initialData?: Partial<ResidentialAddress>;
	readonly onBack?: () => void;
}

export const Default = ({ onSubmit, initialData, onBack }: Readonly<ResidentialAddressProps>) => {
	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm<ResidentialAddress>({
		resolver: zodResolver(residentialAddressSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			streetLine1: initialData?.streetLine1 || "",
			streetLine2: initialData?.streetLine2 || "",
			cityTown: initialData?.cityTown || "",
			province: initialData?.province || "",
			postalCode: initialData?.postalCode || "",
		},
	});

	const province = useWatch({ control, name: "province" });

	const onFormSubmit = handleSubmit((data) => {
		onSubmit(data);
	});

	return (
		<Card className="w-full mx-auto bg-white">
			<CardContent className="p-6 md:p-8 space-y-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-semibold text-gray-800">Your Residential Address</h2>
					<div className="text-sm text-gray-600 font-medium">Step 3 of 5</div>
				</div>

				<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
					<div className="h-full bg-[#2c5f5d] transition-all duration-300" style={{ width: "60%" }} />
				</div>

				<div className="space-y-4">
					<div>
						<label htmlFor="streetLine1" className="block text-sm font-medium text-gray-800 mb-1">
							Address line 1
						</label>
						<Input id="streetLine1" type="text" placeholder="Enter street line 1" {...register("streetLine1")} />
						{errors.streetLine1 && <p className="text-sm text-red-500 mt-1">{errors.streetLine1.message}</p>}
					</div>

					<div>
						<label htmlFor="streetLine2" className="block text-sm font-medium text-gray-800 mb-1">
							Address line 2 (optional)
						</label>
						<Input id="streetLine2" type="text" placeholder="Enter street line 2" {...register("streetLine2")} />
						{errors.streetLine2 && <p className="text-sm text-red-500 mt-1">{errors.streetLine2.message}</p>}
					</div>

					<div>
						<label htmlFor="cityTown" className="block text-sm font-medium text-gray-800 mb-1">
							City/Town
						</label>
						<Input id="cityTown" type="text" placeholder="Enter city or town" {...register("cityTown")} />
						{errors.cityTown && <p className="text-sm text-red-500 mt-1">{errors.cityTown.message}</p>}
					</div>

					<div>
						<label htmlFor="province" className="block text-sm font-medium text-gray-800 mb-1">
							Province
						</label>
						<Select value={province} onValueChange={(value) => setValue("province", value, { shouldValidate: true })}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select province" />
							</SelectTrigger>
							<SelectContent>
								{PROVINCES.map((provinceOption) => (
									<SelectItem key={provinceOption} value={provinceOption}>
										{provinceOption}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.province && <p className="text-sm text-red-500 mt-1">{errors.province.message}</p>}
					</div>

					<div>
						<label htmlFor="postalCode" className="block text-sm font-medium text-gray-800 mb-1">
							Post code
						</label>
						<Input id="postalCode" type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Enter post code" {...register("postalCode")} />
						{errors.postalCode && <p className="text-sm text-red-500 mt-1">{errors.postalCode.message}</p>}
					</div>

					<div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
						<Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
						<p className="text-sm text-gray-700">
							Later in the process, you&apos;ll need to upload <span className="font-semibold">proof of address</span> (utility bill or bank statement).
						</p>
					</div>
				</div>

				<div className="flex gap-3 pt-4">
					{onBack && (
						<Button onClick={onBack} variant="outline" className="flex-1 py-6 border-gray-300 text-gray-700 hover:bg-gray-50">
							<ChevronLeft className="w-4 h-4 mr-1" />
							Back
						</Button>
					)}

					<Button onClick={onFormSubmit} className="flex-1 py-6 text-white bg-[#2c5f5d] hover:bg-[#234a48]">
						Continue
						<ChevronRight className="w-4 h-4 ml-1" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
