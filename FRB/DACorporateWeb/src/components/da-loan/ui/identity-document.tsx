"use client";

import { useState } from "react";
import { Label } from "components/da-loan/ui-primitive/label";
import { RadioGroup, RadioGroupItem } from "components/da-loan/ui-primitive/radio-group";
import { FileUploadInput } from "components/da-loan/ui/file-upload-input";
import { Text } from "@sitecore-content-sdk/nextjs";

type SitecoreField = {
  value: string;
  editable?: string;
} | undefined;

interface IdentityDocumentProps {
  accept?: string[];
  maxSize?: number; // in MB
  onDocumentsChange?: (documents: IdentityDocuments) => void;
  onError?: (error: string) => void;
  initialDocuments?: IdentityDocuments;
  numberPrefix?: string;
  // Text customization props - now accepting Sitecore field objects
  title?: SitecoreField;
  subtitle?: SitecoreField;
  bookLabel?: SitecoreField;
  bookDescription?: SitecoreField;
  cardLabel?: SitecoreField;
  cardDescription?: SitecoreField;
  bookUploadTitle?: SitecoreField;
  bookUploadDescription?: SitecoreField;
  cardFrontTitle?: SitecoreField;
  cardFrontDescription?: SitecoreField;
  cardBackTitle?: SitecoreField;
  cardBackDescription?: SitecoreField;
}

export interface IdentityDocuments {
  idType: "book" | "card";
  idDocument: File | null;
  idCardFront: File | null;
  idCardBack: File | null;
}

export function IdentityDocument({
  accept = [".png", ".jpg", ".jpeg", ".heic", ".pdf"],
  maxSize = 1,
  onDocumentsChange,
  onError,
  initialDocuments,
  numberPrefix,
  title,
  subtitle,
  bookLabel,
  bookDescription,
  cardLabel,
  cardDescription,
  bookUploadTitle,
  bookUploadDescription,
  cardFrontTitle,
  cardFrontDescription,
  cardBackTitle,
  cardBackDescription,
}: IdentityDocumentProps) {
  const [documents, setDocuments] = useState<IdentityDocuments>(
    initialDocuments || {
      idType: "book",
      idDocument: null,
      idCardFront: null,
      idCardBack: null,
    }
  );

  const handleFileChange = (
    docType: keyof IdentityDocuments,
    file: File | null
  ) => {
    const updatedDocuments = {
      ...documents,
      [docType]: file,
    };
    setDocuments(updatedDocuments);
    onDocumentsChange?.(updatedDocuments);
  };

  const handleIdTypeChange = (value: "book" | "card") => {
    const updatedDocuments = {
      ...documents,
      idType: value,
      // Keep all files - validation logic will determine which ones are needed
    };
    setDocuments(updatedDocuments);
    onDocumentsChange?.(updatedDocuments);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-900">
          <Text field={title} />
        </p>
        <p className="text-xs text-gray-600">
          <Text field={subtitle} />
        </p>
        <RadioGroup
          value={documents.idType}
          onValueChange={(value) => handleIdTypeChange(value as "book" | "card")}
          className="grid gap-3 md:grid-cols-2"
        >
          <Label
            htmlFor="id-type-book"
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
              documents.idType === "book"
                ? "border-[#2c5f5d] bg-[#2c5f5d]/5"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <RadioGroupItem
              id="id-type-book"
              value="book"
              className="mt-1"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                <Text field={bookLabel} />
              </p>
              <p className="text-xs text-gray-600">
                <Text field={bookDescription} />
              </p>
            </div>
          </Label>
          <Label
            htmlFor="id-type-card"
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
              documents.idType === "card"
                ? "border-[#2c5f5d] bg-[#2c5f5d]/5"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <RadioGroupItem
              id="id-type-card"
              value="card"
              className="mt-1"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                <Text field={cardLabel} />
              </p>
              <p className="text-xs text-gray-600">
                <Text field={cardDescription} />
              </p>
            </div>
          </Label>
        </RadioGroup>
      </div>

      <div className={documents.idType === "book" ? "" : "hidden"}>
        <FileUploadInput
          title={bookUploadTitle}
          description={bookUploadDescription}
          numberPrefix={numberPrefix}
          accept={accept}
          maxSize={maxSize}
          onFileChange={(file) => handleFileChange("idDocument", file)}
          onError={onError}
          showButtons={false}
          autoUpload={true}
          initialFile={documents.idDocument}
        />
      </div>

      <div className={documents.idType === "card" ? "space-y-6" : "hidden"}>
        <FileUploadInput
          title={cardFrontTitle}
          description={cardFrontDescription}
          numberPrefix={numberPrefix}
          accept={accept}
          maxSize={maxSize}
          onFileChange={(file) => handleFileChange("idCardFront", file)}
          onError={onError}
          showButtons={false}
          autoUpload={true}
          initialFile={documents.idCardFront}
        />
        <FileUploadInput
          title={cardBackTitle}
          description={cardBackDescription}
          accept={accept}
          maxSize={maxSize}
          onFileChange={(file) => handleFileChange("idCardBack", file)}
          onError={onError}
          showButtons={false}
          autoUpload={true}
          initialFile={documents.idCardBack}
        />
      </div>
    </div>
  );
}
