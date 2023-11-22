import Footer from "@/components/Footer/footer";
import Navbar from "@/components/Navbar/navbar";
import type { FC, ReactNode } from "react";

export interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default BaseLayout;
