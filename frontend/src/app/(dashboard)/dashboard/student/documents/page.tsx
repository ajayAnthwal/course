"use client";

import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { DocumentManager } from "@/features/documents";

function StudentDocumentsPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">My Documents</h1>
          <p className="text-neutral-500">Upload and manage your documents for college applications</p>
        </div>

        <DocumentManager maxDocuments={15} />
      </div>
    </DashboardLayout>
  );
}

function DocumentsPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentDocumentsPage />
    </ProtectedRoute>
  );
}

export default DocumentsPage;