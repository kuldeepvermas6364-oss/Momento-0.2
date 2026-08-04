"use client";

import { createClient } from "@/lib/supabase/client";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Sign up a new user with email + password.
 * Creates the auth user and inserts a profile row.
 */
export async function signUpWithEmail(
  name: string,
  email: string,
  password: string
): Promise<{ error: string | null }> {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // If email confirmation is disabled, create profile immediately
  if (data.user && data.session) {
    const username = generateUsername(name);
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      username,
      name,
      avatar_url: null,
      bio: null,
      verified: false,
      website: null,
    });

    if (profileError) {
      console.error("Profile creation error:", profileError.message);
      return { error: "Account created but profile setup failed. Please try logging in." };
    }
  }

  return { error: null };
}

/**
 * Sign in with email + password.
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ error: string | null }> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

/**
 * Send a password reset email.
 */
export async function resetPassword(
  email: string
): Promise<{ error: string | null }> {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}

/**
 * Generate a unique username from display name.
 */
function generateUsername(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
  const random = Math.floor(Math.random() * 10000);
  return `${base}${random}`;
}
