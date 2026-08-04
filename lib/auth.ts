"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";
import type { Profile } from "@/types/user";

/**
 * Sign up a new user with email + password.
 * Creates the auth user and a Firestore profile document.
 */
export async function signUpWithEmail(
  name: string,
  email: string,
  password: string
): Promise<{ error: string | null }> {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // Set display name on the auth user
    await updateProfile(cred.user, { displayName: name });

    // Create profile document in Firestore
    const username = generateUsername(name);
    const newProfile: Omit<Profile, "id"> = {
      username,
      name,
      avatar_url: cred.user.photoURL || null,
      bio: null,
      verified: false,
      website: null,
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await setDoc(doc(db, "profiles", cred.user.uid), newProfile);

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

/**
 * Map Firebase error codes to user-friendly messages.
 */
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
