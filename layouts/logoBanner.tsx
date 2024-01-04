import logo from "@/public/assets/images/shared/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

const LogoBanner: FC = () => {
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
        className={`font-medium md:text-lg lg:text-xl text-abeg-teal-10`}
      >
        AbegHelp.me
      </span>
    </Link>
  );
};

export default LogoBanner;
