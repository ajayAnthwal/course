"use client";

import { Button } from "@/components/ui";
import { useCreateOrder, useVerifyPayment } from "../hooks/usePayment";

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => { open: () => void };
  }
}

interface PaymentButtonProps {
  plan: "basic" | "premium" | "enterprise";
  label: string;
  collegeId?: string;
  userName?: string;
  userEmail?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function PaymentButton({
  plan,
  label,
  collegeId,
  userName,
  userEmail,
  onSuccess,
  onError,
}: PaymentButtonProps) {
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();

  const handlePayment = async () => {
    try {
      const orderResponse = await createOrder.mutateAsync({ plan, collegeId });
      const orderData = orderResponse.data;

      if (!orderData) {
        onError?.("Failed to create order");
        return;
      }

      // In production, Razorpay script should be loaded in _document.tsx or via next/script:
      // <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      if (typeof window.Razorpay === "undefined") {
        onError?.("Razorpay SDK not loaded");
        return;
      }

      const options: RazorpayCheckoutOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "EduPortal",
        description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
        order_id: orderData.razorpayOrderId,
        handler: async (response: RazorpayResponse) => {
          try {
            await verifyPayment.mutateAsync({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            onSuccess?.();
          } catch {
            onError?.("Payment verification failed");
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch {
      onError?.("Failed to initiate payment");
    }
  };

  return (
    <Button
      onClick={handlePayment}
      isLoading={createOrder.isPending || verifyPayment.isPending}
      className="w-full"
    >
      {label}
    </Button>
  );
}
