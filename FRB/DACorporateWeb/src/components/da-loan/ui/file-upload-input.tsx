"use client";

import { File, FileText, Image, X, Upload as UploadIcon, CheckCircle2 } from "lucide-react";
import { ChangeEvent, DragEvent, useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "components/da-loan/ui-primitive/button";
import { Card } from "components/da-loan/ui-primitive/card";
import { Progress } from "components/da-loan/ui-primitive/progress";
import { Text } from "@sitecore-content-sdk/nextjs";

type SitecoreField = {
  value: string;
  editable?: string;
} | undefined;

interface FileUploadInputProps {
  title?: SitecoreField;
  description?: SitecoreField;
  numberPrefix?: string;
  accept?: string | string[];
  maxSize?: number; // in MB
  onFileChange?: (file: File | null) => void;
  onUploadComplete?: (file: File) => void;
  onError?: (error: string) => void;
  showButtons?: boolean;
  autoUpload?: boolean;
  initialFile?: File | null;
  className?: string;
}
// Format percentage with two decimals
export function formatPercentage(value: number) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return `${safeValue.toFixed(2)}%`;
}

export function FileUploadInput({
  title,
  description,
  numberPrefix,
  accept = [".png", ".jpg", ".jpeg", ".heic", ".pdf"],
  maxSize = 1,
  onFileChange,
  onUploadComplete,
  onError,
  showButtons = true,
  autoUpload = true,
  initialFile = null,
  className = "",
}: FileUploadInputProps) {
  const [uploadState, setUploadState] = useState<{
    file: File | null;
    progress: number;
    uploading: boolean;
    complete: boolean;
  }>({
    file: initialFile,
    progress: initialFile ? 100 : 0,
    uploading: false,
    complete: Boolean(initialFile),
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse accept prop to get valid extensions and MIME types
  const acceptArray = Array.isArray(accept) ? accept : accept.split(",");
  const validExtensions = acceptArray
    .map((ext) => ext.trim().replace(".", "").toLowerCase());
  
  const validFileTypes: string[] = validExtensions.map((ext) => {
    if (ext === "png") return "image/png";
    if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
    if (ext === "heic") return "image/heic";
    if (ext === "pdf") return "application/pdf";
    return "";
  }).filter(Boolean);

  const acceptedFileTypesText = validExtensions.map(ext => ext.toUpperCase()).join(", ");

  useEffect(() => {
    if (uploadState.file) {
      onFileChange?.(uploadState.file);
      if (uploadState.complete && autoUpload) {
        onUploadComplete?.(uploadState.file);
      }
    } else {
      onFileChange?.(null);
    }
  }, [uploadState.file, uploadState.complete]);

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
    const isValid =
      validFileTypes.includes(file.type) || validExtensions.includes(fileExt);

    if (!isValid) {
      const errorMsg = `Please upload a ${acceptedFileTypesText} file.`;
      toast.error(errorMsg, {
        position: "bottom-right",
        duration: 3000,
      });
      onError?.(errorMsg);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      const errorMsg = `File size must be less than ${maxSize}MB.`;
      toast.error(errorMsg, {
        position: "bottom-right",
        duration: 3000,
      });
      onError?.(errorMsg);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setUploadState({ file, progress: 0, uploading: true, complete: false });

    const interval = setInterval(() => {
      setUploadState((prev) => {
        const newProgress = prev.progress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return { ...prev, progress: 100, uploading: false, complete: true };
        }
        return { ...prev, progress: newProgress };
      });
    }, 150);
  };

  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0]);
  };

  const resetFile = () => {
    setUploadState({ file: null, progress: 0, uploading: false, complete: false });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    if (!uploadState.file) return <UploadIcon className="h-5 w-5 text-gray-400" />;

    const fileExt = uploadState.file.name.split(".").pop()?.toLowerCase() || "";
    
    // Determine image extensions from validExtensions by checking their MIME types
    const imageExtensions = validExtensions.filter(ext => {
      const mimeType = validFileTypes[validExtensions.indexOf(ext)];
      return mimeType?.startsWith("image/");
    });
    
    if (validExtensions.includes(fileExt) && imageExtensions.includes(fileExt)) {
      return <Image className="h-5 w-5 text-blue-600" aria-hidden={true} />;
    } else if (fileExt === "pdf" && validExtensions.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-600" />;
    }
    return <File className="h-5 w-5 text-gray-600" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const { file, progress, uploading, complete } = uploadState;

  return (
    <div className={`space-y-2 ${className}`}>
      {title && (
        <h3 className="text-sm font-semibold text-gray-900">
          {numberPrefix && <span>{numberPrefix} </span>}
          <Text field={title} />
        </h3>
      )}
      {description && <p className="text-xs text-gray-600 mb-2"><Text field={description} /></p>}

      {file ? (
        <Card className="relative bg-gray-50">
          <div className="p-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 text-gray-400 hover:text-gray-600"
              onClick={resetFile}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex items-start space-x-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white border border-gray-200">
                {getFileIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {file && formatFileSize(file.size)}
                </p>

                {uploading && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Progress value={progress} className="h-1.5 flex-1" />
                    <span className="text-xs text-gray-500 w-10">{formatPercentage(progress)}</span>
                  </div>
                )}

                {complete && (
                  <div className="flex items-center mt-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Uploaded successfully</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div
          className="flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8 hover:border-gray-400 transition-colors cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center">
            <UploadIcon className="mx-auto h-8 w-8 text-gray-400" />
            <div className="mt-2 flex text-sm text-gray-600">
              <span className="font-medium text-[#2c5f5d]">Upload a file</span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {acceptedFileTypesText} up to {maxSize}MB
            </p>
            <input
              type="file"
              className="sr-only"
              accept={Array.isArray(accept) ? accept.join(",") : accept}
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
        </div>
      )}

      {showButtons && (
        <div className="mt-4 flex items-center justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            className="whitespace-nowrap"
            onClick={resetFile}
            disabled={!file}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="whitespace-nowrap"
            disabled={!file || uploading || progress < 100}
            onClick={() => file && onUploadComplete?.(file)}
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}
