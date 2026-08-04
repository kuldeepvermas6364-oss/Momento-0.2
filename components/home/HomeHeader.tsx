"use client";

import { useAuthContext } from "@/context/AuthContext";

export default function HomeHeader() {
  const { user } = useAuthContext();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 800,
          color: "#6366F1",
          margin: 0,
        }}
      >
        Momento
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {user?.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatar}
            alt={user.name}
            width={36}
            height={36}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#6366F1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#374151" }}>
          {user?.name || "User"}
        </span>
      </div>
    </div>
  );
}
