"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react";

type Props = {
  onChange: (file: File | null) => void;
  docType?: string;
  required?: boolean;
  allowedTypes?: string[]; 
  maxSizeMB?: number;
  error?: string; 
};

export default function AppImageUpload({
  onChange,
  docType = "file",
  required = false,
  allowedTypes = ["image/png", "image/jpeg", "image/jpg"],
  maxSizeMB = 2,
  error: externalError,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const handleFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type");
      onChange(null);
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Max ${maxSizeMB}MB allowed`);
      onChange(null);
      return;
    }
    setError("");
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  return (
    <div className="space-y-2">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-xl p-4 cursor-pointer hover:bg-gray-800">
        <UploadCloud className="mb-2" />
        <span className="text-sm text-gray-300">
          Upload {docType} {required && "*"}
        </span>
        <input
          type="file"
          className="hidden"
          accept={allowedTypes.join(",")}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            else if (required) {
              setError("File is required");
              onChange(null);
            }
          }}
        />
      </label>
      {preview && (
        <div className="relative w-full h-40">
          <Image
            src={preview}
            alt="preview"
            fill
            className="object-contain rounded-lg"
          />
        </div>
      )}
      {(error || externalError) && (
        <p className="text-red-400 text-sm">
          {error || externalError}
        </p>
      )}
    </div>
  );
}