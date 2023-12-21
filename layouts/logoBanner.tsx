import React, { type FC } from "react";
import logo from "@/public/assets/images/shared/logo.svg";
import Image from "next/image";
import Link from "next/link";

type CompProp = {
  textColor: boolean;
};
const LogoBanner: FC<CompProp> = ({ textColor }) => {
  return (
    <Link href="/" className={`flex items-center gap-2 justify-center`}>
      <Image
        className="w-[35px] md:w-[40px] lg:w-[46px] lg:aspect-square"
        src={logo as string}
        priority
        alt=""
      />
      <span
        role=""
        className={`${
          textColor ? "text-abeg-teal-10" : "backdrop-blur-sm px-1 bg-white/40"
        } font-medium md:text-lg lg:text-xl`}
      >
        AbegHelp.me
      </span>
    </Link>
  );
};

export default LogoBanner;
