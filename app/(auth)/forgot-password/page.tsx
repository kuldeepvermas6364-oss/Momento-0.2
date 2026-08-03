import AuthLayout from "@/components/layout/AuthLayout";
import AppName from "@/components/common/AppName";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AppName />

      <div style={{ height: 24 }} />

      <AuthCard>
        <AuthHeader
          title="Forgot Password"
          subtitle="Reset your account password"
        />

        <div style={{ height: 24 }} />

        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}
