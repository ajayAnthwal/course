"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@/components/ui";
import axios from "@/services/axios";

interface ImportResult {
  success: number;
  failed: number;
  errors: { row: number; error: string }[];
}

interface BulkImportProps {
  type: "colleges" | "courses" | "users" | "leads";
  onSuccess?: (result: ImportResult) => void;
}

export function BulkImport({ type, onSuccess }: BulkImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const typeLabels = {
    colleges: "Colleges",
    courses: "Courses",
    users: "Users",
    leads: "Leads",
  };

  const sampleHeaders = {
    colleges: "name,slug,type,city,state,email,phone,establishedYear",
    courses: "name,slug,category,level,duration,feesMin,feesMax",
    users: "name,email,phone,role",
    leads: "name,email,phone,course,college",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".csv")) {
        alert("Please select a CSV file");
        return;
      }
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`/admin/import/${type}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
      onSuccess?.(response.data);
    } catch (error: any) {
      console.error("Import error:", error);
      setResult({
        success: 0,
        failed: 0,
        errors: [{ row: 0, error: error.response?.data?.message || "Import failed" }],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSample = () => {
    const content = sampleHeaders[type];
    const blob = new Blob([content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_sample.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Import {typeLabels[type]}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            {file ? file.name : "Select CSV File"}
          </Button>
          <Button variant="ghost" onClick={downloadSample}>
            Download Sample
          </Button>
        </div>

        {file && (
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
            <div>
              <p className="font-medium text-neutral-900">{file.name}</p>
              <p className="text-sm text-neutral-500">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
            <Button onClick={handleImport} disabled={isLoading}>
              {isLoading ? "Importing..." : "Import Data"}
            </Button>
          </div>
        )}

        {result && (
          <div className={`p-4 rounded-xl ${result.success > 0 ? "bg-success-50" : "bg-error-50"}`}>
            <div className="flex items-center gap-4 mb-3">
              <Badge variant={result.success > 0 ? "success" : "danger"}>
                {result.success > 0 ? "Import Successful" : "Import Failed"}
              </Badge>
              <span className="text-sm text-neutral-600">
                Success: {result.success} | Failed: {result.failed}
              </span>
            </div>
            {result.errors.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-neutral-700 mb-2">Errors:</p>
                <ul className="text-sm text-neutral-500 space-y-1">
                  {result.errors.slice(0, 5).map((err, idx) => (
                    <li key={idx}>Row {err.row}: {err.error}</li>
                  ))}
                  {result.errors.length > 5 && (
                    <li>...and {result.errors.length - 5} more errors</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="text-sm text-neutral-500">
          <p className="font-medium mb-1">Instructions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Download the sample CSV file to see the required format</li>
            <li>Fill in the data following the same column order</li>
            <li>Upload the file and click Import</li>
            <li>Maximum file size: 5MB</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}