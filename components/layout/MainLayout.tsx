import type { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import BottomNavigation from "../navigation/BottomNavigation";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({
  children
}: MainLayoutProps) {
  return (
    <>
      <Header title="Momento" />

      <main
        style={{
          minHeight: "calc(100vh - 128px)",
          paddingBottom: "140px"
        }}
      >
        {children}
      </main>

      <BottomNavigation />

      <Footer />
    </>
  );
}
