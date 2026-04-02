import { IOrder, PlanType, PaymentStatus } from "../model/order.model";
declare class PaymentService {
    getPlanDetails(): {
        plan: string;
        amount: number;
        currency: string;
        amountDisplay: string;
        durationDays: number;
    }[];
    createOrder(userId: string, plan: PlanType, collegeId?: string): Promise<IOrder>;
    verifyPayment(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string): Promise<IOrder>;
    getOrderById(id: string): Promise<IOrder>;
    getUserOrders(userId: string): Promise<IOrder[]>;
    updateOrderStatus(id: string, status: PaymentStatus): Promise<IOrder>;
}
declare const _default: PaymentService;
export default _default;
//# sourceMappingURL=payment.service.d.ts.map