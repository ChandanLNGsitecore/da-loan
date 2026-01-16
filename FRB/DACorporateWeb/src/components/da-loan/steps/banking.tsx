"use client";

import { useForm, useWatch, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { DropDownList } from "components/da-loan/ui/drop-down-list";
import { StandardNumberInput } from "components/da-loan/ui/standard-number-input";
import { Text } from '@sitecore-content-sdk/nextjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SitecoreFields = Record<string, any>;

type SitecoreOption = {
  fields: {
    Value: { value: string };
    Text: { value: string };
  };
};

type Banking = {
  bankName: string;
  accountType: string;
  accountNumber: string;
  branchCode: string;
};

interface BankingProps {
  readonly onSubmit: (data: Banking) => void;
  readonly initialData?: Partial<Banking>;
  readonly onBack?: () => void;
  fields?: SitecoreFields;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const Default = (props: BankingProps) => {
  const router = useRouter();
  const { onSubmit, initialData, onBack } = props;
  const { fields: propsFields = {} } = props;
  const fields = propsFields.fields || propsFields;
  debugger;
  console.log("Props:", props);
  console.log("Fields:", fields);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm<Banking>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      bankName: initialData?.bankName || "",
      accountType: initialData?.accountType || "",
      accountNumber: initialData?.accountNumber || "",
      branchCode: initialData?.branchCode || "",
    },
  });

  const bankName = useWatch({ control, name: "bankName" });
  const accountType = useWatch({ control, name: "accountType" });

  const onFormSubmit = handleSubmit((data) => {
    console.log("Banking form submitted:", data);
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(data);
    } else {
      // Navigate to address details page if no onSubmit handler provided
      router.push("/loans/address-detail");
    }
  });

  const handleNext = async () => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    onFormSubmit();
  };

  const handleBack = () => {
    if (onBack && typeof onBack === 'function') {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <Card className="w-full mx-auto bg-white">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            <Text field={fields?.JourneyStep_Heading} />
          </h2>
          <div className="text-sm text-gray-600 font-medium"><Text field={fields?.StepCountText} /></div>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2c5f5d] transition-all duration-300"
            style={{ width: "40%" }}
          />
        </div>

        <div className="space-y-4">
          <Controller
            name="bankName"
            control={control}
            rules={{ required: fields?.BankNamePlaceholderRequiredMessage?.value }}
            render={({ field }) => (
              <DropDownList
                id="bankName"
                label={<Text field={fields?.BankNameLabelText} />}
                value={field.value}
                onValueChange={field.onChange}
                options={fields?.BankNameOptions?.map((option: SitecoreOption) => ({
                  value: option.fields.Value.value,
                  label: option.fields.Text.value
                }))}
                placeholder={fields?.BankNamePlaceholderText?.value}
                error={errors.bankName?.message}
              />
            )}
          />

          <Controller
            name="accountType"
            control={control}
            rules={{ required: fields?.AccountTypeRequiredMessage?.value }}
            render={({ field }) => (
              <DropDownList
                id="accountType"
                label={<Text field={fields?.AccountTypeLabel} />}
                value={field.value}
                onValueChange={field.onChange}
                options={fields?.AccountTypeOptions?.map((option: SitecoreOption) => ({
                  value: option.fields.Value.value,
                  label: option.fields.Text.value
                }))}
                placeholder={fields?.AccountTypePlaceholderText?.value}
                error={errors.accountType?.message}
              />
            )}
          />

          <Controller
            name="accountNumber"
            control={control}
            rules={{
              required: fields?.AccountNumberRequiredMessage?.value,
              minLength: {
                value: 5,
                message: "Account number must be at least 5 digits"
              }
            }}
            render={({ field }) => (
              <StandardNumberInput
                {...field}
                label={fields?.AccountNumberLabel}
                placeholder={fields?.AccountNumberPlaceholderText?.value}
                inputRegex={/^[0-9]*$/}
                type="tel"
                labelContainerClassName="flex items-center gap-2"
                labelClassName="text-sm text-gray-800"
                error={errors.accountNumber?.message}
              />
            )}
          />

          <Controller
            name="branchCode"
            control={control}
            rules={{
              required: fields?.BranchCodeRequiredMessage?.value,
              minLength: {
                value: 3,
                message: "Branch code must be at least 3 digits"
              }
            }}
            render={({ field }) => (
              <StandardNumberInput
                {...field}
                label={fields?.BranchCodeLabel}
                placeholder={fields?.BranchCodePlaceholderText?.value}
                inputRegex={/^[0-9]*$/}
                type="tel"
                labelContainerClassName="flex items-center gap-2"
                labelClassName="text-sm text-gray-800"
                error={errors.branchCode?.message}
              />
            )}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              <Text field={fields?.WarningMessage} />
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex-1 py-6 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-800">

            <ChevronLeft className="w-4 h-4 mr-1" />
            <Text field={fields?.BackButtonText} />
          </Button>

          <Button
            onClick={handleNext}
            className="flex-1 py-6 text-white bg-[#2c5f5d] hover:bg-[#234a48]"
          >
            <Text field={fields?.SubmitButtonText} />
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

