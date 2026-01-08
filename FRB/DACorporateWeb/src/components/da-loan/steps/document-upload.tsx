"use client";

import { File, FileText, Image as ImageIcon, Upload, X, CheckCircle2 } from "lucide-react";
import { ChangeEvent, DragEvent, RefObject, useRef, useState } from "react";
import { Button } from "components/da-loan/ui-premetive/button";
import { Card, CardContent } from "components/da-loan/ui-premetive/card";
import { Progress } from "components/da-loan/ui-premetive/progress";
import { Label } from "components/da-loan/ui-premetive/label";
import { RadioGroup, RadioGroupItem } from "components/da-loan/ui-premetive/radio-group";

interface DocumentUploadProps {
	readonly onSubmit: (documents: UploadedDocuments) => void;
	readonly onBack?: () => void;
}

export interface UploadedDocuments {
	idType: "book" | "card";
	idDocument: File | null;
	idCardFront: File | null;
	idCardBack: File | null;
	proofOfAddress: File | null;
	proofOfBanking: File | null;
}

interface UploadState {
	file: File | null;
	progress: number;
	uploading: boolean;
	complete: boolean;
}

type DocumentType = "idDocument" | "idCardFront" | "idCardBack" | "proofOfAddress" | "proofOfBanking";

export const Default = ({ onSubmit, onBack }: Readonly<DocumentUploadProps>) => {
  const [documents, setDocuments] = useState<UploadedDocuments>({
    idType: "book",
    idDocument: null,
    idCardFront: null,
    idCardBack: null,
    proofOfAddress: null,
    proofOfBanking: null,
  });

  const [uploadStates, setUploadStates] = useState<
    Record<DocumentType, UploadState>
  >({
    idDocument: { file: null, progress: 0, uploading: false, complete: false },
    idCardFront: { file: null, progress: 0, uploading: false, complete: false },
    idCardBack: { file: null, progress: 0, uploading: false, complete: false },
    proofOfAddress: {
      file: null,
      progress: 0,
      uploading: false,
      complete: false,
    },
    proofOfBanking: {
      file: null,
      progress: 0,
      uploading: false,
      complete: false,
    },
  });

  const idInputRef = useRef<HTMLInputElement | null>(null);
  const idCardFrontInputRef = useRef<HTMLInputElement | null>(null);
  const idCardBackInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const bankingInputRef = useRef<HTMLInputElement | null>(null);

  const inputRefs: Record<DocumentType, RefObject<HTMLInputElement | null>> = {
    idDocument: idInputRef,
    idCardFront: idCardFrontInputRef,
    idCardBack: idCardBackInputRef,
    proofOfAddress: addressInputRef,
    proofOfBanking: bankingInputRef,
  };

  const validFileTypes = new Set([
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/heic",
  ]);

  const simulateUpload = (file: File, docType: DocumentType) => {
    const interval = setInterval(() => {
      setUploadStates((prev) => {
        const newProgress = prev[docType].progress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);

          setDocuments((prevDocs) => ({
            ...prevDocs,
            [docType]: file,
          }));

          return {
            ...prev,
            [docType]: {
              ...prev[docType],
              progress: 100,
              uploading: false,
              complete: true,
            },
          };
        }
        return {
          ...prev,
          [docType]: { ...prev[docType], progress: newProgress },
        };
      });
    }, 150);
  };

  const handleFile = (file: File | undefined, docType: DocumentType) => {
    if (!file) return;

    if (!validFileTypes.has(file.type)) {
      alert("Please upload a PDF, JPG, PNG, or HEIC file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.");
      return;
    }

    setUploadStates((prev) => ({
      ...prev,
      [docType]: { file, progress: 0, uploading: true, complete: false },
    }));

    simulateUpload(file, docType);
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    docType: DocumentType
  ) => {
    handleFile(event.target.files?.[0], docType);
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    docType: DocumentType
  ) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0], docType);
  };

  const resetFile = (docType: DocumentType) => {
    setUploadStates((prev) => ({
      ...prev,
      [docType]: { file: null, progress: 0, uploading: false, complete: false },
    }));

    setDocuments((prev) => ({
      ...prev,
      [docType]: null,
    }));

    const inputRef = inputRefs[docType];

    if (inputRef?.current) {
      inputRef.current.value = "";
    }
  };

  const getFileIcon = (file: File | null) => {
    if (!file) return <Upload className="h-5 w-5 text-gray-400" />;

    const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
    if (fileExt === "pdf") {
      return <FileText className="h-5 w-5 text-red-600" />;
    }
    return <ImageIcon className="h-5 w-5 text-blue-600" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
    );
  };

  const canSubmit =
    (documents.idType === "book"
      ? Boolean(documents.idDocument)
      : Boolean(documents.idCardFront && documents.idCardBack)) &&
    documents.proofOfAddress &&
    documents.proofOfBanking;

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit(documents);
    }
  };

  const handleIdTypeChange = (value: "book" | "card") => {
    setDocuments((prev) => ({ ...prev, idType: value }));

    if (value === "book") {
      resetFile("idCardFront");
      resetFile("idCardBack");
    } else {
      resetFile("idDocument");
    }
  };

  const renderUploadArea = (
    docType: DocumentType,
    title: string,
    description: string,
    inputId: string
  ) => {
    const state = uploadStates[docType];
    const inputRef = inputRefs[docType];

    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-600 mb-2">{description}</p>

        {state.file ? (
          <Card className="relative bg-gray-50">
            <CardContent className="p-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 text-gray-400 hover:text-gray-600"
                onClick={() => resetFile(docType)}
                disabled={state.uploading}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="flex items-start space-x-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white border border-gray-200">
                  {getFileIcon(state.file)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {state.file?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {state.file && formatFileSize(state.file.size)}
                  </p>

                  {state.uploading && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Progress
                        value={state.progress}
                        className="h-1.5 flex-1"
                      />
                      <span className="text-xs text-gray-500 w-10">
                        {state.progress}%
                      </span>
                    </div>
                  )}

                  {state.complete && (
                    <div className="flex items-center mt-2 text-green-600">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">
                        Uploaded successfully
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div
            className="flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8 hover:border-gray-400 transition-colors cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, docType)}
            onClick={() => inputRef.current?.click()}
          >
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <div className="mt-2 flex text-sm text-gray-600">
                <span className="font-medium text-[#2c5f5d]">
                  Upload a file
                </span>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                PDF, JPG, PNG or HEIC up to 10MB
              </p>
              <input
                id={inputId}
                name={inputId}
                type="file"
                className="sr-only"
                accept=".pdf,.jpg,.jpeg,.png,.heic"
                onChange={(e) => handleFileChange(e, docType)}
                ref={inputRef}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full mx-auto bg-white">
      <CardContent className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Upload Documents
          </h2>
          <p className="text-sm text-gray-600">
            Please upload the following documents to complete your application.
            All documents are required.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-900">
              What type of ID do you have?
            </p>
            <p className="text-xs text-gray-600">
              Select your ID type so we can ask for the right set of documents.
            </p>
            <RadioGroup
              value={documents.idType}
              onValueChange={(value) =>
                handleIdTypeChange(value as "book" | "card")
              }
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
                    Green ID book
                  </p>
                  <p className="text-xs text-gray-600">
                    We only need one clear copy of the photo page.
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
                    Smart ID card
                  </p>
                  <p className="text-xs text-gray-600">
                    Upload clear copies of both the front and the back.
                  </p>
                </div>
              </Label>
            </RadioGroup>
          </div>

          {documents.idType === "book" ? (
            renderUploadArea(
              "idDocument",
              "1. Copy of your ID book",
              "Upload a clear copy of the photo page of your green ID book.",
              "id-upload"
            )
          ) : (
            <div className="space-y-6">
              {renderUploadArea(
                "idCardFront",
                "1a. ID card front",
                "Upload a clear copy showing the front of your smart ID card.",
                "id-card-front-upload"
              )}
              {renderUploadArea(
                "idCardBack",
                "1b. ID card back",
                "Upload a clear copy showing the back of your smart ID card.",
                "id-card-back-upload"
              )}
            </div>
          )}

          {renderUploadArea(
            "proofOfAddress",
            "2. Proof of Address",
            "Upload a clear utility bill or bank statement from the last 3 months.",
            "address-upload"
          )}

          {renderUploadArea(
            "proofOfBanking",
            "3. Proof of Banking Details",
            "Upload a clear bank statement from the last 3 months.",
            "banking-upload"
          )}
        </div>

        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full py-6 text-white ${
              canSubmit
                ? "bg-[#2c5f5d] hover:bg-[#234a48]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Continue
          </Button>
          {!canSubmit && (
            <p className="text-sm text-gray-500 text-center mt-2">
              Please upload all required documents to continue
            </p>
          )}
          {onBack && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={onBack}
                className="text-sm text-gray-600 hover:text-[#2c5f5d] underline transition-colors"
              >
                Go back to previous step
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
