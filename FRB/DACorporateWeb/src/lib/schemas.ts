import { z } from "zod";

// Schema for the loan application form
export const loanApplicationSchema = z.object({
  amount: z.number({ message: "Please select a loan amount" })
    .min(7000, "Minimum loan amount is R7,000")
    .max(20000, "Maximum loan amount is R20,000")
    .refine((val) => val % 1000 === 0, "Loan amount must be in increments of R1,000"),
  repaymentMonths: z.number().min(7, "Minimum repayment period is 7 months").max(24, "Maximum repayment period is 24 months"),
  loanPurpose: z.string().min(1, "Please select a loan purpose"),
  firstName: z.string().min(2, "First name must be at least 2 characters").max(100),
  surname: z.string().min(2, "Surname must be at least 2 characters").max(100),
  idNumber: z.string().regex(/^\d{13}$/, "ID number must be 13 digits"),
  monthlyIncome: z.number().min(0, "Monthly income must be positive"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to continue",
  }),
  backgroundCheckConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to the required background checks to continue",
  }),
});

export type LoanApplication = z.infer<typeof loanApplicationSchema>;

// Step 1 schema (loan details)
export const loanApplicationStep1Schema = z.object({
  amount: z.number({ message: "Please select a loan amount" })
    .min(7000, "Minimum loan amount is R7,000")
    .max(20000, "Maximum loan amount is R20,000")
    .refine((val) => val % 1000 === 0, "Loan amount must be in increments of R1,000"),
  repaymentMonths: z.number().min(7, "Minimum repayment period is 7 months").max(24, "Maximum repayment period is 24 months"),
  loanPurpose: z.string().min(1, "Please select a loan purpose"),
});

// Step 2 schema (personal details)
export const loanApplicationStep2Schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(100),
  surname: z.string().min(2, "Surname must be at least 2 characters").max(100),
  idNumber: z.string().regex(/^\d{13}$/, "ID number must be 13 digits"),
  monthlyIncome: z.number().min(0, "Monthly income must be positive"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to continue",
  }),
  backgroundCheckConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to the required background checks to continue",
  }),
});

// Schema for cellphone number
export const cellphoneSchema = z.object({
  cellphone: z.string()
    .regex(/^0\d{9}$/, "Cellphone number must be 10 digits starting with 0")
    .min(10, "Cellphone number must be 10 digits")
    .max(10, "Cellphone number must be 10 digits"),
});

export type Cellphone = z.infer<typeof cellphoneSchema>;

// Schema for OTP verification
export const otpSchema = z.object({
  otp: z.string()
    .regex(/^\d{6}$/, "OTP must be 6 digits")
    .length(6, "OTP must be 6 digits"),
});

export type OTP = z.infer<typeof otpSchema>;

// Loan offer calculation
export interface LoanOffer {
  approvedAmount: number;
  requestedAmount: number;
  maxCredit: number;
  monthlyRepayment: number;
  loanTerm: number;
  interestRate: number;
}

// Employment schema
export const employmentSchema = z.object({
  employmentStatus: z.string().min(1, "Please select your employment status"),
  employmentType: z.string().optional(),
  selfEmployedDuration: z.string().optional(),
  employerName: z.string().min(2, "Employer name is required"),
  sector: z.string().min(1, "Please select a sector"),
  occupation: z.string().min(2, "Occupation is required"),
  incomeFrequency: z.string().min(1, "Please select income frequency"),
  salaryDate: z.string().min(1, "Salary date is required"),
  payDay: z.string().optional(),
  incomeProvider: z.string().min(2, "Income provider is required"),
  spxConsent: z.string().optional(),
}).refine((data) => {
  // Employment Type is required if Employment Status is "Employed" or "Other"
  if (data.employmentStatus === "Employed" || data.employmentStatus === "Other") {
    return !!data.employmentType;
  }
  return true;
}, {
  message: "Please select an employment type",
  path: ["employmentType"],
}).refine((data) => {
  // Self-employed duration is required if Employment Status is "Self-Employed"
  if (data.employmentStatus === "Self-Employed") {
    return !!data.selfEmployedDuration;
  }
  return true;
}, {
  message: "Please specify how long you have been self-employed",
  path: ["selfEmployedDuration"],
}).refine((data) => {
  // SPX Consent is required if Employment Status is "Employed"
  if (data.employmentStatus === "Employed") {
    return !!data.spxConsent;
  }
  return true;
}, {
  message: "Please provide SPX consent",
  path: ["spxConsent"],
});

