import type { FC, ReactNode } from "react";
import LogoBanner from "./logoBanner";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="relative h-screen flex flex-col items-center w-screen bg-[url('/auth-background.svg')] pt-6">
        <LogoBanner textColor="formTemp" />

        <div className=" w-[90%] sm:w-[50%] md:max-w-[397px] mx-auto flex-1 flex items-center justify-center">
          <main className="shadow-auth-layout-shadow w-full  py-3 px-3 lg:px-12 flex items-center justify-center  rounded-[0.375rem] opacity-[0.8] border-2 border-[#0068FF1A] bg-white">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
