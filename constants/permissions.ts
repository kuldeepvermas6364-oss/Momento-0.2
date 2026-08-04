/**
 * /constants/permissions.ts
 * Role-based access control permissions.
 */

export type UserRole = "user" | "moderator" | "admin" | "premium";

export const Permissions = {
  // Content permissions
  CREATE_POST: ["user", "moderator", "admin", "premium"],
  DELETE_OWN_POST: ["user", "moderator", "admin", "premium"],
  DELETE_ANY_POST: ["moderator", "admin"],
  CREATE_STORY: ["user", "moderator", "admin", "premium"],
  CREATE_REEL: ["user", "moderator", "admin", "premium"],
  CREATE_COMMENT: ["user", "moderator", "admin", "premium"],
  DELETE_ANY_COMMENT: ["moderator", "admin"],

  // Chat permissions
  SEND_MESSAGE: ["user", "moderator", "admin", "premium"],
  DELETE_OWN_MESSAGE: ["user", "moderator", "admin", "premium"],
  DELETE_ANY_MESSAGE: ["moderator", "admin"],

  // Premium features
  ACCESS_AI: ["premium", "admin"],
  ACCESS_PREMIUM_REELS: ["premium", "admin"],
  VERIFIED_BADGE: ["admin"],

  // Admin features
  MANAGE_ADS: ["admin"],
  MANAGE_USERS: ["admin"],
  VIEW_ANALYTICS: ["admin", "moderator"],
  BAN_USER: ["admin", "moderator"],
} as const;

export function hasPermission(role: UserRole, permission: keyof typeof Permissions): boolean {
  return Permissions[permission].includes(role);
}