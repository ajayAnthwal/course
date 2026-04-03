"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Modal, Spinner } from "@/components/ui";
import { PaymentButton } from "@/features/payments";
import { paymentService } from "@/features/payments/services/payment.service";
import { formatDate } from "@/lib/utils";

interface Plan {
  plan: string;
  amount: number;
  currency: string;
  amountDisplay: string;
  durationDays: number;
}

interface Order {
  _id: string;
  plan: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: string;
  refundAmount?: number;
  refundDate?: string;
  createdAt: string;
}

function PaymentDashboardContent() {
  const { user } = useAuth();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<string>("free");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plansRes, ordersRes] = await Promise.all([
        paymentService.getPlans(),
        paymentService.getMyOrders(),
      ]);
      setPlans(plansRes.data?.data || []);
      setOrders(ordersRes.data?.data || []);
      
      const completedOrder = ordersRes.data?.data?.find((o: Order) => o.status === "captured");
      if (completedOrder) {
        setCurrentPlan(completedOrder.plan);
      }
    } catch (error) {
      console.error("Failed to fetch payment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "success" | "warning" | "danger" | "default" }> = {
      pending: { label: "Pending", variant: "warning" },
      captured: { label: "Completed", variant: "success" },
      failed: { label: "Failed", variant: "danger" },
      refunded: { label: "Refunded", variant: "default" },
    };
    return variants[status] || variants.pending;
  };

  const totalSpent = orders
    .filter(o => o.status === "captured")
    .reduce((sum, o) => sum + o.amount, 0);

  const getPlanFeatures = (planId: string): string[] => {
    const featuresMap: Record<string, string[]> = {
      basic: ["Apply to 5 colleges", "Basic profile", "Email support", "1 month validity"],
      premium: ["Apply to 20 colleges", "Priority support", "Document verification", "College notifications", "6 months validity"],
      enterprise: ["Unlimited applications", "Dedicated counselor", "24/7 support", "Mock interviews", "1 year validity"],
    };
    return featuresMap[planId] || [];
  };

  const getValidUntil = () => {
    const completedOrder = orders.find(o => o.status === "captured");
    if (!completedOrder) return null;
    const plan = plans.find(p => p.plan === completedOrder.plan);
    if (!plan) return null;
    const validDate = new Date(completedOrder.createdAt);
    validDate.setDate(validDate.getDate() + plan.durationDays);
    return validDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const stats = [
    { label: "Total Spent", value: `₹${totalSpent.toLocaleString()}`, icon: "💰", color: "bg-green-50" },
    { label: "Active Plan", value: currentPlan === "free" ? "Free" : currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1), icon: "⭐", color: "bg-yellow-50" },
    { label: "Applications Left", value: currentPlan === "free" ? "2/5" : "Unlimited", icon: "📝", color: "bg-blue-50" },
    { label: "Valid Until", value: getValidUntil() || "N/A", icon: "📅", color: "bg-purple-50" },
  ];

  if (loading) {
    return (
      <DashboardLayout role="student" userName={user?.name}>
        <div className="flex items-center justify-center h-64">
          <Spinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Payments & Plans</h1>
            <p className="text-neutral-500">Manage your subscriptions and payment history</p>
          </div>
          <Button onClick={() => setShowUpgrade(true)}>Upgrade Plan</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} hover>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">{stat.label}</p>
                    <p className="text-xl font-bold text-neutral-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current Plan */}
        {currentPlan !== "free" && (
          <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600 font-medium">Current Plan</p>
                  <h2 className="text-2xl font-bold text-primary-900">{currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan</h2>
                  <p className="text-primary-600 mt-1">Valid until {getValidUntil()}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary-700">₹{plans.find(p => p.plan === currentPlan)?.amount || 0}</p>
                  <p className="text-sm text-primary-500">/year</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">💳</div>
                <p className="text-neutral-500 mb-4">No payment history</p>
                <Button onClick={() => setShowUpgrade(true)}>Upgrade Plan</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const badge = getStatusBadge(order.status);
                  return (
                    <div key={order._id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          order.status === "captured" ? "bg-green-100" : order.status === "pending" ? "bg-yellow-100" : "bg-red-100"
                        }`}>
                          <span className="text-lg">{order.status === "captured" ? "✓" : order.status === "pending" ? "⏳" : "✕"}</span>
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">{order.plan.charAt(0).toUpperCase() + order.plan.slice(1)} Plan</p>
                          <p className="text-sm text-neutral-500">Order: {order.razorpayOrderId}</p>
                          <p className="text-xs text-neutral-400">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-neutral-900">₹{order.amount}</p>
                          <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
                        </div>
                        {order.razorpayPaymentId && (
                          <Button variant="ghost" size="sm">Invoice</Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upgrade Modal */}
        <Modal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} title="Upgrade Your Plan" size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.plan}
                className={`p-4 rounded-xl border-2 ${
                  plan.plan === "premium" ? "border-primary-500 bg-primary-50" : "border-neutral-200"
                }`}
              >
                {plan.plan === "premium" && (
                  <Badge variant="primary" className="mb-2">Recommended</Badge>
                )}
                <h3 className="text-xl font-bold text-neutral-900">{plan.plan.charAt(0).toUpperCase() + plan.plan.slice(1)}</h3>
                <p className="text-2xl font-bold text-primary-600 mt-2">₹{plan.amount}</p>
                <ul className="mt-4 space-y-2">
                  {getPlanFeatures(plan.plan).map((feature, idx) => (
                    <li key={idx} className="text-sm text-neutral-600 flex items-center gap-2">
                      <span>✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <PaymentButton
                  plan={plan.plan as "basic" | "premium" | "enterprise"}
                  label={`Buy ${plan.plan.charAt(0).toUpperCase() + plan.plan.slice(1)}`}
                  userName={user?.name}
                  userEmail={user?.email}
                  onSuccess={() => {
                    setCurrentPlan(plan.plan);
                    setShowUpgrade(false);
                    fetchData();
                  }}
                  onError={(error) => console.error(error)}
                />
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default function PaymentPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <PaymentDashboardContent />
    </ProtectedRoute>
  );
}