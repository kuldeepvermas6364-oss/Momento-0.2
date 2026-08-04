/**
 * /features/index.ts
 * Central export point for all feature modules.
 *
 * Each feature is a self-contained module:
 *   /features/<feature>/components  → feature-specific UI
 *   /features/<feature>/hooks       → feature-specific hooks
 *   /features/<feature>/types       → feature-specific types
 *   /features/<feature>/services    → feature-specific API/business logic
 *   /features/<feature>/utils       → feature-specific helpers
 *
 * Features will be exported here as they are implemented.
 */

// Auth
export { default as AuthProvider } from "@/features/auth/components/AuthProvider";
