"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { BulkImport } from "@/features/admin/components/bulk-import";

export default function AdminImportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Bulk Import</h1>
        <p className="text-neutral-500">Import data from CSV files</p>
      </div>

      <Tabs defaultValue="colleges" className="w-full">
        <TabsList>
          <TabsTrigger value="colleges">Colleges</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
        <TabsContent value="colleges">
          <BulkImport type="colleges" />
        </TabsContent>
        <TabsContent value="courses">
          <BulkImport type="courses" />
        </TabsContent>
        <TabsContent value="users">
          <BulkImport type="users" />
        </TabsContent>
        <TabsContent value="leads">
          <BulkImport type="leads" />
        </TabsContent>
      </Tabs>
    </div>
  );
}