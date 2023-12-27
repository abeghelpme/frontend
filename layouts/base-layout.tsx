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
      {children}
      <Footer />
    </>
  );
};

export default BaseLayout;
