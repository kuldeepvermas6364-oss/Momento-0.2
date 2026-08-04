"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { useAuthContext } from "@/context/AuthContext";

export default function SettingsPage() {
  const router = useRouter();
  const { user, signOut } = useAuthContext();
  const [activeTab, setActiveTab] = useState("account");

  async function handleLogout() {
    await signOut();
    router.push("/login");
    router.refresh();
  }

  const tabs = [
    { id: "account", label: "Account" },
    { id: "security", label: "Security" },
    { id: "privacy", label: "Privacy" },
    { id: "notifications", label: "Notifications" },
    { id: "appearance", label: "Appearance" },
  ];

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          Settings
        </h1>

        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            marginBottom: "24px",
            paddingBottom: "4px",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                background:
                  activeTab === tab.id ? "#6366F1" : "#F3F4F6",
                color: activeTab === tab.id ? "#FFFFFF" : "#374151",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "account" && (
          <div>
            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  marginBottom: "4px",
                }}
              >
                Username
              </p>
              <p style={{ fontSize: "16px", fontWeight: 600 }}>
                {user?.username || "N/A"}
              </p>
            </div>

            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  marginBottom: "4px",
                }}
              >
                Name
              </p>
              <p style={{ fontSize: "16px", fontWeight: 600 }}>
                {user?.name || "N/A"}
              </p>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div>
            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                Change Password
              </p>
              <p style={{ fontSize: "14px", color: "#6B7280" }}>
                A password reset link will be sent to your email.
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "#EF4444",
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </div>
    </MainLayout>
  );
}
