"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
       //resolve({ requiredDocs: ["ProofofBankingDetails", "ProofofAddress"] });
    }, 0);
  });
};

interface DocumentUploadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields?: any;
  readonly onSubmit?: (documents: UploadedDocuments, skipped?: boolean) => void;
  readonly onBack?: () => void;
  AllowSkipDocuments?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface DocumentOption {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    title?: { value: string };
    description?: { value: string };
    accept?: { value: string };
    maxSize?: { value: number };
  };
}

export interface UploadedDocuments {
  idType: "book" | "card";
  idDocument: File | null;
  idCardFront: File | null;
  idCardBack: File | null;
  [key: string]: File | null | string; // Allow dynamic document properties
}

export const Default = (props: DocumentUploadProps) => {
  const router = useRouter();
  const { onSubmit, onBack } = props;
  const { fields: propsFields = {} } = props;
  const fields = propsFields.fields || propsFields;
  // Set AllowSkipDocuments true by default
  const allowSkipDocuments = true;
 
  console.log("Document Upload Props:", props);
  console.log("Document Upload Fields:", fields);

  // Helper function to parse accept field (removes quotes and splits by comma)
  const parseAcceptField = (acceptValue: string): string[] => {
    if (!acceptValue) return [];
    return acceptValue
      .replace(/['"]/g, '') // Remove quotes
      .split(',') // Split by comma
      .map(ext => ext.trim()) // Trim whitespace
      .filter(ext => ext); // Remove empty strings
  };

  // Parse identity document settings from fields
  const identityAccept = parseAcceptField(fields?.ProofofIdentity_Accept?.value);
  const identityMaxSize = fields?.proofOfIdentityMaxSize?.value;

  const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [documents, setDocuments] = useState<UploadedDocuments>({
    idType: "book",
    idDocument: null,
    idCardFront: null,
    idCardBack: null,
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
  
  // Get non-identity required documents
  const nonIdentityRequiredDocs = requiredDocs.filter(doc => doc !== "ProofOfIdentity");
  
  // Get document options for required non-identity docs from Sitecore (case-insensitive match)
  const documentOptions = ((fields?.DocumentTypeOptions as DocumentOption[]) || []).filter((option: DocumentOption) =>
    nonIdentityRequiredDocs.some(docName => docName.toLowerCase() === option.name.toLowerCase())
  );

  // Calculate dynamic numbering
  let currentNumber = 1;
  const identityNumber = isIdentityRequired ? currentNumber++ : 0;


  // Helper to check if all required documents are uploaded
  const allRequiredDocsUploaded = () => {
    return (
      (!isIdentityRequired ||
        (documents.idType === "book"
          ? Boolean(documents.idDocument)
          : Boolean(documents.idCardFront && documents.idCardBack))) &&
      documentOptions.every((option: DocumentOption) => Boolean(documents[option.name]))
    );
  };

  // Validate that all required documents are uploaded
  const allowSkip = !!allowSkipDocuments;
  const canSubmit = allowSkip ? true : allRequiredDocsUploaded();

  const handleSubmit = () => {
    if (canSubmit) {
      console.log("Documents submitted:", documents);
      if (onSubmit && typeof onSubmit === "function") {
        onSubmit(documents);
      }
      router.push("/loans/application-submitted");
    }
  };

  const handleSkip = () => {
    if (onSubmit && typeof onSubmit === "function") {
      onSubmit(documents, true);
    }
    // You may want to route to next step or keep user on same page depending on flow
    router.push("/loans/application-submitted");
  };

  const handleBack = () => {
    if (onBack && typeof onBack === "function") {
      onBack();
    } else {
      router.back();
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

            {/* Render dynamic documents from DocumentTypeOptions */}
            {documentOptions.map((option: DocumentOption) => {
              const docNumber = currentNumber++;
              const initialFile = documents[option.name];
              return (
                <FileUploadInput
                  key={option.name}
                  title={option.fields?.title}
                  description={option.fields?.description}
                  numberPrefix={`${docNumber}.`}
                  accept={parseAcceptField(option.fields?.accept?.value || "")}
                  maxSize={option.fields?.maxSize?.value}
                  onFileChange={(file) => handleFileChange(option.name, file)}
                  onError={handleFileError}
                  showButtons={false}
                  autoUpload={true}
                  initialFile={initialFile instanceof File || initialFile === null ? initialFile : null}
                />
              );
            })}
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
        
            {/* Hide PageValidationText if all required docs are uploaded */}
            {!allRequiredDocsUploaded() && (
              <p className="text-sm text-gray-500 text-center mt-2">
                <Text field={fields?.PageValidationText} />
              </p>
            )}
         

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-gray-600 hover:text-[#2c5f5d] underline transition-colors cursor-pointer"
            >
              <Text field={fields?.BackBtnText} />
            </button>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};
