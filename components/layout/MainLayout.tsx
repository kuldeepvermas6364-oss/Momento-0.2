import Header from "./Header";
import Footer from "./Footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <>
      <Header title="Momento" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
