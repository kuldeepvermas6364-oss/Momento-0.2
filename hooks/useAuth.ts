"use client";

import { useEffect, useState } from "react";

type AuthUser = {
  id: string;
  username: string;
  name: string;
  avatar: string;
} | null;

export default function useAuth() {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: check Supabase / localStorage session
    setUser(null);
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    authenticated: user !== null
  };
}
