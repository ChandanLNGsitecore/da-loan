"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "components/da-loan/ui-primitive/button";
import { Card, CardContent } from "components/da-loan/ui-primitive/card";
import { Timer } from "components/da-loan/ui-primitive/timer";
import { useRouter } from "next/navigation";
import { StandardNumberInput } from "../ui/standard-number-input";
import {
  RichTextField,
  TextField,
  Text as ContentSdkText,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

export type OTPVerificationProps = ComponentProps & {
  fields: {
    JourneyStep_Heading: TextField;
    JourneyStep_SubHeading: TextField;
    SubmitButtonText: TextField;
    OTP_FieldID: TextField;
    OTP_Label: TextField;
    OTP_Required: boolean;
    OTP_ValidationRegex: TextField;
    OTP_ValidationErrorMessage: TextField;
    OTP_Placeholder: TextField;
    "Send Again Message 1": RichTextField;
    "Send Again Message 2": TextField;
  };
};

const getRegex = (regexString?: string): RegExp | undefined => {
  if (!regexString) return /^0\d{9}$/; // Default cellphone regex
  try {
    // Remove leading/trailing slashes if present and create RegExp
    const cleaned = regexString.replace(/^\/|\/$/g, "");
    return new RegExp(cleaned);
  } catch {
    return /^0\d{9}$/; // Fallback to default
  }
};

const interpolateCountdownMessage = (
  htmlContent: string | undefined,
  countdown: number,
): string => {
  if (!htmlContent) return "";
  // Replace ##countdown## placeholder with actual countdown value
  return htmlContent.replace(/##countdown##/g, countdown.toString());
};

export const Default = (props: OTPVerificationProps) => {
  console.log("OTPVerificationProps:", props);

  const router = useRouter();

  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [cellphone, setCellphone] = useState<string | null>(null);
  const [isEditorMode, setIsEditorMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      const timer = setTimeout(() => setCanResend(true), 0);
      return () => clearTimeout(timer);
    }
  }, [countdown, canResend]);

  useEffect(() => {
    const storedCellphone = localStorage.getItem("cellphone");
    setCellphone(storedCellphone);
  }, []);

  useEffect(() => {
    // Detect Sitecore Experience Editor (sc_mode=edit) to avoid submitting/focusing
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        setIsEditorMode(
          params.get("sc_site") === "corporate-website" &&
            params.get("mode") != "preview",
        );
      } catch {
        setIsEditorMode(false);
      }
    }
  }, []);

  const handleResend = () => {
    setCountdown(45);
    setCanResend(false);
  };

  const onSubmit = (data: Record<string, unknown>) => {
    // Handle form submission
    console.log("Credit check form submitted :", data);

    // Redirect to next page (you can customize the URL)
    router.push("/loans/employment-detail"); // Replace with your desired route
  };

  return (
    <Card className="w-full mx-auto bg-white">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Timer className="w-10 h-10 text-gray-600" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-800">
          <ContentSdkText field={props.fields?.JourneyStep_Heading} />
        </h2>

        <p className="text-center text-gray-600 text-sm">
          <ContentSdkText field={props.fields?.JourneyStep_SubHeading} />
        </p>

        <p className="text-center text-gray-800 font-semibold">{cellphone}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <StandardNumberInput
            {...register("otp", {
              required:
                props.fields?.OTP_ValidationErrorMessage?.value?.toString() ||
                "OTP is required",
              pattern: {
                value:
                  getRegex(
                    props.fields?.OTP_ValidationRegex?.value?.toString(),
                  ) || /^\d{6}$/,
                message:
                  props.fields?.OTP_ValidationErrorMessage?.value?.toString() ||
                  "Invalid OTP format",
              },
            })}
            label={props.fields?.OTP_Label}
            placeholder={props.fields?.OTP_Placeholder?.value?.toString()}
            type="text"
            maxLength={6}
            inputRegex={getRegex(
              props.fields?.OTP_ValidationRegex?.value?.toString(),
            )}
            formatErrorMessage={props.fields?.OTP_ValidationErrorMessage?.value?.toString()}
            containerClassName="space-y-2"
            labelContainerClassName="flex items-center gap-2"
            labelClassName="text-sm text-gray-800"
            error={errors.otp?.message as string}
          />
          <Button
            type={isEditorMode ? "button" : "submit"}
            className="w-full bg-[#2c5f5d] hover:bg-[#234a48] text-white py-6 text-base font-medium"
          >
            <ContentSdkText field={props.fields?.SubmitButtonText} />
          </Button>

          <div className="text-center text-sm text-gray-600">
            {canResend ? (
              <div>
                {isEditorMode ? (
                  <ContentSdkText field={props.fields?.["Send Again Message 2"]} />
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[#2c5f5d] underline"
                  >
                    {props.fields?.["Send Again Message 2"]?.value?.toString()}
                  </button>
                )}
              </div>
            ) : (
              <div>
                {isEditorMode ? (
                  <ContentSdkText field={props.fields?.["Send Again Message 1"]} />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: interpolateCountdownMessage(
                        props.fields?.["Send Again Message 1"]?.value?.toString(),
                        countdown,
                      ),
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
