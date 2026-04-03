"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, useToast, Textarea, Modal } from "@/components/ui";
import { useUpdateUser } from "@/features/users";
import { formatDate } from "@/lib/utils";
import apiClient from "@/services/axios";

function AdminSettingsContent() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const updateUser = useUpdateUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "" });
  const [apiKeys, setApiKeys] = useState({
    razorpay: { keyId: "", keySecret: "", enabled: false },
    sms: { provider: "msg91", apiKey: "", enabled: false },
    email: { provider: "", apiKey: "", enabled: false },
    whatsapp: { phoneNumber: "", apiKey: "", enabled: false },
  });
  const [systemSettings, setSystemSettings] = useState({
    siteName: "EduPortal",
    supportEmail: "support@eduportal.com",
    supportPhone: "+91 1234567890",
    allowRegistration: true,
    requireEmailVerification: true,
    maintenanceMode: false,
  });
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [keyValue, setKeyValue] = useState("");

  const handleSave = () => {
    if (!user) return;
    updateUser.mutate(
      { id: user._id, data: { name: form.name, phone: form.phone || undefined } },
      { onSuccess: () => { setIsEditing(false); showToast("Profile updated", "success"); } }
    );
  };

  const handleSaveApiKey = (provider: string) => {
    setApiKeys((prev) => ({
      ...prev,
      [provider]: { ...prev[provider as keyof typeof prev], enabled: true },
    }));
    showToast(`${provider} API key updated`, "success");
    setIsKeyModalOpen(false);
    setSelectedKey(null);
    setKeyValue("");
  };

  const handleSaveSettings = () => {
    showToast("Settings saved", "success");
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "api", label: "API Keys" },
    { id: "system", label: "System" },
    { id: "security", label: "Security" },
  ];

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-500 mt-1">Manage your account and system settings</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-neutral-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-neutral-500 hover:text-neutral-700"
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
                  <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-700">{user?.name?.charAt(0).toUpperCase()}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-neutral-900">{user?.name}</h2>
                  <p className="text-sm text-neutral-500 mt-1">{user?.email}</p>
                  <div className="mt-3"><Badge variant="danger">Admin</Badge></div>
                  <p className="text-xs text-neutral-500 mt-4">Member since {user?.createdAt ? formatDate(user.createdAt) : "N/A"}</p>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Account Information</CardTitle>
                    {!isEditing && <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>}
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <Input label="Full Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                      <Input label="Phone" type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                      <div className="flex justify-end gap-3 pt-2">
                        <Button variant="outline" onClick={() => { setForm({ name: user?.name || "", phone: user?.phone || "" }); setIsEditing(false); }}>Cancel</Button>
                        <Button onClick={handleSave} isLoading={updateUser.isPending}>Save</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div><p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Name</p><p className="text-sm font-semibold text-neutral-900">{user?.name}</p></div>
                      <div><p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Email</p><p className="text-sm font-medium text-neutral-900">{user?.email}</p></div>
                      <div><p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Phone</p><p className="text-sm font-medium text-neutral-900">{user?.phone || "Not provided"}</p></div>
                      <div><p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Role</p><Badge variant="danger" size="sm">Admin</Badge></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* API Keys Tab */}
        {activeTab === "api" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(apiKeys).map(([key, value]) => (
              <Card key={key}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="capitalize">{key} Configuration</CardTitle>
                    <Badge variant={value.enabled ? "success" : "warning"}>{value.enabled ? "Active" : "Not Configured"}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {key === "razorpay" && (
                      <>
                        <Input label="Key ID" type="password" value={(value as any).keyId} onChange={(e) => setApiKeys((p) => ({ ...p, razorpay: { ...p.razorpay, keyId: e.target.value } }))} placeholder="rzp_test_xxx" />
                        <Input label="Key Secret" type="password" value={(value as any).keySecret} onChange={(e) => setApiKeys((p) => ({ ...p, razorpay: { ...p.razorpay, keySecret: e.target.value } }))} placeholder="Your secret key" />
                      </>
                    )}
                    {key === "sms" && (
                      <>
                        <Input label="Provider" value={(value as any).provider} onChange={(e) => setApiKeys((p) => ({ ...p, sms: { ...p.sms, provider: e.target.value } }))} placeholder="MSG91, Twilio, etc." />
                        <Input label="API Key" type="password" value={(value as any).apiKey} onChange={(e) => setApiKeys((p) => ({ ...p, sms: { ...p.sms, apiKey: e.target.value } }))} placeholder="Your API key" />
                      </>
                    )}
                    {key === "email" && (
                      <>
                        <Input label="Provider (SMTP)" value={(value as any).provider} onChange={(e) => setApiKeys((p) => ({ ...p, email: { ...p.email, provider: e.target.value } }))} placeholder="SMTP provider" />
                        <Input label="API Key" type="password" value={(value as any).apiKey} onChange={(e) => setApiKeys((p) => ({ ...p, email: { ...p.email, apiKey: e.target.value } }))} placeholder="Your API key" />
                      </>
                    )}
                    {key === "whatsapp" && (
                      <>
                        <Input label="Phone Number" value={(value as any).phoneNumber} onChange={(e) => setApiKeys((p) => ({ ...p, whatsapp: { ...p.whatsapp, phoneNumber: e.target.value } }))} placeholder="+1234567890" />
                        <Input label="API Key" type="password" value={(value as any).apiKey} onChange={(e) => setApiKeys((p) => ({ ...p, whatsapp: { ...p.whatsapp, apiKey: e.target.value } }))} placeholder="Your API key" />
                      </>
                    )}
                    <Button onClick={() => handleSaveApiKey(key)}>Save Configuration</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* System Tab */}
        {activeTab === "system" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>General Settings</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input label="Site Name" value={systemSettings.siteName} onChange={(e) => setSystemSettings((s) => ({ ...s, siteName: e.target.value }))} />
                  <Input label="Support Email" type="email" value={systemSettings.supportEmail} onChange={(e) => setSystemSettings((s) => ({ ...s, supportEmail: e.target.value }))} />
                  <Input label="Support Phone" value={systemSettings.supportPhone} onChange={(e) => setSystemSettings((s) => ({ ...s, supportPhone: e.target.value }))} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Platform Features</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 cursor-pointer">
                    <span className="text-sm font-medium text-neutral-700">Allow User Registration</span>
                    <input type="checkbox" checked={systemSettings.allowRegistration} onChange={(e) => setSystemSettings((s) => ({ ...s, allowRegistration: e.target.checked }))} className="w-5 h-5 rounded" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 cursor-pointer">
                    <span className="text-sm font-medium text-neutral-700">Require Email Verification</span>
                    <input type="checkbox" checked={systemSettings.requireEmailVerification} onChange={(e) => setSystemSettings((s) => ({ ...s, requireEmailVerification: e.target.checked }))} className="w-5 h-5 rounded" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 cursor-pointer">
                    <span className="text-sm font-medium text-neutral-700">Maintenance Mode</span>
                    <input type="checkbox" checked={systemSettings.maintenanceMode} onChange={(e) => setSystemSettings((s) => ({ ...s, maintenanceMode: e.target.checked }))} className="w-5 h-5 rounded" />
                  </label>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              <Button onClick={handleSaveSettings}>Save All Settings</Button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Password</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input label="Current Password" type="password" placeholder="Enter current password" />
                  <Input label="New Password" type="password" placeholder="Enter new password" />
                  <Input label="Confirm Password" type="password" placeholder="Confirm new password" />
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Two-Factor Authentication</CardTitle></CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center text-3xl">🔒</div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">2FA Not Enabled</h3>
                  <p className="text-sm text-neutral-500 mb-4">Add an extra layer of security to your account</p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Sessions</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-100">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Current Session</p>
                      <p className="text-xs text-neutral-500">Chrome on Windows • Active now</p>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
                <Button variant="outline" className="mt-4">Sign Out All Other Sessions</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function AdminSettingsPage() {
  return <ProtectedRoute allowedRoles={["admin"]}><AdminSettingsContent /></ProtectedRoute>;
}