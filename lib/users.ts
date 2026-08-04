"use client";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  runTransaction,
  arrayUnion,
  arrayRemove,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Profile, User } from "@/types/user";
import { profileToUser } from "@/types/user";

/**
 * Get a user's profile by ID.
 */
export async function getProfile(userId: string): Promise<Profile | null> {
  const ref = doc(db, "profiles", userId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() } as Profile;
  }
  return null;
}

/**
 * Get a user (UI-facing) by ID.
 */
export async function getUser(userId: string): Promise<User | null> {
  const profile = await getProfile(userId);
  return profile ? profileToUser(profile) : null;
}

/**
 * Update a user's profile.
 */
export async function updateProfile(
  userId: string,
  updates: Partial<Pick<Profile, "name" | "username" | "bio" | "avatar_url" | "website">>
): Promise<void> {
  const ref = doc(db, "profiles", userId);
  await updateDoc(ref, {
    ...updates,
    updated_at: serverTimestamp(),
  });
}

/**
 * Search users by name or username.
 */
export async function searchUsers(searchTerm: string): Promise<Profile[]> {
  const profilesRef = collection(db, "profiles");
  const snapshot = await getDocs(profilesRef);
  const term = searchTerm.toLowerCase();

  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }) as Profile)
    .filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.username.toLowerCase().includes(term)
    );
}

/**
 * Toggle follow / unfollow a user.
 */
export async function toggleFollow(
  followerId: string,
  followingId: string
): Promise<{ following: boolean }> {
  const followId = `${followerId}_${followingId}`;
  const followRef = doc(db, "follows", followId);
  const followerProfileRef = doc(db, "profiles", followerId);
  const followingProfileRef = doc(db, "profiles", followingId);

  const result = await runTransaction(db, async (transaction) => {
    const followSnap = await transaction.get(followRef);

    if (followSnap.exists()) {
      // Unfollow
      transaction.delete(followRef);
      transaction.update(followerProfileRef, {
        following_count: increment(-1),
      });
      transaction.update(followingProfileRef, {
        followers_count: increment(-1),
      });
      return { following: false };
    } else {
      // Follow
      transaction.set(followRef, {
        follower_id: followerId,
        following_id: followingId,
        created_at: serverTimestamp(),
      });
      transaction.update(followerProfileRef, {
        following_count: increment(1),
      });
      transaction.update(followingProfileRef, {
        followers_count: increment(1),
      });
      return { following: true };
    }
  });

  return result;
}

/**
 * Check if user A follows user B.
 */
export async function isFollowing(
  followerId: string,
  followingId: string
): Promise<boolean> {
  const followId = `${followerId}_${followingId}`;
  const ref = doc(db, "follows", followId);
  const snap = await getDoc(ref);
  return snap.exists();
}

/**
 * Get followers of a user.
 */
export async function getFollowers(userId: string): Promise<Profile[]> {
  const q = query(
    collection(db, "follows"),
    where("following_id", "==", userId)
  );
  const snapshot = await getDocs(q);
  const profiles: Profile[] = [];

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const profile = await getProfile(data.follower_id);
    if (profile) profiles.push(profile);
  }

  return profiles;
}

/**
 * Get users that a user is following.
 */
export async function getFollowing(userId: string): Promise<Profile[]> {
  const q = query(
    collection(db, "follows"),
    where("follower_id", "==", userId)
  );
  const snapshot = await getDocs(q);
  const profiles: Profile[] = [];

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const profile = await getProfile(data.following_id);
    if (profile) profiles.push(profile);
  }

  return profiles;
}
