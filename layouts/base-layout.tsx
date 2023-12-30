import Footer from "@/components/Footer/footer";
import Navbar from "@/components/Navbar/navbar";
import type { FC, ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={`h-full`}>{children}</main>
      <Footer />
    </>
  );
};

export default BaseLayout;
