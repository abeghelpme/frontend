import authBgContours from "@/public/assets/images/auth/auth-bg-contours.png";
import authBgJar from "@/public/assets/images/auth/auth-bg-jar.svg";
import Image from "next/image";
import type { FC, ReactNode } from "react";
import LogoBanner from "./logoBanner";

interface AuthLayoutProps {
  children: ReactNode;
  formType: "signup" | "other";
  greeting: string;
  heading: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  formType,
  greeting,
  heading,
}) => {
  return (
    <div className="py-12 flex flex-col items-center justify-center lg:justify-star min-h-full relative gap-y-6 md:gap-y-[2rem] lg:gap-y-[2.7rem]">
      <Image
        src={formType === "signup" ? (authBgJar as string) : authBgContours}
        alt=""
        priority
        className="absolute inset-0 -z-[1] object-cover object-[75%] h-full w-full"
      />
      {/* <div className="w-[90%] mx-auto md:w-[85%] lg:w-[65%] xl:w-[52%] 2xl:w-[45%] space-y-6 h-full lg:space-y-[3.5rem]"> */}
      <LogoBanner textColor="#2B908E" />

      {/* <div className="h-full w-full"> */}
      <div className="w-[90%] md:w-[85%] lg:w-[65%] xl:w-[52%] 2xl:w-[45%] 3xl:w-[29%] rounded-lg md:rounded-none bg-white py-10 px-4 md:p-10 lg:p-10 md:mx-0">
        <div className="space-y-2 text-center font-medium">
          <p className="text-lg md:text-xl">{greeting}</p>
          <h1 className="font-semibold text-abeg-neutral-10 text-xl md:text-2xl">
            {heading}
          </h1>
        </div>
        {children}
      </div>
      {/* </div> */}
      {/* </div> */}
      {/* <div className="w-[90%] mx-auto md:w-[85%] lg:w-[65%] xl:w-[52%] 2xl:w-[45%] space-y-6 h-full lg:space-y-[3.5rem]">
        <LogoBanner textColor="abeg-teal-10" />

        <div className="h-full w-full">
          <div className="rounded-lg md:rounded-none mx-auto bg-white py-10 px-4 md:p-10 lg:p-12 md:mx-0 w-full">
            <div className="space-y-2 text-center font-medium">
              <p className="text-lg md:text-xl">{greeting}</p>
              <h1 className="font-semibold text-abeg-neutral-10 text-xl md:text-2xl">
                {heading}
              </h1>
            </div>
            {children}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AuthLayout;
