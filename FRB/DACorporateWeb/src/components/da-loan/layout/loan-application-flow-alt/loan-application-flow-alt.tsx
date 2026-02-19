"use client";

import { useState, useEffect } from "react";
// import { ApplicationForm } from "components/da-loan/steps/application-form";
// import { ApplicationDetailsForm } from "components/da-loan/steps/application-details-form";
// import { CreditCheck } from "components/da-loan/steps/credit-check";
// import { OTPVerification } from "components/da-loan/steps/otp-verification";
// import { Congratulations } from "components/da-loan/steps/congratulations";
// import { Employment } from "components/da-loan/steps/employment";
// import { Banking } from "components/da-loan/steps/banking";
// import { ResidentialAddress } from "components/da-loan/steps/residential-address";
// import { LivingArrangements } from "components/da-loan/steps/living-arrangements";
// import { DocumentUpload, type UploadedDocuments } from "components/da-loan/steps/document-upload";
// import { LoanReview } from "components/da-loan/steps/loan-review";
// import { CellphoneConfirmation } from "components/da-loan/steps/cellphone-confirmation";
// import { ThankYou } from "components/da-loan/steps/thank-you";
// import { Confirmation } from "components/da-loan/steps/confirmation";
// import { Affordability } from "components/da-loan/steps/affordability";
import type {
	LoanApplication,
	Cellphone,
	OTP,
	LoanOffer,
	Employment as EmploymentType,
	Banking as BankingType,
	ResidentialAddress as ResidentialAddressType,
	LivingArrangements as LivingArrangementsType,
	Affordability as AffordabilityType,
} from "lib/schemas";
import { calculateLoanOffer } from "lib/schemas";

type Step =
	| "application"
	| "application-details"
	| "credit-check"
	| "otp"
	| "congratulations"
	| "employment"
	| "banking"
	| "residential-address"
	| "living-arrangements"
	| "affordability"
	| "document-upload"
	| "review"
	| "cellphone-confirmation"
	| "thank-you"
	| "confirmation";