export type Employment = z.infer<typeof employmentSchema>;

// Banking schema
export const bankingSchema = z.object({
  bankName: z.string().min(1, "Please select your bank"),
  accountType: z.string().min(1, "Please select account type"),
  accountNumber: z.string().min(5, "Account number is required"),
  branchCode: z.string().min(3, "Branch code is required"),
});

export type Banking = z.infer<typeof bankingSchema>;

// Additional details schema (kept for backward compatibility if needed)
export const additionalDetailsSchema = employmentSchema.merge(bankingSchema);
export type AdditionalDetails = z.infer<typeof additionalDetailsSchema>;

// Residential address schema
export const residentialAddressSchema = z.object({
  streetLine1: z.string().min(5, "Street line 1 is required"),
  streetLine2: z.string().optional(),
  cityTown: z.string().min(2, "City/Town is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().min(4, "Post code is required"),
});

export type ResidentialAddress = z.infer<typeof residentialAddressSchema>;

// Living arrangements schema
export const livingArrangementsSchema = z.object({
  race: z.string().min(1, "Please select your race"),
  countryOfBirth: z.string().min(1, "Please select your country of birth"),
  whereDoYouLive: z.string().min(1, "Please select where you live"),
  homeLanguage: z.string().min(1, "Please select your home language"),
  maritalStatus: z.string().min(1, "Please select your marital status"),
  maritalType: z.string().optional(),
  numberOfDependents: z.number().optional(), // Hidden field with default value in backend
}).refine((data) => {
  // Marital Type is required if Marital Status is "Married"
  if (data.maritalStatus === "Married") {
    return !!data.maritalType;
  }
  return true;
}, {
  message: "Please select a marital type",
  path: ["maritalType"],
});

export type LivingArrangements = z.infer<typeof livingArrangementsSchema>;

// Affordability schema
export const affordabilitySchema = z.object({
  monthlyIncomeAfterTax: z
    .number({ message: "Please enter your income after tax" })
    .min(0, "Monthly income must be zero or more"),
  monthlyCommitments: z
    .number({ message: "Please enter your monthly commitments" })
    .min(0, "Monthly commitments must be zero or more"),
  otherLivingExpenses: z
    .number({ message: "Please enter other living expenses" })
    .min(0, "Other living expenses must be zero or more"),
});

export type Affordability = z.infer<typeof affordabilitySchema>;

export function calculateLoanOffer(requestedAmount: number, months: number, approvedAmount?: number): LoanOffer {
  const interestRate = 28.85;
  const monthlyRate = interestRate / 100 / 12;
  
  // Determine approved amount based on scenarios
  let finalApprovedAmount: number;
  let maxCredit: number;
  
  if (approvedAmount === undefined) {
    // Scenario-based approval logic
    if (requestedAmount === 8000) {
      // Scenario 3: R8000 - User is offered MORE than requested
      finalApprovedAmount = 10000; // Offer R10 000 (above requested)
      maxCredit = 20000;
    } else if (requestedAmount === 12000) {
      // Scenario 2: R12000 - User meets the requested amount exactly
      finalApprovedAmount = 12000; // Exact match
      maxCredit = 20000;
    } else if (requestedAmount > 15000) {
      // Scenario 1: More than R15000 - User does NOT meet requested amount
      finalApprovedAmount = Math.floor(requestedAmount * 0.625); // 62.5% of requested
      maxCredit = requestedAmount * 1.33; // Show max credit slightly above requested
    } else {
      // Default behavior for other amounts
      finalApprovedAmount = Math.floor(requestedAmount * 0.75); // 75% of requested
      maxCredit = requestedAmount * 1.5;
    }
  } else {
    // If explicitly provided, use it
    finalApprovedAmount = approvedAmount;
    maxCredit = Math.max(requestedAmount * 2, finalApprovedAmount);
  }
  
  const monthlyRepayment = finalApprovedAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  
  return {
    approvedAmount: finalApprovedAmount,
    requestedAmount,
    maxCredit,
    monthlyRepayment: Math.round(monthlyRepayment),
    loanTerm: months,
    interestRate,
  };
}

