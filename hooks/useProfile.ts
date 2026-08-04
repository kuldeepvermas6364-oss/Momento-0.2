"use client";

import { useState, useEffect } from "react";
import type { Profile } from "@/types/user";
import { getProfile } from "@/lib/rtdb";

/**
 * useProfile - fetches a user profile by ID.
 */
export default function useProfile(userId: string | null) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getProfile(userId)
      .then((p) => setProfile(p))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load profile"))
      .finally(() => setLoading(false));
  }, [userId]);

  return { profile, loading, error };
}