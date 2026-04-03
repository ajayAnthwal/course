"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, Button, Input, Badge, Modal, Textarea, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import apiClient from "@/services/axios";

const statusBadge: Record<string, { label: string; variant: "success" | "warning" | "danger" | "default" }> = {
  pending: { label: "Pending", variant: "warning" },
  sent: { label: "Sent", variant: "success" },
  failed: { label: "Failed", variant: "danger" },
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState({ type: "all", status: "all" });
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [sendForm, setSendForm] = useState({ type: "in-app", recipient: "", title: "", message: "", userIds: "" });
  const [sending, setSending] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);

  const fetchNotifications = async (page = 1) => {
    setLoading(true);
    try {
      const response = await apiClient.get("/notifications/all", {
        params: { page, limit: pagination.limit, ...filters },
      });
      setNotifications(response.data.data.data || []);
      setPagination(prev => ({ ...prev, ...response.data.data.pagination, page }));
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await apiClient.get("/notifications/templates");
      setTemplates(response.data.data.data || []);
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    }
  };

  const handleSend = async () => {
    setSending(true);
    try {
      if (sendForm.type === "in-app" && sendForm.userIds) {
        const userIds = sendForm.userIds.split(",").map((id: string) => id.trim());
        await apiClient.post("/notifications/bulk", {
          userIds,
          type: sendForm.type,
          title: sendForm.title,
          message: sendForm.message,
        });
      } else {
        await apiClient.post("/notifications/send", {
          type: sendForm.type,
          title: sendForm.title,
          message: sendForm.message,
          recipient: sendForm.recipient,
        });
      }
      showToast("Notification sent successfully", "success");
      setIsSendOpen(false);
      setSendForm({ type: "in-app", recipient: "", title: "", message: "", userIds: "" });
      fetchNotifications(pagination.page);
    } catch (error: any) {
      showToast(error.response?.data?.message || "Failed to send notification", "error");
    } finally {
      setSending(false);
    }
  };

  const loadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSendForm({ ...sendForm, title: template.name, message: template.content });
    }
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Notifications</h1>
            <p className="text-neutral-500 mt-1">Send and manage notifications</p>
          </div>
          <Button onClick={() => { fetchTemplates(); setIsSendOpen(true); }}>Send Notification</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-neutral-900">{pagination.total}</p><p className="text-sm text-neutral-500">Total</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-green-600">{notifications.filter(n => n.status === "sent").length}</p><p className="text-sm text-neutral-500">Sent</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-yellow-600">{notifications.filter(n => n.status === "pending").length}</p><p className="text-sm text-neutral-500">Pending</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-red-600">{notifications.filter(n => n.status === "failed").length}</p><p className="text-sm text-neutral-500">Failed</p></CardContent></Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v })}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="in-app">In-App</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.status} onValueChange={(v) => setFilters({ ...filters, status: v })}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => fetchNotifications(1)}>Apply</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Table */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left text-xs font-semibold text-neutral-500 uppercase px-6 py-4">Type</th>
                  <th className="text-left text-xs font-semibold text-neutral-500 uppercase px-6 py-4">Title</th>
                  <th className="text-left text-xs font-semibold text-neutral-500 uppercase px-6 py-4">Recipient</th>
                  <th className="text-left text-xs font-semibold text-neutral-500 uppercase px-6 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-neutral-500 uppercase px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-neutral-500">Loading...</td></tr>
                ) : notifications.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-neutral-500">No notifications found</td></tr>
                ) : (
                  notifications.map((notification) => {
                    const badge = statusBadge[notification.status] || statusBadge.pending;
                    const typeIcon = ({ sms: "📱", email: "📧", whatsapp: "💬", "in-app": "🔔" } as Record<string, string>)[notification.type] || "📨";
                    return (
                      <tr key={notification._id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4"><span className="text-xl">{typeIcon}</span></td>
                        <td className="px-6 py-4 text-sm font-medium text-neutral-900">{notification.title}</td>
                        <td className="px-6 py-4 text-sm text-neutral-600">{notification.recipient}</td>
                        <td className="px-6 py-4"><Badge variant={badge.variant}>{badge.label}</Badge></td>
                        <td className="px-6 py-4 text-sm text-neutral-500">{formatDate(notification.createdAt)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100">
            <p className="text-sm text-neutral-500">Showing {notifications.length} of {pagination.total}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={pagination.page === 1} onClick={() => fetchNotifications(pagination.page - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={pagination.page >= pagination.totalPages} onClick={() => fetchNotifications(pagination.page + 1)}>Next</Button>
            </div>
          </div>
        </Card>

        {/* Send Notification Modal */}
        <Modal isOpen={isSendOpen} onClose={() => setIsSendOpen(false)} title="Send Notification" size="lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Template (optional)</label>
              <Select onValueChange={loadTemplate}>
                <SelectTrigger><SelectValue placeholder="Select a template" /></SelectTrigger>
                <SelectContent>
                  {templates.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Type</label>
              <Select value={sendForm.type} onValueChange={(v) => setSendForm({ ...sendForm, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-app">In-App</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {sendForm.type === "in-app" ? (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">User IDs (comma separated)</label>
                <Input placeholder="user-id-1, user-id-2" value={sendForm.userIds} onChange={(e) => setSendForm({ ...sendForm, userIds: e.target.value })} />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Recipient</label>
                <Input placeholder={sendForm.type === "email" ? "email@example.com" : "+911234567890"} value={sendForm.recipient} onChange={(e) => setSendForm({ ...sendForm, recipient: e.target.value })} />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Title</label>
              <Input value={sendForm.title} onChange={(e) => setSendForm({ ...sendForm, title: e.target.value })} placeholder="Notification title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Message</label>
              <Textarea value={sendForm.message} onChange={(e) => setSendForm({ ...sendForm, message: e.target.value })} placeholder="Your message..." rows={4} />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsSendOpen(false)}>Cancel</Button>
              <Button onClick={handleSend} isLoading={sending}>Send</Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}