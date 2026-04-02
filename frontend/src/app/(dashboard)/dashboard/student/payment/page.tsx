"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Modal } from "@/components/ui";
import { PaymentButton } from "@/features/payments";
import { formatDate } from "@/lib/utils";

interface Order {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  plan: string;
  razorpayPaymentId?: string;
  createdAt: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 999,
    features: ["Apply to 5 colleges", "Basic profile", "Email support", "1 month validity"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 2499,
    features: ["Apply to 20 colleges", "Priority support", "Document verification", "College notifications", "6 months validity"],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 4999,
    features: ["Unlimited applications", "Dedicated counselor", "24/7 support", "Mock interviews", "1 year validity"],
  },
];

function PaymentDashboardContent() {
  const { user } = useAuth();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("free");

  const orders: Order[] = [
    { id: "1", orderId: "ORD-001", amount: 999, currency: "INR", status: "completed", plan: "Basic", razorpayPaymentId: "pay_123", createdAt: "2024-03-01" },
    { id: "2", orderId: "ORD-002", amount: 2499, currency: "INR", status: "completed", plan: "Premium", razorpayPaymentId: "pay_456", createdAt: "2024-03-15" },
    { id: "3", orderId: "ORD-003", amount: 2499, currency: "INR", status: "pending", plan: "Premium", createdAt: "2024-03-20" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "success" | "warning" | "danger" | "default" }> = {
      pending: { label: "Pending", variant: "warning" },
      completed: { label: "Completed", variant: "success" },
      failed: { label: "Failed", variant: "danger" },
      refunded: { label: "Refunded", variant: "default" },
    };
    return variants[status] || variants.pending;
  };

  const stats = [
    { label: "Total Spent", value: "₹3,498", icon: "💰", color: "bg-green-50" },
    { label: "Active Plan", value: currentPlan === "free" ? "Free" : "Premium", icon: "⭐", color: "bg-yellow-50" },
    { label: "Applications Left", value: currentPlan === "free" ? "2/5" : "15/20", icon: "📝", color: "bg-blue-50" },
    { label: "Valid Until", value: "June 2024", icon: "📅", color: "bg-purple-50" },
  ];

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
                  <h2 className="text-2xl font-bold text-primary-900">Premium Plan</h2>
                  <p className="text-primary-600 mt-1">Valid until June 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary-700">₹2,499</p>
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
            <Button variant="outline" size="sm">Download Invoice</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => {
                const badge = getStatusBadge(order.status);
                return (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        order.status === "completed" ? "bg-green-100" : order.status === "pending" ? "bg-yellow-100" : "bg-red-100"
                      }`}>
                        <span className="text-lg">{order.status === "completed" ? "✓" : order.status === "pending" ? "⏳" : "✕"}</span>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{order.plan} Plan</p>
                        <p className="text-sm text-neutral-500">Order: {order.orderId}</p>
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
          </CardContent>
        </Card>

        {/* Upgrade Modal */}
        <Modal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} title="Upgrade Your Plan" size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 rounded-xl border-2 ${
                  plan.recommended ? "border-primary-500 bg-primary-50" : "border-neutral-200"
                }`}
              >
                {plan.recommended && (
                  <Badge variant="primary" className="mb-2">Recommended</Badge>
                )}
                <h3 className="text-xl font-bold text-neutral-900">{plan.name}</h3>
                <p className="text-2xl font-bold text-primary-600 mt-2">₹{plan.price}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-neutral-600 flex items-center gap-2">
                      <span>✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <PaymentButton
                  plan={plan.id as "basic" | "premium" | "enterprise"}
                  label={`Buy ${plan.name}`}
                  userName={user?.name}
                  userEmail={user?.email}
                  onSuccess={() => {
                    setCurrentPlan(plan.id);
                    setShowUpgrade(false);
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