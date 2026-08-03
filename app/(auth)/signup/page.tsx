import AuthLayout from "@/components/layout/AuthLayout";
import AppName from "@/components/common/AppName";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      <AppName />

      <div style={{ height: 24 }} />

      <AuthCard>
        <AuthHeader
          title="Create Account"
          subtitle="Join Momento today"
        />

        <div style={{ height: 24 }} />

        <SignupForm />
      </AuthCard>
    </AuthLayout>
  );
}
