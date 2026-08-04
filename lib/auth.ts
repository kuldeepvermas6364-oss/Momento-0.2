"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, rtdb } from "@/lib/firebase/client";
import type { Profile } from "@/types/user";

/**
 * Sign up a new user with email + password.
 * Creates the auth user and a profile entry in Realtime Database.
 */
export async function signUpWithEmail(
  name: string,
  email: string,
  password: string
): Promise<{ error: string | null }> {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(cred.user, { displayName: name });

    const username = generateUsername(name);
    const now = new Date().toISOString();
    const newProfile = {
      username,
      name,
      avatar_url: cred.user.photoURL || null,
      bio: null,
      verified: false,
      website: null,
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      created_at: now,
      updated_at: now,
    };

    await set(ref(rtdb, `profiles/${cred.user.uid}`), newProfile);

    return { error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Signup failed";
    return { error: getAuthErrorMessage(message) };
  }
}

/**
 * Sign in with email + password.
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ error: string | null }> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Login failed";
    return { error: getAuthErrorMessage(message) };
  }
}

/**
 * Send a password reset email.
 */
export async function resetPassword(
  email: string
): Promise<{ error: string | null }> {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Reset failed";
    return { error: getAuthErrorMessage(message) };
  }
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

function generateUsername(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
  const random = Math.floor(Math.random() * 10000);
  return `${base}${random}`;
}

function getAuthErrorMessage(message: string): string {
  if (message.includes("auth/invalid-credential") || message.includes("auth/wrong-password")) {
    return "Invalid email or password. Please try again.";
  }
  if (message.includes("auth/user-not-found")) {
    return "No account found with this email.";
  }
  if (message.includes("auth/email-already-in-use")) {
    return "An account with this email already exists.";
  }
  if (message.includes("auth/weak-password")) {
    return "Password should be at least 6 characters.";
  }
  if (message.includes("auth/invalid-email")) {
    return "Please enter a valid email address.";
  }
  if (message.includes("auth/too-many-requests")) {
    return "Too many attempts. Please try again later.";
  }
  if (message.includes("auth/network-request-failed")) {
    return "Network error. Check your connection and try again.";
  }
  return message.replace("Firebase: ", "").replace("\n", " ");
}
