import logo from "@/public/assets/images/shared/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

const LogoBanner: FC = () => {
  return (
    <Link href="/" className={`flex items-center justify-center gap-2`}>
      <Image
        className="aspect-square w-[35px] md:w-[40px]"
        src={logo as string}
        priority
        alt=""
      />
      <span role="" className={`font-medium text-abeg-teal-10 md:text-lg`}>
        AbegHelp.me
      </span>
    </Link>
  );
};

export default LogoBanner;
