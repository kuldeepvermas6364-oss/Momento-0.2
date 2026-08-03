import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Momento",
  description: "Modern AI Powered Social Platform"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
