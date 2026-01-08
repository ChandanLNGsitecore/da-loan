"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import TermsModal from "components/da-loan/steps/terms-modal";
import { Button } from "components/da-loan/ui-premetive/button";
import { RangeSlider } from "components/da-loan/ui/range-slider";
import { StandardTextInput } from "components/da-loan/ui/standard-text-input";
import { SouthAfricanIDInput } from "components/da-loan/ui/south-african-id-input";
import { IncomeInput } from "components/da-loan/ui/income-input";
import { Checkbox } from "components/da-loan/ui-premetive/checkbox";
import { Label } from "components/da-loan/ui-premetive/label";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { Link as ContentSdkLink, Text } from "@sitecore-content-sdk/nextjs";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SitecoreFields = Record<string, any>;

interface ApplicationFormProps {
  fields?: SitecoreFields;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const Default = (props: ApplicationFormProps) => {
  const router = useRouter();

  const { fields: propsFields = {} } = props;
  const fields = propsFields.fields || propsFields;

  console.log("Props:", props);
  console.log("Fields:", fields);

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
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      amount: Number(fields?.LoanAmountSlider_InitialValue?.value) || 0,
      repaymentMonths: Number(fields?.LoanTermSlider_InitialValue?.value) || 0,
      loanPurpose: "PENDING",
      firstName: "",
      surname: "",
      idNumber: "",
      monthlyIncome: 0,
      acceptTerms: false,
      backgroundCheckConsent: false,
    },
  });

  const amount = useWatch({ control, name: "amount" });
  const repaymentMonths = useWatch({ control, name: "repaymentMonths" }) ?? 7;

  const onFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Card className="w-full mx-auto bg-white">
      <CardContent className="p-6 md:p-8 space-y-6">
        <form onSubmit={onFormSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-medium text-gray-800 font-heading text-center">
              <Text field={fields?.JourneyStep_Heading} />
            </h3>
            <RangeSlider
              name={fields?.LoanAmountSlider_FieldID?.value}
              label={<Text field={fields?.LoanAmountSlider_Label} />}
              value={amount ?? 7000}
              placeholder={fields?.LoanAmountSlider_Placeholder?.value}
              min={fields?.LoanAmountSlider_MinValue?.value}
              max={fields?.LoanAmountSlider_MaxValue?.value}
              step={fields?.LoanAmountSlider_Increment?.value}
              prefix="R"
              onChange={(value) => setValue("amount", value)}
              formatDisplay={(value) =>
                value.toLocaleString("en-ZA").replace(/,/g, " ")
              }
              roundValue={(value) => Math.round(value / 1000) * 1000}
              containerClassName="space-y-4"
              labelClassName="text-sm text-gray-800"
              inputClassName=""
              sliderContainerClassName="space-y-4"
              sliderClassName="w-full"
              minMaxLabelsClassName="flex justify-between text-xs text-gray-600"
              minLabel={"R" + fields?.LoanAmountSlider_MinValue?.value}
              maxLabel={"R" + fields?.LoanAmountSlider_MaxValue?.value}
            />
          </div>
          <RangeSlider
            name={fields?.LoanTermSliderSlider_FieldID?.value}
            label={<Text field={fields?.LoanTermSlider_Label} />}
            value={repaymentMonths}
            min={fields?.LoanTermSlider_MinValue?.value}
            max={fields?.LoanTermSlider_MaxValue?.value}
            step={fields?.LoanTermSlider_Increment?.value}
            onChange={(value) => setValue("repaymentMonths", value)}
            containerClassName="space-y-4"
            labelContainerClassName="flex items-center justify-between"
            labelClassName="text-sm text-gray-800"
            inputClassName="w-16 text-center px-3 text-sm font-medium"
            sliderContainerClassName="space-y-4"
            sliderClassName="w-full"
            minMaxLabelsClassName="flex justify-between text-xs text-gray-500"
            minLabel={fields?.LoanTermSlider_MinValue?.value}
            maxLabel={fields?.LoanTermSlider_MaxValue?.value}
          />
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-800 font-heading text-center">
              <Text field={fields?.JourneyStep_SubHeading} />
            </h3>
            <StandardTextInput
              {...register("firstName", {
                required:
                  fields?.FirstName_RequiredErrorMessage?.value ||
                  "First name is required",
                minLength: {
                  value: fields?.FirstName_MinLength?.value || 2,
                  message:
                    fields?.FirstName_MinLengthErrorMessage?.value ||
                    `First name must be at least ${
                      fields?.FirstName_MinLength?.value || 2
                    } characters`,
                },
              })}
              name={fields?.FirstName_FieldID?.value}
              label={<Text field={fields?.FirstName_Label} />}
              placeholder={fields?.FirstName_Placeholder?.value}
              inputRegex={getRegex(fields?.FirstName_ValidationRegex?.value)}
              showHelpIcon={true}
              tooltipText="Enter your first name(s) as shown on your ID"
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
                required:
                  fields?.LastName_RequiredErrorMessage?.value ||
                  "Surname is required",
                minLength: {
                  value: fields?.LastName_MinLength?.value || 2,
                  message:
                    fields?.LastName_MinLengthErrorMessage?.value ||
                    `Surname must be at least ${
                      fields?.LastName_MinLength?.value || 2
                    } characters`,
                },
              })}
              name={fields?.LastName_FieldID?.value}
              label={<Text field={fields?.LastName_Label} />}
              placeholder={fields?.LastName_Placeholder?.value}
              inputRegex={getRegex(fields?.LastName_ValidationRegex?.value)}
              showHelpIcon={true}
              tooltipText="Enter your surname as shown on your ID"
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

            <SouthAfricanIDInput
              {...register("idNumber", {
                required:
                  fields?.IDNumber_RequiredErrorMessage?.value ||
                  "ID number is required",
              })}
              name={fields?.IDNumber_FieldID?.value}
              label={<Text field={fields?.IDNumber_Label} />}
              placeholder={fields?.IDNumber_Placeholder?.value}
              containerClassName="space-y-2"
              labelClassName="text-sm text-gray-800"
              inputClassName="w-full"
              error={errors.idNumber?.message as string}
            />

            <Controller
              name="monthlyIncome"
              control={control}
              rules={{
                validate: (value) =>
                  (value && value > 0) ||
                  fields?.NetIncome_RequiredErrorMessage?.value ||
                  "Monthly income is required",
              }}
              render={({ field }) => (
                <IncomeInput
                  name={fields?.NetIncome_FieldID?.value}
                  label={<Text field={fields?.NetIncome_Label} />}
                  placeholder={fields?.NetIncome_Placeholder?.value}
                  prefix="R"
                  showHelpIcon={true}
                  tooltipText="Enter your total monthly income after tax"
                  containerClassName="space-y-2"
                  labelContainerClassName="flex items-center gap-2"
                  labelClassName="text-sm text-gray-800"
                  inputWrapperClassName="relative"
                  inputClassName="pl-8 w-full"
                  helpIconClassName="w-4 h-4 text-gray-400"
                  prefixClassName="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900"
                  value={field.value || ""}
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
          <TermsModal control={control} errors={errors} />

          <div className="space-y-2">
            <Controller
              name="backgroundCheckConsent"
              control={control}
              rules={{
                required:
                  fields?.BureauConsent_ValidationErrorMessage?.value ||
                  "You must consent to the background check",
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

          <Button
            type="submit"
            className="w-full bg-[#2c5f5d] hover:bg-[#234a48] text-white py-6 text-base font-medium"
          >
            <Text field={props.fields?.SubmitButtonText} />
          </Button>
          <div className="text-center text-sm text-gray-600">
            <Text field={fields?.AlreadyStartedText} />{" "}
            <ContentSdkLink
              field={fields?.ResumeApplicationLink}
              className="text-[#2c5f5d] underline"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
