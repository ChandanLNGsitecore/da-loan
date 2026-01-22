"use client";

import { useState, useEffect } from "react";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { FileUploadInput } from "components/da-loan/ui/file-upload-input";
import { IdentityDocument, type IdentityDocuments } from "components/da-loan/ui/identity-document";
import { Text } from "@sitecore-content-sdk/nextjs";

// Dummy API response interface
interface RequiredDocumentsResponse {
  requiredDocs: ("ProofOfIdentity" | "ProofofAddress" | "ProofofBankingDetails")[];
}

// Dummy API method - replace with actual API call later
const fetchRequiredDocuments = async (): Promise<RequiredDocumentsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate different scenarios by uncommenting one of these:

      // All documents required
      resolve({ requiredDocs: ["ProofOfIdentity", "ProofofAddress", "ProofofBankingDetails"] });

      // Only identity
      // resolve({ requiredDocs: ["ProofOfIdentity"] });

      // Only address
      // resolve({ requiredDocs: ["ProofofAddress"] });

      // Only banking
      // resolve({ requiredDocs: ["ProofofBankingDetails"] });

      // Identity and address
      // resolve({ requiredDocs: ["ProofOfIdentity", "ProofofAddress"] });
    }, 0);
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SitecoreFields = Record<string, any>;

