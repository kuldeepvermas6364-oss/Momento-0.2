import "./globals.css";

import { appMetadata } from "@/lib/metadata";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = appMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
