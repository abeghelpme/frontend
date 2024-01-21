import authBgJar from "@/public/assets/images/auth/auth-bg-jar.svg";
import Image from "next/image";
import type { FC, ReactNode } from "react";
import LogoBanner from "./logoBanner";

interface AuthLayoutProps {
  children: ReactNode;
  formType?: "signup" | "other";
  greeting?: string;
  heading?: string;
  contentClass?: string;
  withHeader: boolean;
  hasSuccess: boolean;
}

const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  formType,
  greeting,
  heading,
  withHeader,
  contentClass,
  hasSuccess,
}) => {
  return (
    <div className="relative flex h-full flex-1 flex-col items-center gap-8 scroll-smooth py-12 md:gap-9">
      {formType === "signup" && (
        <Image
          src={authBgJar as string}
          alt=""
          priority
          className="absolute inset-0 -z-[1] h-full w-full object-cover object-[75%]"
        />
      )}
      <LogoBanner />

      {!hasSuccess ? (
        <div
          className={`mx-auto my-auto w-[90%] space-y-6 scroll-smooth rounded-lg bg-white px-4 py-10 shadow-auth-layout-shadow md:mx-0 md:p-10 lg:p-10 ${
            contentClass === null ? "max-w-[467px]" : contentClass
          }`}
        >
          {withHeader && (
            <div className="space-y-2 text-center font-medium">
              <h1 className="text-xl font-semibold text-abeg-neutral-10 md:text-2xl">
                {heading}
              </h1>
              <p className="text-lg md:text-xl">{greeting}</p>
            </div>
          )}
          {children}
        </div>
      ) : (
        <div className="my-auto w-full">{children}</div>
      )}
    </div>
  );
};

export default AuthLayout;
