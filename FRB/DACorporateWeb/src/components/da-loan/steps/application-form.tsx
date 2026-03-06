"use client";

import { useForm, useWatch, Controller } from "react-hook-form";
import { Button } from "components/da-loan/ui-primitive/button";
import { RangeSlider } from "components/da-loan/ui/range-slider";
import { RadioGroupWithIcon, RadioOption } from "components/da-loan/ui/radio-group-with-icon";
import { Card, CardContent } from "components/da-loan/ui-primitive/card";
import { Link as ContentSdkLink, Text } from "@sitecore-content-sdk/nextjs";
import { useRouter } from "next/navigation";

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

interface ApplicationFormProps {
  fields?: SitecoreFields;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const Default = (props: ApplicationFormProps) => {
  const router = useRouter();

  const { fields: propsFields = {} } = props;
  const fields = propsFields.fields || propsFields;

  debugger;
  console.log("Props:", props);
  console.log("Fields:", fields);

  const onSubmit = (data: Record<string, unknown>) => {
    console.log("Form submitted:", data);
    router.push("/loans/application-detail");
  };

  const {
    handleSubmit,
    trigger,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: Number(fields?.LoanAmountSlider_InitialValue?.value) || 0,
      repaymentMonths: Number(fields?.LoanTermSlider_InitialValue?.value) || 0,
      loanPurpose: "",
    },
  });

  const amount = useWatch({ control, name: "amount" });
  const repaymentMonths = useWatch({ control, name: "repaymentMonths" }) ?? 7;

  const loanPurposeOptions: RadioOption[] = fields?.LoanPurposeOptions?.map((option: SitecoreOption) => ({
    label: option.fields.Text,
    id: option.fields.Id.value,
    value: option.fields.Value.value,
    icon: option.fields.Icon.value
  })) || [];

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

  return (
    <Card className="w-full mx-auto bg-white">
      <CardContent className="p-6 md:p-8 space-y-6">
        <form onSubmit={handleFormSubmit} className="space-y-6">
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
						<h3 className="text-2xl font-medium text-gray-800 font-heading text-center">
							<Text field={fields?.LoanPurposeLabel} />
						</h3>
            <p className="text-gray-800 text-center">
              <Text field={fields?.LoanPurposeDescription} />
            </p>
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
            >
              <Text field={fields?.ResumeApplicationLinkText} />
            </ContentSdkLink>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
