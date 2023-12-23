import type { FC, ReactNode } from "react";
import Footer from "@/components/Footer/footer";
import Navbar from "@/components/Navbar/navbar";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });
interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={`${manrope.className}`}>{children}</main>
      <Footer />
    </>
  );
};

export default BaseLayout;
