"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, useToast, Switch } from "@/components/ui";
import { useUpdateUser } from "@/features/users";
import { formatDate } from "@/lib/utils";
import apiClient from "@/services/axios";

function StudentSettingsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const updateUser = useUpdateUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        dateOfBirth: (user as any).dateOfBirth || "",
        address: (user as any).address || "",
        city: (user as any).city || "",
        state: (user as any).state || "",
        pincode: (user as any).pincode || "",
        preferredCourse: (user as any).preferredCourse || "",
        preferredCity: (user as any).preferredCity || "",
      });
    }
    setIsLoading(false);
  }, [user]);

  if (isLoading || !user) {
    return (
      <DashboardLayout role="student" userName={user?.name}>
        <div className="flex items-center justify-center h-64">
          <div className="text-[var(--color-text-muted)]">Loading settings...</div>
        </div>
      </DashboardLayout>
    );
  }

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    dateOfBirth: (user as any)?.dateOfBirth || "",
    address: (user as any)?.address || "",
    city: (user as any)?.city || "",
    state: (user as any)?.state || "",
    pincode: (user as any)?.pincode || "",
    preferredCourse: (user as any)?.preferredCourse || "",
    preferredCity: (user as any)?.preferredCity || "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    whatsapp: false,
    applicationUpdates: true,
    paymentUpdates: true,
    newColleges: false,
    promotions: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showActivity: true,
    allowMessages: true,
  });

  const handleSaveProfile = () => {
    if (!user?._id) {
      showToast("Please wait for user data to load", "error");
      return;
    }
    updateUser.mutate(
      { id: user._id, data: form },
      {
        onSuccess: () => {
          showToast("Profile updated", "success");
          setIsEditing(false);
        },
        onError: () => showToast("Failed to update", "error"),
      }
    );
  };

  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      showToast("Passwords don't match", "error");
      return;
    }
    if (passwords.new.length < 8) {
      showToast("Password must be at least 8 characters", "error");
      return;
    }

    try {
      await apiClient.post("/auth/change-password", {
        currentPassword: passwords.current,
        newPassword: passwords.new,
        confirmNewPassword: passwords.confirm,
      });
      showToast("Password changed successfully", "success");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Failed to change password", "error");
    }
  };

  const handleSaveNotifications = async () => {
    try {
      await apiClient.post("/settings/notifications", notifications);
      showToast("Notification preferences saved", "success");
    } catch (error) {
      showToast("Failed to save preferences", "error");
    }
  };

  const handleSavePrivacy = async () => {
    try {
      await apiClient.post("/settings/privacy", privacy);
      showToast("Privacy settings saved", "success");
    } catch (error) {
      showToast("Failed to save settings", "error");
    }
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "password", label: "Change Password" },
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy" },
  ];

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Settings</h1>
          <p className="text-[var(--color-text-muted)]">Manage your account preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-[var(--color-border-subtle)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-[var(--color-primary-600)] border-b-2 border-[var(--color-primary-600)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-[var(--color-primary-700)]">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold">{user?.name}</h2>
                  <p className="text-sm text-[var(--color-text-muted)]">{user?.email}</p>
                  <Badge variant="primary" className="mt-2">Student</Badge>
                  <p className="text-xs text-[var(--color-text-muted)] mt-4">
                    Member since {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                  </p>
                </CardContent>
              </Card>
            </div>

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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <Input
                          label="Phone"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        <Input
                          label="Date of Birth"
                          type="date"
                          value={form.dateOfBirth}
                          onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                        />
                        <Input
                          label="Pincode"
                          value={form.pincode}
                          onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        />
                        <Input
                          label="City"
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                        />
                        <Input
                          label="State"
                          value={form.state}
                          onChange={(e) => setForm({ ...form, state: e.target.value })}
                        />
                        <Input
                          label="Preferred Course"
                          value={form.preferredCourse}
                          onChange={(e) => setForm({ ...form, preferredCourse: e.target.value })}
                        />
                        <Input
                          label="Preferred City"
                          value={form.preferredCity}
                          onChange={(e) => setForm({ ...form, preferredCity: e.target.value })}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSaveProfile} isLoading={updateUser.isPending}>Save</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] uppercase">Name</p>
                        <p className="font-medium">{user?.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] uppercase">Email</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] uppercase">Phone</p>
                        <p className="font-medium">{user?.phone || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] uppercase">Preferred Course</p>
                        <p className="font-medium">{form.preferredCourse || "Not set"}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              />
              <Input
                label="New Password"
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              />
              <Button onClick={handleChangePassword}>Update Password</Button>
            </CardContent>
          </Card>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { key: "email", label: "Email Notifications" },
                  { key: "sms", label: "SMS Notifications" },
                  { key: "whatsapp", label: "WhatsApp Notifications" },
                  { key: "applicationUpdates", label: "Application Updates" },
                  { key: "paymentUpdates", label: "Payment Updates" },
                  { key: "newColleges", label: "New College Alerts" },
                  { key: "promotions", label: "Promotions & Offers" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-[var(--color-bg-muted)] rounded-lg">
                    <span className="font-medium">{item.label}</span>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
              </div>
              <Button onClick={handleSaveNotifications}>Save Preferences</Button>
            </CardContent>
          </Card>
        )}

        {/* Privacy Tab */}
        {activeTab === "privacy" && (
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[var(--color-bg-muted)] rounded-lg">
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-[var(--color-text-muted)]">Allow others to see your profile</p>
                  </div>
                  <Switch
                    checked={privacy.profileVisible}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-[var(--color-bg-muted)] rounded-lg">
                  <div>
                    <p className="font-medium">Show Activity</p>
                    <p className="text-sm text-[var(--color-text-muted)]">Display your application activity</p>
                  </div>
                  <Switch
                    checked={privacy.showActivity}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, showActivity: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-[var(--color-bg-muted)] rounded-lg">
                  <div>
                    <p className="font-medium">Allow Messages</p>
                    <p className="text-sm text-[var(--color-text-muted)]">Receive messages from colleges</p>
                  </div>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, allowMessages: checked })}
                  />
                </div>
              </div>
              <Button onClick={handleSavePrivacy}>Save Settings</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentSettingsPage />
    </ProtectedRoute>
  );
}