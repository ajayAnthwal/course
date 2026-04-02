import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label?: string;
  value?: string;
  onChange: (file: File | null) => void;
  accept?: string;
  className?: string;
}

export function FileUpload({ label, value, onChange, accept = "image/*", className }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
    onChange(file);
  };

  const removeFile = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("w-full", className)}>
      {label && <label className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>}
      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-neutral-200">
          <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
          <button
            type="button"
            onClick={removeFile}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 hover:bg-neutral-100 hover:border-primary-400 cursor-pointer transition-all"
        >
          <svg className="w-8 h-8 text-neutral-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-neutral-500">Click to upload image</p>
          <p className="text-xs text-neutral-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
        </div>
      )}
      <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
    </div>
  );
}
