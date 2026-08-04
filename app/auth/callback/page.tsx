"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const supabase = createClient();

    const next = searchParams.get("next") || "/";

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        if (next.includes("reset-password")) {
          router.push("/settings?tab=security");
        } else {
          router.push(next);
        }
        router.refresh();
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push(next);
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, searchParams]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F8FAFC",
      }}
    >
      <p style={{ color: "#6B7280", fontSize: "16px" }}>Loading...</p>
    </div>
  );
}
