/**
 * /services/authService.ts
 * Authentication business logic.
 * Wraps lib/auth functions with additional service-level concerns.
 */

export {
  signUpWithEmail,
  signInWithEmail,
  resetPassword,
  signOut,
} from "@/lib/auth";

export { default as useAuth } from "@/hooks/useAuth";