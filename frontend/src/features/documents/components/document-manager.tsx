"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Modal } from "@/components/ui";
import axios from "@/services/axios";

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
  category: string;
}

interface DocumentManagerProps {
  applicationId?: string;
  leadId?: string;
  studentId?: string;
  maxDocuments?: number;
}

export function DocumentManager({ applicationId, leadId, studentId, maxDocuments = 10 }: DocumentManagerProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const documentCategories = [
    { value: "photo", label: "Passport Photo" },
    { value: "aadhar", label: "Aadhar Card" },
    { value: "pan", label: "PAN Card" },
    { value: "marksheet_10", label: "10th Marksheet" },
    { value: "marksheet_12", label: "12th Marksheet" },
    { value: "entrance", label: "Entrance Scorecard" },
    { value: "income", label: "Income Certificate" },
    { value: "caste", label: "Caste Certificate" },
    { value: "other", label: "Other" },
  ];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (documents.length >= maxDocuments) {
      alert(`Maximum ${maxDocuments} documents allowed`);
      return;
    }

    setIsUploading(true);

    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} exceeds 5MB limit`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        if (applicationId) formData.append("applicationId", applicationId);
        if (leadId) formData.append("leadId", leadId);
        if (studentId) formData.append("studentId", studentId);

        const response = await axios.post("/documents/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setDocuments((prev) => [...prev, response.data.data]);
      } catch (error) {
        console.error("Upload error:", error);
        alert(`Failed to upload ${file.name}`);
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (docId: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      await axios.delete(`/documents/${docId}`);
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete document");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "📄";
    if (type.includes("image")) return "🖼️";
    if (type.includes("doc")) return "📝";
    return "📎";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents ({documents.length}/{maxDocuments})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || documents.length >= maxDocuments}
          variant="outline"
          className="w-full"
        >
          {isUploading ? "Uploading..." : `Upload Documents (${documents.length}/${maxDocuments})`}
        </Button>

        {documents.length > 0 ? (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getFileIcon(doc.type)}</span>
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">{doc.name}</p>
                    <p className="text-xs text-neutral-500">
                      {formatFileSize(doc.size)} • {new Date(doc.uploadedAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setPreviewDoc(doc)}>
                    View
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => window.open(doc.url, "_blank")}>
                    Download
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)} className="text-red-500">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-400">
            <div className="text-4xl mb-2">📂</div>
            <p>No documents uploaded yet</p>
            <p className="text-sm">Upload required documents for verification</p>
          </div>
        )}

        <div className="text-sm text-neutral-500 bg-neutral-50 p-3 rounded-lg">
          <p className="font-medium mb-1">Accepted formats:</p>
          <p>PDF, JPG, PNG, DOC (Max 5MB each)</p>
        </div>

        <Modal isOpen={!!previewDoc} onClose={() => setPreviewDoc(null)} title={previewDoc?.name} size="lg">
          {previewDoc && (
            <div className="flex flex-col items-center">
              {previewDoc.type.includes("image") ? (
                <img src={previewDoc.url} alt={previewDoc.name} className="max-h-96 rounded-lg" />
              ) : (
                <iframe src={previewDoc.url} className="w-full h-96 rounded-lg" />
              )}
              <div className="flex gap-2 mt-4">
                <Button onClick={() => window.open(previewDoc.url, "_blank")}>Download</Button>
                <Button variant="outline" onClick={() => setPreviewDoc(null)}>Close</Button>
              </div>
            </div>
          )}
        </Modal>
      </CardContent>
    </Card>
  );
}