"use client";

import { Controller, useForm } from "react-hook-form";
import { TermsModalInput } from "components/da-loan/ui/terms-modal-input";
import { StandardTextInput } from "components/da-loan/ui/standard-text-input";
import {  SouthAfricanIDInput,  validateSouthAfricanID } from "components/da-loan/ui/south-african-id-input";
import { IncomeInput } from "components/da-loan/ui/income-input";
import { Checkbox } from "components/da-loan/ui-primitive/checkbox";
import { Label } from "components/da-loan/ui-primitive/label";
import { Card, CardContent } from "components/da-loan/ui-primitive/card";
import { Button } from "components/da-loan/ui-primitive/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link as ContentSdkLink, Text } from "@sitecore-content-sdk/nextjs";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SitecoreFields = Record<string, any>;

interface ApplicationDetailsProps {
  fields?: SitecoreFields;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// export function ApplicationDetailsForm({ onSubmit, initialData, onBack }: Readonly<ApplicationDetailsFormProps>) {
export const Default = (props: ApplicationDetailsProps) => {
  const router = useRouter();

  const { fields: propsFields = {} } = props;
  const fields = propsFields.fields || propsFields;

  console.log("Application Details Props:", props);
  console.log("Application Details Fields:", fields);

  const onSubmit = (data: Record<string, unknown>) => {
    console.log("Form submitted:", data);
    router.push("/loans/request-otp");
  };
	
  // Convert string regex to RegExp object
  const getRegex = (regexString: string | undefined) => {
    if (!regexString) return undefined;
    try {
      return new RegExp(regexString);
    } catch {
      return undefined;
    }
  };

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      firstName: "",
      surname: "",
      idNumber: "",
      monthlyIncome: 0,
      acceptTerms: false,
      backgroundCheckConsent: false,
    },
  });

  const onFormSubmit = handleSubmit((data) => {
    console.log("Form submitted:", data);
    onSubmit(data);
  });
	
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    onFormSubmit();
  };

	const handleBack = () => {
    router.back();
  };

  return (
    <Card className="w-full mx-auto bg-white">
      <CardContent className="p-6 md:p-8 space-y-6">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-800 font-heading text-center">
              <Text field={fields?.JourneyStep_SubHeading} />
            </h3>

            <StandardTextInput
              {...register("email", {
                required: fields?.Email_ValidationErrorMessage?.value,
                minLength: {
                  value: fields?.Email_MinLength?.value,
                  message: fields?.Email_MinLengthErrorMessage?.value,
                },
              })}
              name={fields?.Email_FieldID?.value}
              label={<Text field={fields?.Email_Label} />}
              placeholder={fields?.Email_Placeholder?.value}
              inputRegex={getRegex(fields?.Email_ValidationRegex?.value)}
              showHelpIcon={true}
              tooltipText={fields?.Email_Tooltip?.value}
              containerClassName="space-y-2"
              labelContainerClassName="flex items-center gap-2"
              labelClassName="text-sm text-gray-800"
              inputClassName="w-full"
              helpIconClassName="w-4 h-4 text-gray-400"
              maxLength={fields?.Email_MaxLength?.value}
              minLength={fields?.Email_MinLength?.value}
              minLengthErrorMessage={fields?.Email_MinLengthErrorMessage?.value}
              error={errors.email?.message as string}
            />

            <StandardTextInput
              {...register("firstName", {
                required: fields?.FirstName_ValidationErrorMessage?.value,
                minLength: {
                  value: fields?.FirstName_MinLength?.value,
                  message: fields?.FirstName_MinLengthErrorMessage?.value,
                },
              })}
              name={fields?.FirstName_FieldID?.value}
              label={<Text field={fields?.FirstName_Label} />}
              placeholder={fields?.FirstName_Placeholder?.value}
              inputRegex={getRegex(fields?.FirstName_ValidationRegex?.value)}
              showHelpIcon={true}
              tooltipText={fields?.FirstName_Tooltip?.value}
              containerClassName="space-y-2"
              labelContainerClassName="flex items-center gap-2"
              labelClassName="text-sm text-gray-800"
              inputClassName="w-full"
              helpIconClassName="w-4 h-4 text-gray-400"
              maxLength={fields?.FirstName_MaxLength?.value}
              minLength={fields?.FirstName_MinLength?.value}
              minLengthErrorMessage={
                fields?.FirstName_MinLengthErrorMessage?.value
              }
              error={errors.firstName?.message as string}
            />

            <StandardTextInput
              {...register("surname", {
                required: fields?.LastName_ValidationErrorMessage?.value,
                minLength: {
                  value: fields?.LastName_MinLength?.value,
                  message: fields?.LastName_MinLengthErrorMessage?.value,
                },
              })}
              name={fields?.LastName_FieldID?.value}
              label={<Text field={fields?.LastName_Label} />}
              placeholder={fields?.LastName_Placeholder?.value}
              inputRegex={getRegex(fields?.LastName_ValidationRegex?.value)}
              showHelpIcon={true}
              tooltipText={fields?.LastName_Tooltip?.value}
              containerClassName="space-y-2"
              labelContainerClassName="flex items-center gap-2"
              labelClassName="text-sm text-gray-800"
              inputClassName="w-full"
              helpIconClassName="w-4 h-4 text-gray-400"
              minLength={fields?.LastName_MinLength?.value}
              maxLength={fields?.LastName_MaxLength?.value}
              minLengthErrorMessage={
                fields?.LastName_MinLengthErrorMessage?.value
              }
              error={errors.surname?.message as string}
            />

            <Controller
              name="idNumber"
              control={control}
              rules={{
                required: fields?.IDNumber_ValidationErrorMessage?.value,
                validate: (value) => {
                  if (!value || value.length !== 13) {
                    return fields?.IDNumber_ValidationErrorMessage?.value;
                  }
                  if (!/^\d{13}$/.test(value)) {
                    return fields?.IDNumber_ValidationErrorMessage?.value;
                  }
                  if (!validateSouthAfricanID(value)) {
                    return fields?.IDNumber_ValidationErrorMessage?.value;
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <SouthAfricanIDInput
                  name={fields?.IDNumber_FieldID?.value}
                  label={<Text field={fields?.IDNumber_Label} />}
                  placeholder={fields?.IDNumber_Placeholder?.value}
                  containerClassName="space-y-2"
                  labelClassName="text-sm text-gray-800"
                  inputClassName="w-full"
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  onBlur={field.onBlur}
                  onValidationChange={(isValid, errorMsg) => {
                    if (!isValid && errorMsg) {
                      setError("idNumber", {
                        type: "manual",
                        message: errorMsg,
                      });
                    } else {
                      clearErrors("idNumber");
                    }
                  }}
                  error={errors.idNumber?.message as string}
                  customValidationError={
                    fields?.IDNumber_ValidationErrorMessage?.value
                  }
                />
              )}
            />

            <Controller
              name="monthlyIncome"
              control={control}
              rules={{
                validate: (value) =>
                  (value && value > 0) ||
                  fields?.NetIncome_ValidationErrorMessage?.value,
              }}
              render={({ field }) => (
                <IncomeInput
                  name={fields?.NetIncome_FieldID?.value}
                  label={<Text field={fields?.NetIncome_Label} />}
                  placeholder={fields?.NetIncome_Placeholder?.value}
                  prefix="R"
                  showHelpIcon={true}
                  tooltipText={fields?.NetIncome_Tooltip?.value}
                  containerClassName="space-y-2"
                  labelContainerClassName="flex items-center gap-2"
                  labelClassName="text-sm text-gray-800"
                  inputWrapperClassName="relative"
                  inputClassName="pl-8 w-full"
                  helpIconClassName="w-4 h-4 text-gray-400"
                  prefixClassName="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900"
                  value={field.value || ""}
                  maxLength={fields?.NetIncome_MaxLength?.value}
                  onChange={(e) => {
                    const numValue = e.target.value
                      ? parseInt(e.target.value, 10)
                      : 0;
                    field.onChange(numValue);
                  }}
                  onBlur={field.onBlur}
                  error={errors.monthlyIncome?.message as string}
                />
              )}
            />
          </div>

          <Controller
            name="acceptTerms"
            control={control}
            rules={{
              required: fields?.TermsAndConditions_ValidationErrorMessage?.value,
            }}
            render={({ field }) => (
              <TermsModalInput
                name={String(fields?.TermsAndConditions_FieldID?.value ?? "acceptTerms")}
                label={<Text field={fields?.TermsAndConditions_TermsInputText} />}
                value={typeof field.value === "boolean" ? (field.value ? "1" : "") : field.value}
                onChange={(e) => field.onChange(e.target.value === "1")}
                error={errors.acceptTerms?.message as string}
                TermsAndConditions_InnerHTMLContentHeading={<Text field={fields?.TermsAndConditions_InnerHTMLContentHeading} />}
                TermsAndConditions_InnerHTMLContent={<Text field={fields?.TermsAndConditions_InnerHTMLContent} />}
                TermsAndConditions_TermsAcceptButtonText={<Text field={fields?.TermsAndConditions_TermsAcceptButtonText} />}
                TermsAndConditions_TermsDeclineButtonText={<Text field={fields?.TermsAndConditions_TermsDeclineButtonText} />}
              />
            )}
          />

          <div className="space-y-2">
            <Controller
              name="backgroundCheckConsent"
              control={control}
              rules={{
                required: fields?.BureauConsent_ValidationErrorMessage?.value,
              }}
              render={({ field }) => (
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="background-check-consent"
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                  <Label
                    htmlFor="background-check-consent"
                    className="text-sm text-gray-800 leading-snug"
                  >
                    <Text field={fields?.BureauConsent} />
                  </Label>
                </div>
              )}
            />
            {errors.backgroundCheckConsent && (
              <p className="text-sm text-red-500">
                {(errors.backgroundCheckConsent.message as string) ||
                  fields?.BureauConsent_ValidationErrorMessage?.value}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 py-6 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-800"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              <Text field={fields?.BackButtonText} />
            </Button>

            <Button
              onClick={handleFormSubmit}
              className="flex-1 py-6 text-white bg-[#2c5f5d] hover:bg-[#234a48]"
            >
              <Text field={fields?.SubmitButtonText} />
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <Text field={fields?.AlreadyStartedText} />{" "}
            <ContentSdkLink
              field={fields?.ResumeApplicationLink}
              className="text-[#2c5f5d] underline"
            >
              <Text field={fields?.ResumeApplicationLinkText} />
            </ContentSdkLink>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};;
