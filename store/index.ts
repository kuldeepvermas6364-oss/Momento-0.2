/**
 * /store/index.ts
 * Central export point for all Zustand global state stores.
 * Feature-specific stores live in /features/<feature>/store and
 * are re-exported here when shared across features.
 *
 * NOTE: Zustand handles global client state. Do NOT duplicate
 * the same concern in React Context.
 */

// Import Zustand create when stores are implemented:
// import { create } from "zustand";

// Example store pattern:
// export const useAuthStore = create<AuthStore>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
// }));

export {};