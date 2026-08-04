"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, rtdb } from "@/lib/firebase/client";
import type { Profile } from "@/types/user";
import { profileToUser, type User } from "@/types/user";

type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  firebaseUser: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (uid: string) => {
    const snap = await get(ref(rtdb, `profiles/${uid}`));
    if (snap.exists()) {
      return { id: uid, ...snap.val() } as Profile;
    }
    return null;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!firebaseUser?.uid) return;
    const p = await fetchProfile(firebaseUser.uid);
    setProfile(p);
  }, [firebaseUser, fetchProfile]);

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (!mounted) return;
      setFirebaseUser(fbUser);

      if (fbUser) {
        let p = await fetchProfile(fbUser.uid);

        if (!p) {
          const displayName =
            fbUser.displayName ||
            (fbUser.email ? fbUser.email.split("@")[0] : "user");
          const username = generateUsername(displayName);
          const now = new Date().toISOString();
          const newProfile = {
            username,
            name: displayName,
            avatar_url: fbUser.photoURL || null,
            bio: null,
            verified: false,
            website: null,
            followers_count: 0,
            following_count: 0,
            posts_count: 0,
            created_at: now,
            updated_at: now,
          };
          await set(ref(rtdb, `profiles/${fbUser.uid}`), newProfile);
          p = { id: fbUser.uid, ...newProfile } as Profile;
        }

        if (mounted) setProfile(p);
      } else {
        if (mounted) setProfile(null);
      }
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [fetchProfile]);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
    setFirebaseUser(null);
    setProfile(null);
  }, []);

  const user = profile ? profileToUser(profile) : null;

  return (
    <AuthContext.Provider
      value={{ user, profile, firebaseUser, loading, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

function generateUsername(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
  const random = Math.floor(Math.random() * 10000);
  return `${base}${random}`;
}
