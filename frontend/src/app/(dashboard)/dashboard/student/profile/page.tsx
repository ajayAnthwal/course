"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from "@/components/ui";
import { useUpdateUser } from "@/features/users";
import { formatDate } from "@/lib/utils";

function StudentProfileContent() {
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
        onSuccess: () => {
          setIsEditing(false);
        },
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
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">My Profile</h1>
          <p className="text-neutral-500 mt-1">View and manage your account information.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-700">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-neutral-900">{user?.name}</h2>
                <p className="text-sm text-neutral-500 mt-1">{user?.email}</p>
                <div className="mt-3">
                  <Badge variant="primary">Student</Badge>
                </div>
                <p className="text-xs text-neutral-400 mt-4">
                  Member since {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Account Information</CardTitle>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
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
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Full Name</p>
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
                        <Badge variant="primary" size="sm">Student</Badge>
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

            {/* Security Note */}
            <Card className="mt-6">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">Security</h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      Your password is securely stored. Contact support if you need to change your password.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function StudentProfilePage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentProfileContent />
    </ProtectedRoute>
  );
}
