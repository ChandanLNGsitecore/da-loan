"use client";

import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "components/da-loan/ui-primitive/input-otp";

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
    "Go Back Message": TextField;
  };
  onBack?: () => void;
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

const interpolateGoBackMessage = (
  template: string | undefined,
  method: string | null,
): string => {
  const fallbackMethod = method ?? "contact";
  if (!template) return `Entered the wrong ${fallbackMethod}? Go back`;
  return template.replace(/##method##/g, fallbackMethod);
};

export const Default = (props: OTPVerificationProps) => {
  console.log("OTPVerificationProps:", props);

  const router = useRouter();

  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [contactValue, setContactValue] = useState<string | null>(null);
  const [otpMethod, setOtpMethod] = useState<"cellphone" | "email" | null>(
    null,
  );
  const [isEditorMode, setIsEditorMode] = useState(false);

  const {
    control,
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
    const storedContactValue = localStorage.getItem("otpContactValue");
    const storedMethod = localStorage.getItem("otpMethod") as
      | "cellphone"
      | "email"
      | null;
    setContactValue(storedContactValue);
    setOtpMethod(storedMethod);
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
          {isEditorMode ? (
            <ContentSdkText field={props.fields?.JourneyStep_SubHeading} />
          ) : (
            <>
              {props.fields?.JourneyStep_SubHeading?.value?.toString()}
              {otpMethod ? ` ${otpMethod}` : ""}
            </>
          )}
        </p>

        <p className="text-center text-gray-800 font-semibold">
          {contactValue}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2 flex justify-center flex-col items-center">
            <label className="text-sm font-medium text-gray-800">
              <ContentSdkText field={props.fields?.OTP_Label} />
            </label>
            <Controller
              control={control}
              name="otp"
              rules={{
                required:
                  props.fields?.OTP_ValidationErrorMessage?.value?.toString() ||
                  "OTP is required",
                pattern: {
                  value:
                    getRegex(
                      props.fields?.OTP_ValidationRegex?.value?.toString(),
                    ) || /^[0-9]{6}$/,
                  message:
                    props.fields?.OTP_ValidationErrorMessage?.value?.toString() ||
                    "Invalid OTP format",
                },
              }}
              render={({ field }) => (
                <InputOTP
                  id="otp"
                  maxLength={6}
                  value={field.value ?? ""}
                  //onChange={field.onChange}
                  onChange={(val) => {
                    // Allow only digits
                    const numericValue = val.replace(/\D/g, "");
                    field.onChange(numericValue);
                  }}
                  inputMode="numeric"
                  autoComplete="one-time-password"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            {errors.otp && (
              <p className="text-sm text-red-500">{errors.otp.message}</p>
            )}
          </div>
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
                  <ContentSdkText
                    field={props.fields?.["Send Again Message 2"]}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[#2c5f5d] underline cursor-pointer"
                  >
                    {props.fields?.["Send Again Message 2"]?.value?.toString()}
                  </button>
                )}
              </div>
            ) : (
              <div>
                {isEditorMode ? (
                  <ContentSdkText
                    field={props.fields?.["Send Again Message 1"]}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: interpolateCountdownMessage(
                        props.fields?.[
                          "Send Again Message 1"
                        ]?.value?.toString(),
                        countdown,
                      ),
                    }}
                  />
                )}
              </div>
            )}
          </div>

          <div className="text-center text-sm text-gray-600">
            <button
              type="button"
              onClick={() => {
                if (isEditorMode) return;
                if (props.onBack) {
                  props.onBack();
                } else {
                  router.push("/loans/send-otp");
                }
              }}
              disabled={isEditorMode}
              className="text-[#2c5f5d] underline cursor-pointer"
            >
              {isEditorMode ? (
                <ContentSdkText field={props.fields?.["Go Back Message"]} />
              ) : (
                interpolateGoBackMessage(
                  props.fields?.["Go Back Message"]?.value?.toString(),
                  otpMethod,
                )
              )}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
