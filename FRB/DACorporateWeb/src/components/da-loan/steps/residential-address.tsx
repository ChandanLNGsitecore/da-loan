"use client";

import {
  Text as ContentSdkText,
  RichTextField,
  TextField,
  RichText as ContentSdkRichText,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { DropDownList } from "components/da-loan/ui/drop-down-list";
import { StandardNumberInput } from "components/da-loan/ui/standard-number-input";
import { Text } from "@sitecore-content-sdk/nextjs";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef } from "react";
import { StandardTextInput } from "components/da-loan/ui/standard-text-input";

type SitecoreOption = {
  fields: {
    Value: { value: string };
    Text: { value: string };
  };
};

interface Provinces {
  id: string;
  fields: {
    Text: { value: string };
    Value: { value: string };
  };
}

type ResidentialAddressFormData = {
  streetLine1: string;
  streetLine2: string;
  cityTown: string;
  province: string;
  postalCode: string;
};

export type ResidentialAddressProps = ComponentProps & {
  fields: {
    JourneyStep_Heading: TextField;
    JourneyStep_SubHeading: TextField;
    SubmitButtonText: TextField;
    BackButtonText: TextField;
    "Proof of Address Message": RichTextField;
    "Province List": Provinces[];

    AddressLine1_FieldID: TextField;
    AddressLine1_Label: TextField;
    AddressLine1_Required: boolean;
    AddressLine1_ValidationRegex: string;
    AddressLine1_ValidationErrorMessage: TextField;
    AddressLine1_Placeholder: TextField;
    AddressLine1_MinLength: string;
    AddressLine1_MaxLength: string;
    AddressLine1_MinLengthErrorMessage: string;

    AddressLine2_FieldID: TextField;
    AddressLine2_Label: TextField;
    AddressLine2_Required: boolean;
    AddressLine2_ValidationRegex: string;
    AddressLine2_ValidationErrorMessage: TextField;
    AddressLine2_Placeholder: TextField;
    AddressLine2_MinLength: string;
    AddressLine2_MaxLength: string;
    AddressLine2_MinLengthErrorMessage: string;

    City_FieldID: TextField;
    City_Label: TextField;
    City_Required: boolean;
    City_ValidationRegex: string;
    City_ValidationErrorMessage: TextField;
    City_Placeholder: TextField;
    City_MinLengthErrorMessage: string;

    Postcode_FieldID: TextField;
    Postcode_Label: TextField;
    Postcode_Required: string;
    Postcode_ValidationRegex: string;
    Postcode_ValidationErrorMessage: TextField;
    Postcode_Placeholder: TextField;

    ProvincePlaceholderText: TextField;
    ProvinceLabelText: TextField;
  };
  readonly onSubmit?: (data: ResidentialAddressFormData) => void;
  readonly initialData?: Partial<ResidentialAddressFormData>;
  readonly onBack?: () => void;
};

const libraries: ("places")[] = ["places"];

