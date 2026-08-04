import AuthLayout from "@/components/layout/AuthLayout";
import AppName from "@/components/common/AppName";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      <div style={{ textAlign: "center" }}>
        <AppName />
      </div>

      <div style={{ height: 32 }} />

      <AuthCard>
        <div className="animate-fade-in-up-delay-1">
          <AuthHeader
            title="Create Account"
            subtitle="Join Momento today"
          />
        </div>

        <div style={{ height: 28 }} />

        <SignupForm />
      </AuthCard>
    </AuthLayout>
  );
}