interface DocumentUploadProps {
  fields?: SitecoreFields;
  readonly onSubmit: (documents: UploadedDocuments) => void;
  readonly onBack?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface UploadedDocuments {
  idType: "book" | "card";
  idDocument: File | null;
  idCardFront: File | null;
  idCardBack: File | null;
  proofOfAddress: File | null;
  proofOfBanking: File | null;
}

export const Default = (props: DocumentUploadProps) => {
  const { onSubmit, onBack } = props;
  const { fields: propsFields = {} } = props;
  const fields = propsFields.fields || propsFields;

  // Helper function to parse accept field (removes quotes and splits by comma)
  const parseAcceptField = (acceptValue: string): string[] => {
    return acceptValue
      .split(',') // Split by comma
      .map(ext => ext.trim()) // Trim whitespace
      .filter(ext => ext); // Remove empty strings
  };

  // Parse address document settings from fields
  const addressAccept = parseAcceptField(fields?.Address_Accept?.value);
  const addressMaxSize = fields?.Address_MaxSize?.value;

  // Parse banking document settings from fields
  const bankingAccept = parseAcceptField(fields?.["Proof of Banking Details_Accept"]?.value);
  const bankingMaxSize = fields?.["Proof of Banking Details_MaxSize"]?.value;

  // Parse identity document settings from fields
  const identityAccept = parseAcceptField(fields?.ProofofIdentity_Accept?.value);
  const identityMaxSize = fields?.Address_MaxSize?.value;

  const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [documents, setDocuments] = useState<UploadedDocuments>({
    idType: "book",
    idDocument: null,
    idCardFront: null,
    idCardBack: null,
    proofOfAddress: null,
    proofOfBanking: null,
  });

  useEffect(() => {
    const loadRequiredDocuments = async () => {
      try {
        const response = await fetchRequiredDocuments();
        setRequiredDocs(response.requiredDocs);
      } catch (error) {
        console.error("Failed to fetch required documents:", error);
        // Default to all documents if API fails
        setRequiredDocs(["ProofOfIdentity", "ProofofAddress", "ProofofBankingDetails"]);
      } finally {
        setLoading(false);
      }
    };

    loadRequiredDocuments();
  }, []);

  const handleFileChange = (docType: keyof UploadedDocuments, file: File | null) => {
    setDocuments((prev) => ({
      ...prev,
      [docType]: file,
    }));
  };

  const handleFileError = (error: string) => {
    alert(error);
  };

  const isIdentityRequired = requiredDocs.includes("ProofOfIdentity");
  const isAddressRequired = requiredDocs.includes("ProofofAddress");
  const isBankingRequired = requiredDocs.includes("ProofofBankingDetails");

  // Calculate dynamic numbering
  let currentNumber = 1;
  const identityNumber = isIdentityRequired ? currentNumber++ : 0;
  const addressNumber = isAddressRequired ? currentNumber++ : 0;
  const bankingNumber = isBankingRequired ? currentNumber++ : 0;

  const canSubmit =
    (!isIdentityRequired ||
      (documents.idType === "book"
        ? Boolean(documents.idDocument)
        : Boolean(documents.idCardFront && documents.idCardBack))) &&
    (!isAddressRequired || Boolean(documents.proofOfAddress)) &&
    (!isBankingRequired || Boolean(documents.proofOfBanking));

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit(documents);
    }
  };

  const handleIdentityDocumentsChange = (identityDocs: IdentityDocuments) => {
    setDocuments((prev) => ({
      ...prev,
      ...identityDocs,
    }));
  };

  return (
    <Card className="w-full mx-auto bg-white">
      <CardContent className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            <Text field={fields?.JourneyStep_Heading} />
          </h2>
          <p className="text-sm text-gray-600">
            <Text field={fields?.JourneyStep_SubHeading} />
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-600">Loading required documents...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {isIdentityRequired && (
              <IdentityDocument
                accept={identityAccept}
                maxSize={identityMaxSize}
                onDocumentsChange={handleIdentityDocumentsChange}
                onError={handleFileError}
                initialDocuments={{
                  idType: documents.idType,
                  idDocument: documents.idDocument,
                  idCardFront: documents.idCardFront,
                  idCardBack: documents.idCardBack,
                }}
                numberPrefix={`${identityNumber}.`}
                title={fields?.title}
                subtitle={fields?.subtitle}
                bookLabel={fields?.bookLabel}
                bookDescription={fields?.bookDescription}
                cardLabel={fields?.cardLabel}
                cardDescription={fields?.cardDescription}
                bookUploadTitle={fields?.bookUploadTitle}
                bookUploadDescription={fields?.bookUploadDescription}
                cardFrontTitle={fields?.cardFrontTitle}
                cardFrontDescription={fields?.cardFrontDescription}
                cardBackTitle={fields?.cardBackTitle}
                cardBackDescription={fields?.cardBackDescription}
              />
            )}
            
            {/* Hidden Text components for Page Builder editability - nested ID upload fields */}
            <div style={{ display: 'none' }}>
              <Text field={fields?.bookUploadTitle} />
              <Text field={fields?.bookUploadDescription} />
              <Text field={fields?.cardFrontTitle} />
              <Text field={fields?.cardFrontDescription} />
              <Text field={fields?.cardBackTitle} />
              <Text field={fields?.cardBackDescription} />
            </div>

            {isAddressRequired && (
              <FileUploadInput
                title={fields?.Address_Title}
                description={fields?.Address_Description}
                numberPrefix={`${addressNumber}.`}
                accept={addressAccept}
                maxSize={addressMaxSize}
                onFileChange={(file) => handleFileChange("proofOfAddress", file)}
                onError={handleFileError}
                showButtons={false}
                autoUpload={true}
                initialFile={documents.proofOfAddress}
              />
            )}

            {isBankingRequired && (
              <FileUploadInput
                title={fields?.["Proof of Banking Details_Title"]}
                description={fields?.["Proof of Banking Details_Description"]}
                numberPrefix={`${bankingNumber}.`}
                accept={bankingAccept}
                maxSize={bankingMaxSize}
                onFileChange={(file) => handleFileChange("proofOfBanking", file)}
                onError={handleFileError}
                showButtons={false}
                autoUpload={true}
                initialFile={documents.proofOfBanking}
              />
            )}
          </div>
        )}

        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full py-6 text-white ${canSubmit
                ? "bg-[#2c5f5d] hover:bg-[#234a48]"
                : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            <Text field={fields?.SubmitButtonText} />
          </Button>
          {!canSubmit && (
            <p className="text-sm text-gray-500 text-center mt-2">
              <Text field={fields?.PageValidationText} />
            </p>
          )}

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onBack}
              className="text-sm text-gray-600 hover:text-[#2c5f5d] underline transition-colors"
            >
              <Text field={fields?.BackBtnText} />
            </button>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};