export const Default = (props: ResidentialAddressProps) => {
  "use no memo";

  const router = useRouter();
  const { onSubmit, initialData, onBack } = props;
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || "";

  if (!googleMapsApiKey) {
    console.warn("Google Maps API key is not set. Address autocomplete will not work.");
  }

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries,
  });

  const addressInputRef = useRef<HTMLInputElement | null>(null);

  // Form setup
  const {
    handleSubmit,
    control,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ResidentialAddressFormData>({
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

  const getRegex = (regexString: string | undefined) => {
    if (!regexString) return undefined;
    try {
      return new RegExp(regexString);
    } catch {
      return undefined;
    }
  };

  // Parse address components
  const parseAddress = (place: google.maps.places.PlaceResult) => {
    const get = (type: string) =>
      place.address_components?.find((c) => c.types.includes(type))?.long_name || "";
    console.log("Address components:", place.address_components);


    const point_of_interest = get("point_of_interest") ?? "";
    const sublocality_level_1 = get("sublocality_level_1") ?? "";

    return {
      street: `${get("street_number")} ${get("route")} ${point_of_interest} ${sublocality_level_1}`.trim(),
      city: get("locality") || get("sublocality"),
      province: get("administrative_area_level_1"),
      postalCode: get("postal_code"),
    };
  };

  // Setup Google Places Autocomplete
  useEffect(() => {
    if (!isLoaded || !addressInputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(
      addressInputRef.current,
      {
        types: ["address"],
        componentRestrictions: { country: "za" },
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      const parsed = parseAddress(place);
      setValue("streetLine1", parsed.street, { shouldValidate: true });
      setValue("cityTown", parsed.city, { shouldValidate: true });
      setValue("postalCode", parsed.postalCode, { shouldValidate: true });

      // Match province
      const provinceOption = props.fields["Province List"]?.find(
        (p) => p.fields.Text?.value === parsed.province ||
          p.fields.Value?.value === parsed.province
      );

      if (provinceOption) {
        setValue("province", provinceOption.fields.Value.value, {
          shouldValidate: true,
        });
      }
    });

    return () => {
      // Cleanup if needed
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [isLoaded, setValue, props.fields]);

  const onFormSubmit = handleSubmit((data) => {
    if (onSubmit && typeof onSubmit === "function") {
      onSubmit(data);
    } else {
      router.push("/loans/living-arrangement");
    }
  });

  const handleNext = async () => {
    setValue("streetLine1", getValues("streetLine1").trim(), { shouldValidate: true });
    setValue("streetLine2", getValues("streetLine2").trim(), { shouldValidate: false });
    setValue("cityTown", getValues("cityTown").trim(), { shouldValidate: true });
    setValue("postalCode", getValues("postalCode").trim(), { shouldValidate: true });

    const isValid = await trigger();
    console.log("Form validation status:", isValid);
    console.log("Form errors:", errors);
    console.log("Form values:", getValues());
    if (!isValid) {
      return;
    }
    onFormSubmit();
  };

  const handleBack = () => {
    if (onBack && typeof onBack === "function") {
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
            <ContentSdkText field={props.fields.JourneyStep_Heading} />
          </h2>
          <div className="text-sm text-gray-600 font-medium">Step 3 of 5</div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2c5f5d] transition-all duration-300"
            style={{ width: "60%" }}
          />
        </div>
        <div className="space-y-6">
          {/* Address Line 1 */}
          <Controller
            name="streetLine1"
            control={control}
            rules={{
              required: String(props.fields?.AddressLine1_ValidationErrorMessage?.value),
              minLength: {
                value: Number(props?.fields?.AddressLine1_MinLength),
                message: props?.fields?.AddressLine1_MinLengthErrorMessage,
              }
            }}
            render={({ field }) => (
              <StandardTextInput
                ref={addressInputRef}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                onPaste={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
                onDragOver={(e) => e.preventDefault()}
                name={String(props?.fields?.AddressLine1_FieldID?.value ?? "")}
                label={<Text field={props?.fields?.AddressLine1_Label} />}
                placeholder={String(props?.fields?.AddressLine1_Placeholder?.value)}
                inputRegex={getRegex(`^[a-zA-Z0-9 -]+$`)} // <= Need to change here Get Value from Data Source Item, Example: inputRegex={getRegex(fields?.FirstName_ValidationRegex?.value)}
                showHelpIcon={true}
                tooltipText="Enter street address, P.O. box, company name, c/o"
                containerClassName="space-y-2"
                labelContainerClassName="flex items-center gap-2"
                labelClassName="text-sm text-gray-800"
                inputClassName="w-full"
                helpIconClassName="w-4 h-4 text-gray-400"
                maxLength={Number(props?.fields?.AddressLine1_MaxLength)}
                minLength={Number(props?.fields?.AddressLine1_MinLength)}
                minLengthErrorMessage={props?.fields?.AddressLine1_MinLengthErrorMessage}
                error={errors.streetLine1?.message}
              />
            )}
          />

          {/* Address Line 2 */}
          <Controller
            name="streetLine2"
            control={control}
            rules={{
              minLength: {
                value: Number(props?.fields?.AddressLine2_MinLength),
                message: props?.fields?.AddressLine2_MinLengthErrorMessage,
              },
              maxLength: {
                value: Number(props?.fields?.AddressLine2_MaxLength),
                message: String(props?.fields?.AddressLine2_MaxLength),
              },
            }}
            render={({ field }) => (
              <StandardTextInput
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                onPaste={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
                onDragOver={(e) => e.preventDefault()}
                name={String(props?.fields?.AddressLine2_FieldID?.value ?? "")}
                label={<Text field={props?.fields?.AddressLine2_Label} />}
                placeholder={String(props?.fields?.AddressLine2_Placeholder?.value)}
                showHelpIcon={true}
                tooltipText="Enter street address, P.O. box, company name, c/o"
                containerClassName="space-y-2"
                labelContainerClassName="flex items-center gap-2"
                labelClassName="text-sm text-gray-800"
                inputClassName="w-full"
                helpIconClassName="w-4 h-4 text-gray-400"
                maxLength={Number(props?.fields?.AddressLine2_MaxLength)}
                minLength={Number(props?.fields?.AddressLine2_MinLength)}
                minLengthErrorMessage={props?.fields?.AddressLine2_MinLengthErrorMessage}
                error={errors.streetLine2?.message}
              />
            )}
          />

          {/* City */}
          <Controller
            name="cityTown"
            control={control}
            rules={{
              required: String(props.fields?.City_ValidationErrorMessage?.value),
            }}
            render={({ field }) => (
              <StandardTextInput
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
                onDragOver={(e) => e.preventDefault()}
                name={String(props.fields?.City_FieldID?.value ?? "")}
                label={<Text field={props.fields?.City_Label} />}
                placeholder={String(props.fields?.City_Placeholder?.value)}
                showHelpIcon={true}
                tooltipText="Enter your city"
                containerClassName="space-y-2"
                labelContainerClassName="flex items-center gap-2"
                labelClassName="text-sm text-gray-800"
                inputClassName="w-full"
                helpIconClassName="w-4 h-4 text-gray-400"
                error={errors.cityTown?.message}
              />
            )}
          />

          <div className="space-y-2">
            <Controller
              name="province"
              control={control}
              rules={{ required: "Province is required" }}
              render={({ field }) => (
                <DropDownList
                  id="province"
                  label={<Text field={props?.fields?.ProvinceLabelText} />}
                  value={field.value}
                  onValueChange={field.onChange}
                  options={props?.fields?.["Province List"]
                    ?.map((option: Provinces) => ({
                      value: option.fields.Value?.value || "",
                      label: option.fields.Text?.value || "",
                    }))
                    .filter((opt) => opt.value !== "")}
                  placeholder={String(props?.fields?.ProvincePlaceholderText?.value)}
                  error={errors.province?.message}
                />
              )}
            />
          </div>

          <Controller
            name="postalCode"
            control={control}
            rules={{
              required: String(props.fields?.Postcode_ValidationErrorMessage?.value),
            }}
            render={({ field }) => (
              <StandardNumberInput
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
                onDragOver={(e) => e.preventDefault()}
                name={String(props?.fields?.Postcode_FieldID?.value ?? "")}
                label={props?.fields?.Postcode_Label}
                placeholder={String(props.fields?.Postcode_Placeholder?.value)}
                type="text"
                maxLength={6}
                formatErrorMessage={String(props.fields?.Postcode_ValidationErrorMessage?.value)}
                containerClassName="space-y-2"
                labelContainerClassName="flex items-center gap-2"
                labelClassName="text-sm text-gray-800"
                error={errors.postalCode?.message as string}
              />
            )}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              <ContentSdkRichText field={props.fields["Proof of Address Message"]} />
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 py-6 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-800"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              <Text field={props?.fields?.BackButtonText} />
            </Button>

            <Button
              onClick={handleNext}
              className="flex-1 py-6 text-white bg-[#2c5f5d] hover:bg-[#234a48]"
            >
              <Text field={props?.fields?.SubmitButtonText} />
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};