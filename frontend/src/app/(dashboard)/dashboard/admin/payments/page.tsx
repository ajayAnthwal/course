"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, Button, Input, Badge, StatCard, Modal, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { paymentService } from "@/features/payments/services/payment.service";
import { formatDate } from "@/lib/utils";

const statusBadge: Record<string, { label: string; variant: "success" | "warning" | "danger" | "default" }> = {
  created: { label: "Pending", variant: "warning" },
  captured: { label: "Success", variant: "success" },
  failed: { label: "Failed", variant: "danger" },
  refunded: { label: "Refunded", variant: "default" },
};

function AdminPaymentsContent() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState({ status: "all", search: "", startDate: "", endDate: "" });
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState<number | undefined>();

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      const [ordersRes, statsRes] = await Promise.all([
        paymentService.getAllOrders({ page, limit: pagination.limit, ...filters }),
        paymentService.getPaymentStats()
      ]);
      setOrders((ordersRes as any)?.data?.data || []);
      setStats((statsRes as any)?.data?.data);
      if ((ordersRes as any)?.data?.pagination) {
        setPagination(prev => ({ ...prev, ...(ordersRes as any).data.pagination, page }));
      }
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      showToast("Failed to load payments", "error");
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    fetchOrders();
  });

  const handleRefund = async () => {
    if (!selectedOrder || !refundAmount) return;
    try {
      await paymentService.processRefund(selectedOrder._id, refundAmount);
      showToast("Refund processed successfully", "success");
      setIsRefundOpen(false);
      setSelectedOrder(null);
      fetchOrders(pagination.page);
    } catch (error) {
      showToast("Failed to process refund", "error");
    }
  };

  const handleExport = async () => {
    try {
      const blob = await paymentService.exportOrders(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `payments-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      showToast("Export completed", "success");
    } catch (error) {
      showToast("Failed to export data", "error");
    }
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Payment Management</h1>
            <p className="text-neutral-500 mt-1">Track transactions and manage refunds</p>
          </div>
          <Button variant="outline" onClick={handleExport}>Export CSV</Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Revenue"
            value={`₹${((stats?.totalRevenue || 0) / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
            change={stats?.totalOrders ? "+12%" : undefined}
            changeType="positive"
            icon={<svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            iconBg="bg-primary-50"
          />
          <StatCard
            label="Total Orders"
            value={stats?.totalOrders || 0}
            icon={<svg className="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
            iconBg="bg-secondary-50"
          />
          <StatCard
            label="Successful"
            value={stats?.successfulPayments || 0}
            changeType="positive"
            icon={<svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
            iconBg="bg-green-50"
          />
          <StatCard
          label="Pending"
          value={stats?.pendingPayments || 0}
          changeType="neutral"
            icon={<svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            iconBg="bg-yellow-50"
          />
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <Input
                placeholder="Search by name or email..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full sm:w-64"
              />
              <Select value={filters.status} onValueChange={(v) => setFilters({ ...filters, status: v })}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="created">Pending</SelectItem>
                  <SelectItem value="captured">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-40"
              />
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-40"
              />
              <Button onClick={() => fetchOrders(1)}>Apply</Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Order ID</th>
                  <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">User</th>
                  <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Plan</th>
                  <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Amount</th>
                  <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Date</th>
                  <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {loading ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-neutral-500">Loading...</td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-neutral-500">No orders found</td></tr>
                ) : (
                  orders.map((order) => {
                    const badge = statusBadge[order.status] || statusBadge.created;
                    return (
                      <tr key={order._id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4 text-sm font-mono text-neutral-600">{order.razorpayOrderId?.slice(0, 20)}...</td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-neutral-900">{(order.user as any)?.name}</p>
                          <p className="text-xs text-neutral-500">{(order.user as any)?.email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-700 capitalize">{order.plan}</td>
                        <td className="px-6 py-4 text-sm font-medium text-neutral-900">₹{(order.amount / 100).toLocaleString("en-IN")}</td>
                        <td className="px-6 py-4"><Badge variant={badge.variant}>{badge.label}</Badge></td>
                        <td className="px-6 py-4 text-sm text-neutral-500">{formatDate(order.createdAt)}</td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm" onClick={() => { setSelectedOrder(order); setRefundAmount(undefined); setIsRefundOpen(true); }} disabled={order.status !== "captured"}>
                            Refund
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100">
            <p className="text-sm text-neutral-500">Showing {orders.length} of {pagination.total} orders</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={pagination.page === 1} onClick={() => fetchOrders(pagination.page - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={pagination.page >= pagination.totalPages} onClick={() => fetchOrders(pagination.page + 1)}>Next</Button>
            </div>
          </div>
        </Card>

        {/* Refund Modal */}
        <Modal isOpen={isRefundOpen} onClose={() => setIsRefundOpen(false)} title="Process Refund" size="sm">
          {selectedOrder && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Order: <span className="font-mono text-xs">{selectedOrder.razorpayOrderId}</span></p>
              <p className="text-sm text-neutral-600">Amount: <span className="font-medium">₹{(selectedOrder.amount / 100).toLocaleString("en-IN")}</span></p>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Refund Amount (optional)</label>
                <Input
                  type="number"
                  placeholder="Full refund"
                  value={refundAmount || ""}
                  onChange={(e) => setRefundAmount(e.target.value ? parseFloat(e.target.value) : undefined)}
                />
                <p className="text-xs text-neutral-500 mt-1">Leave empty for full refund</p>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsRefundOpen(false)}>Cancel</Button>
                <Button onClick={handleRefund}>Process Refund</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default function AdminPaymentsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminPaymentsContent />
    </ProtectedRoute>
  );
}