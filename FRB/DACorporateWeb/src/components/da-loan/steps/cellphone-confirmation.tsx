"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cellphoneSchema, type Cellphone } from "lib/schemas";
import { Button } from "components/da-loan/ui-premetive/button";
import { Input } from "components/da-loan/ui-premetive/input";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { ChevronRight } from "lucide-react";

interface CellphoneConfirmationProps {
	readonly onSubmit: (data: Cellphone) => void;
	readonly initialCellphone?: string;
	readonly onBack?: () => void;
}

export const Default = ({ onSubmit, initialCellphone, onBack }: Readonly<CellphoneConfirmationProps>) =>  {
	const [inputValue, setInputValue] = useState(initialCellphone || "");

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Cellphone>({
		resolver: zodResolver(cellphoneSchema),
		defaultValues: {
			cellphone: initialCellphone || "",
		},
	});

	const onFormSubmit = handleSubmit((data) => {
		onSubmit(data);
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replaceAll(/\D/g, "");
		setInputValue(value);
		setValue("cellphone", value, { shouldValidate: true });
	};

	return (
		<Card className="w-full mx-auto bg-white">
			<CardContent className="p-6 md:p-8 space-y-6">
				<div className="mb-4">
					<h2 className="text-2xl font-semibold text-gray-800">Confirm Cellphone Number</h2>
				</div>

				<form onSubmit={onFormSubmit} className="space-y-6">
					<div className="space-y-4">
						<p className="text-sm text-gray-800">
							You&apos;re almost there, please confirm that the cell phone number that you&apos;ve provided is the number linked to your bank account. If it is different simply change it below
						</p>
						<p className="text-sm text-gray-800">
							Once you&apos;ve confirmed the number, your bank will send a message to your phone asking you to authorise your debit order through one of their electronic channels. Your contract reference (CR) number is included in your debit order mandate which has been sent to you to authenticate.
						</p>
					</div>

					<div className="space-y-2">
						<Input
							{...register("cellphone")}
							type="tel"
							value={inputValue}
							onChange={handleInputChange}
							placeholder="E.g. 0790287461"
							maxLength={10}
							className="w-full text-lg font-medium text-center py-4"
							id="cellphone"
						/>
						{errors.cellphone && <p className="text-sm text-red-500">{errors.cellphone.message}</p>}
					</div>

					<div className="flex gap-4">
						{onBack && (
							<Button type="button" onClick={onBack} variant="outline" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-6 text-base font-medium">
								Back
							</Button>
						)}
						<Button type="submit" className="flex-1 bg-[#2c5f5d] hover:bg-[#234a48] text-white py-6 text-base font-medium">
							Confirmed
							<ChevronRight className="w-4 h-4 ml-2" />
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

