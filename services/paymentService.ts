/**
 * /services/paymentService.ts
 * Payment and subscription business logic.
 * Integrates with Razorpay (India) / Stripe (international).
 */

import { ApiUrls } from "@/constants/apiUrls";
import type { Subscription, Plan } from "@/types/subscription";

/**
 * Fetch available premium plans.
 */
export async function getPlans(): Promise<Plan[]> {
  // TODO: implement when premium API is ready
  return [];
}

/**
 * Initiate subscription checkout.
 */
export async function subscribe(
  planId: string,
  paymentMethod: string
): Promise<{ subscriptionId: string; paymentUrl?: string }> {
  const res = await fetch(ApiUrls.PREMIUM_SUBSCRIBE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId, paymentMethod }),
  });

  if (!res.ok) throw new Error("Subscription failed");
  return res.json();
}

/**
 * Cancel an active subscription.
 */
export async function cancelSubscription(
  subscriptionId: string
): Promise<void> {
  const res = await fetch(ApiUrls.PREMIUM_CANCEL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subscriptionId }),
  });

  if (!res.ok) throw new Error("Cancellation failed");
}

/**
 * Get current user's subscription status.
 */
export async function getSubscription(
  userId: string
): Promise<Subscription | null> {
  // TODO: implement when premium API is ready
  return null;
}