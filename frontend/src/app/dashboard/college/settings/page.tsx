"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea, Badge, Spinner } from "@/components/ui";
import { useUpdateUser } from "@/features/users";
import { formatDate } from "@/lib/utils";

function CollegeSettingsContent() {
  const { user } = useAuth();
  const updateUser = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const handleSave = () => {
    if (!user) return;
    updateUser.mutate(
      {
        id: user._id,
        data: {
          name: form.name,
          phone: form.phone || undefined,
        },
      },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  return (
    <DashboardLayout role="college" userName={user?.name}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">College Settings</h1>
          <p className="text-neutral-500 mt-1">Manage your account and college profile.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary-700">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-neutral-900">{user?.name}</h2>
                <p className="text-sm text-neutral-500 mt-1">{user?.email}</p>
                <div className="mt-3">
                  <Badge variant="secondary">College</Badge>
                </div>
                <p className="text-xs text-neutral-400 mt-4">
                  Member since {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                </p>
              </CardContent>
            </Card>

            {/* College Profile Info */}
            <Card className="mt-6">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">College Profile</h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      Contact admin to update your college listing details such as courses, fees, and facilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Account Information</CardTitle>
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      label="College Name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    />
                    <div className="flex justify-end gap-3 pt-2">
                      <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                      <Button onClick={handleSave} isLoading={updateUser.isPending}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">College Name</p>
                        <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Email</p>
                        <p className="text-sm text-neutral-700">{user?.email}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Phone</p>
                        <p className="text-sm text-neutral-700">{user?.phone || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Role</p>
                        <Badge variant="secondary" size="sm">College</Badge>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-neutral-100">
                      <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Account Status</p>
                      <Badge variant={user?.isActive ? "success" : "danger"} size="sm" dot>
                        {user?.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subscription / Plan Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-xl bg-primary-50 border border-primary-100">
                  <div>
                    <p className="text-sm font-semibold text-primary-900">Free Plan</p>
                    <p className="text-xs text-primary-600 mt-0.5">Basic listing with limited leads</p>
                  </div>
                  <Badge variant="primary" size="sm">Active</Badge>
                </div>
                <p className="text-sm text-neutral-500 mt-4">
                  Upgrade to a premium plan to unlock more leads, featured listing, and priority support.
                </p>
                <Button className="mt-4" variant="outline" disabled>
                  Upgrade Plan (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function CollegeSettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["college"]}>
      <CollegeSettingsContent />
    </ProtectedRoute>
  );
}
