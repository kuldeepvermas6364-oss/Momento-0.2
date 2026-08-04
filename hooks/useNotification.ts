"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase/client";
import { useAuthContext } from "@/context/AuthContext";
import type { Notification } from "@/types/notification";

/**
 * useNotification - listens to user notifications in real-time.
 */
export default function useNotification() {
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const notifRef = ref(rtdb, `notifications/${user.id}`);

    const unsubscribe = onValue(notifRef, (snapshot) => {
      const list: Notification[] = [];
      snapshot.forEach((child) => {
        list.push({ id: child.key!, ...child.val() });
      });

      list.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setNotifications(list);
      setUnreadCount(list.filter((n) => !n.read).length);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { notifications, unreadCount, loading };
}