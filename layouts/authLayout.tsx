import authBgContours from "@/public/assets/images/auth/auth-bg-contours.png";
import authBgJar from "@/public/assets/images/auth/auth-bg-jar.svg";
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
}) => {
  return (
    <div className="py-12 flex flex-col items-center justify-center lg:justify-star min-h-full relative gap-y-6 md:gap-y-[2rem] lg:gap-y-[2.7rem]">
      <Image
        src={formType === "signup" ? (authBgJar as string) : authBgContours}
        alt=""
        priority
        className="absolute inset-0 -z-[1] object-cover object-[75%] h-full w-full"
      />
      <LogoBanner textColor={bannerTextColor!} />

      <div
        className={`w-[90%] mx-auto rounded-lg md:rounded-none bg-white py-10 px-4 md:p-10 lg:p-10 md:mx-0 shadow-auth-layout-shadow ${contentClass}`}
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
    </div>
  );
};

export default AuthLayout;
