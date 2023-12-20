
import authBgJar from "@/public/assets/images/auth/auth-bg-jar.svg";
import authBgContours from "@/public/assets/images/shared/bg-contours.png";
import Image from "next/image";
import type { FC, ReactNode } from "react";
import LogoBanner from "./logoBanner";

interface AuthLayoutProps {
  children: ReactNode;
  formType: "signup" | "other";
  greeting?: string;
  heading?: string;
  contentClass?: string;
  withHeader: boolean;
  hasSuccess: boolean;
  bannerTextColor?: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  formType,
  greeting,
  heading,
  withHeader,
  contentClass,
  bannerTextColor,
  hasSuccess,
}) => {
  return (
    <div className="py-12 flex flex-col items-center min-h-full relative gap-8 md:gap-0">
      <Image
        src={formType === "signup" ? (authBgJar as string) : authBgContours}
        alt=""
        priority
        className="absolute inset-0 -z-[1] object-cover object-[75%] h-full w-full"
      />
      <LogoBanner textColor={bannerTextColor!} />

      {!hasSuccess ? (
        <div
          className={`w-[90%] mx-auto rounded-lg my-auto md:rounded-m bg-white py-10 px-4 md:p-10 lg:p-10 md:mx-0 shadow-auth-layout-shadow ${contentClass}`}
        >
          {withHeader && (
            <div className="space-y-2 text-center font-medium">
              <p className="text-lg md:text-xl">{greeting}</p>
              <h1 className="font-semibold text-abeg-neutral-10 text-xl md:text-2xl">
                {heading}
              </h1>
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
