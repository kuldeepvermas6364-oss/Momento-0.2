/**
 * Profile - maps to the profiles table in Supabase.
 * This is the canonical user profile stored in the database.
 */
export interface Profile {
  id: string;
  username: string;
  name: string;
  avatar_url: string | null;
  bio: string | null;
  verified: boolean;
  website: string | null;
  followers_count: number;
  following_count: number;
  posts_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * User - lightweight representation used by UI components.
 * Kept for backwards compatibility with existing components.
 */
export type User = {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  verified: boolean;
};

/**
 * Convert a Profile (database row) to a User (UI-facing).
 */
export function profileToUser(profile: Profile): User {
  return {
    id: profile.id,
    username: profile.username,
    name: profile.name,
    avatar: profile.avatar_url || "",
    bio: profile.bio || undefined,
    verified: profile.verified,
  };
}
