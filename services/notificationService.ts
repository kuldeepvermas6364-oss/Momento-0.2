/**
 * /services/notificationService.ts
 * Notification business logic — fetch, mark read, push tokens.
 */

export { default as useNotification } from "@/hooks/useNotification";

/**
 * Mark a notification as read in RTDB.
 */
export async function markNotificationRead(
  userId: string,
  notificationId: string
): Promise<void> {
  const { ref, update } = await import("firebase/database");
  const { rtdb } = await import("@/lib/firebase/client");
  await update(ref(rtdb, `notifications/${userId}/${notificationId}`), {
    read: true,
  });
}

/**
 * Mark all notifications as read.
 */
export async function markAllNotificationsRead(
  userId: string
): Promise<void> {
  const { ref, get, update } = await import("firebase/database");
  const { rtdb } = await import("@/lib/firebase/client");
  const snap = await get(ref(rtdb, `notifications/${userId}`));

  const updates: Record<string, boolean> = {};
  snap.forEach((child) => {
    if (!child.val()?.read) {
      updates[`notifications/${userId}/${child.key}/read`] = true;
    }
  });

  if (Object.keys(updates).length > 0) {
    await update(ref(rtdb), updates);
  }
}