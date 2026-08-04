"use client";

import { useAuthContext } from "@/context/AuthContext";

/**
 * useAuth - thin wrapper around AuthContext.
 * Components should use this hook to access the current user/session.
 */
export default function useAuth() {
  const { user, profile, firebaseUser, loading, signOut, refreshProfile } =
    useAuthContext();

  return {
    user,
    profile,
    firebaseUser,
    loading,
    authenticated: user !== null,
    signOut,
    refreshProfile,
  };
}