export function LoanApplicationFlowAlt() {
	// const [currentStep, setCurrentStep] = useState<Step>("application");
	// const [applicationData, setApplicationData] = useState<LoanApplication | null>(null);
	// const [applicationDraft, setApplicationDraft] = useState<Partial<LoanApplication> | null>(null);
	// const [cellphone, setCellphone] = useState<string>("");
	// const [loanOffer, setLoanOffer] = useState<LoanOffer | null>(null);
	// const [employment, setEmployment] = useState<EmploymentType | null>(null);
	// const [banking, setBanking] = useState<BankingType | null>(null);
	// const [residentialAddress, setResidentialAddress] = useState<ResidentialAddressType | null>(null);
	// const [livingArrangements, setLivingArrangements] = useState<LivingArrangementsType | null>(null);
	// const [affordability, setAffordability] = useState<AffordabilityType | null>(null);
	// const [documents, setDocuments] = useState<UploadedDocuments | null>(null);
	// useEffect(() => {
	// 	window.scrollTo({ top: 0, behavior: "smooth" });
	// }, [currentStep]);

	// const handleApplicationSubmit = (data: Pick<LoanApplication, "amount" | "repaymentMonths" | "loanPurpose">) => {
	// 	setApplicationDraft((prev) => ({ ...prev, ...data }));
	// 	setCurrentStep("application-details");
	// };

	// const handleApplicationDetailsSubmit = (
	// 	data: Pick<LoanApplication, "email" | "firstName" | "surname" | "idNumber" | "monthlyIncome" | "acceptTerms" | "backgroundCheckConsent">
	// ) => {
	// 	const merged = { ...(applicationDraft ?? {}), ...data } as LoanApplication;
	// 	setApplicationDraft(merged);
	// 	setApplicationData(merged);
	// 	setCurrentStep("credit-check");
	// };

	// const handleCreditCheckSubmit = (data: Cellphone) => {
	// 	setCellphone(data.cellphone);
	// 	setCurrentStep("otp");
	// };

	// const handleOTPSubmit = (data: OTP) => {
	// 	void data;
	// 	if (applicationData) {
	// 		const offer = calculateLoanOffer(applicationData.amount, applicationData.repaymentMonths);
	// 		setLoanOffer(offer);
	// 		setCurrentStep("congratulations");
	// 	}
	// };

	// const handleOfferAccept = (finalOffer: LoanOffer) => {
	// 	setLoanOffer(finalOffer);
	// 	setCurrentStep("employment");
	// };

	// const handleEmploymentSubmit = (employmentData: EmploymentType) => {
	// 	setEmployment(employmentData);
	// 	setCurrentStep("banking");
	// };

	// const handleBankingSubmit = (bankingData: BankingType) => {
	// 	setBanking(bankingData);
	// 	setCurrentStep("residential-address");
	// };

	// const handleResidentialAddressSubmit = (address: ResidentialAddressType) => {
	// 	setResidentialAddress(address);
	// 	setCurrentStep("living-arrangements");
	// };

	// const handleLivingArrangementsSubmit = (arrangements: LivingArrangementsType) => {
	// 	setLivingArrangements(arrangements);
	// 	setCurrentStep("affordability");
	// };

	// const handleAffordabilitySubmit = (data: AffordabilityType) => {
	// 	setAffordability(data);
	// 	setCurrentStep("document-upload");
	// };

	// const handleDocumentUploadSubmit = (uploadedDocuments: UploadedDocuments) => {
	// 	setDocuments(uploadedDocuments);
	// 	setCurrentStep("review");
	// };

	// const handleReviewAccept = () => {
	// 	setCurrentStep("cellphone-confirmation");
	// };

	// const handleCellphoneConfirmation = (data: Cellphone) => {
	// 	setCellphone(data.cellphone);
	// 	setCurrentStep("thank-you");
	// };

	// const handleThankYouContinue = () => {
	// 	console.log("Final loan application submitted:", {
	// 		application: applicationData,
	// 		cellphone,
	// 		offer: loanOffer,
	// 		employment,
	// 		banking,
	// 		residentialAddress,
	// 		livingArrangements,
	// 		documents,
	// 	});
	// 	setCurrentStep("confirmation");
	// };

	return (
		<section className="pt-8 md:pt-16 bg-white">
			<div className="min-h-screen py-8 px-4 md:pb-64 max-w-[800px] mx-auto space-y-8">
        <h1 className="text-6xl font-medium text-gray-800 font-heading text-center text-balance">Your <span className="text-white bg-[#D0B700] px-2 pt-2 rounded-md inline-block mb-2">Personal Loan</span> is just a few steps away</h1>
				<section>
					{/* <div className="w-full mx-auto">
						{currentStep === "application" && (
							<ApplicationForm onSubmit={handleApplicationSubmit} initialData={applicationDraft || applicationData || undefined} />
						)}
						{currentStep === "application-details" && (
							<ApplicationDetailsForm
								onSubmit={handleApplicationDetailsSubmit}
								initialData={applicationDraft || applicationData || undefined}
								onBack={() => setCurrentStep("application")}
							/>
						)}
						{currentStep === "credit-check" && <CreditCheck onSubmit={handleCreditCheckSubmit} initialCellphone={cellphone} />}
						{currentStep === "otp" && <OTPVerification onSubmit={handleOTPSubmit} cellphone={cellphone} />}
						{currentStep === "congratulations" && loanOffer && <Congratulations initialOffer={loanOffer} onSubmit={handleOfferAccept} />}
						{currentStep === "employment" && <Employment onSubmit={handleEmploymentSubmit} initialData={employment || undefined} />}
						{currentStep === "banking" && (
							<Banking onSubmit={handleBankingSubmit} initialData={banking || undefined} onBack={() => setCurrentStep("employment")} />
						)}
						{currentStep === "residential-address" && (
							<ResidentialAddress
								onSubmit={handleResidentialAddressSubmit}
								initialData={residentialAddress || undefined}
								onBack={() => setCurrentStep("banking")}
							/>
						)}
						{currentStep === "living-arrangements" && (
							<LivingArrangements
								onSubmit={handleLivingArrangementsSubmit}
								initialData={livingArrangements || undefined}
								onBack={() => setCurrentStep("residential-address")}
							/>
						)}
						{currentStep === "affordability" && (
							<Affordability
								onSubmit={handleAffordabilitySubmit}
								initialData={affordability || undefined}
								onBack={() => setCurrentStep("living-arrangements")}
							/>
						)}
						{currentStep === "document-upload" && <DocumentUpload onSubmit={handleDocumentUploadSubmit} onBack={() => setCurrentStep("affordability")} />}
						{currentStep === "review" && <LoanReview onAccept={handleReviewAccept} onBack={() => setCurrentStep("document-upload")} />}
						{currentStep === "cellphone-confirmation" && (
							<CellphoneConfirmation onSubmit={handleCellphoneConfirmation} initialCellphone={cellphone} onBack={() => setCurrentStep("review")} />
						)}
						{currentStep === "thank-you" && <ThankYou onContinue={handleThankYouContinue} />}
						{currentStep === "confirmation" && <Confirmation loanAmount={loanOffer?.approvedAmount} />}
					</div> */}
				</section>
			</div>
		</section>
	);
}
