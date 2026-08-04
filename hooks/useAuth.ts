"use client";

import { useAuthContext } from "@/context/AuthContext";

/**
 * useAuth - thin wrapper around AuthContext.
 * Components should use this hook to access the current user/session.
 */
export default function useAuth() {
  const { user, profile, session, loading, signOut, refreshProfile } =
    useAuthContext();

  return {
    user,
    profile,
    session,
    loading,
    authenticated: user !== null,
    signOut,
    refreshProfile,
  };
}
