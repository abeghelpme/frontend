import Footer from "@/components/Footer/footer";
import Navbar from "@/components/Navbar/navbar";
// import bgContours from "@/public/assets/images/shared/bg-contours.png";
// import Image from "next/image";
import type { FC, ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />

      <main className={`relative h-full bg-contours bg-cover bg-no-repeat`}>
        {/* <Image
        src={bgContours}
        alt=""
        role="presentation"
        priority
        className="absolute inset-0 -z-[1] h-full w-full object-cover object-[75%]"
        /> */}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default BaseLayout;
