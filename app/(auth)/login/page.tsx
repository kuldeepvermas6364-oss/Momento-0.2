import AuthLayout from "@/components/layout/AuthLayout";
import AppName from "@/components/common/AppName";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AppName />

      <div style={{ height: 24 }} />

      <AuthCard>
        <AuthHeader
          title="Welcome Back"
          subtitle="Login to continue"
        />

        <div style={{ height: 24 }} />

        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}
