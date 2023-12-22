import React from "react";
import Image from "next/image";

import bellIcon from "@/public/assets/icons/auth/notification-bing.svg";
import arrowDown from "@/public/assets/icons/auth/arrow-down.svg";
import LogoBanner from "@/layouts/logoBanner";

import authBgContours from "@/public/assets/images/shared/bg-contours.png";
import Avatar from "@/components/primitives/Avatar/avatar";

export default function TwoFaBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col pb-4">
      <Image
        src={authBgContours}
        alt=""
        role="presentation"
        priority
        className="absolute inset-0 -z-[1] object-cover object-[75%] h-full w-full"
      />
      <header className="flex border-b-[0.5px] border-b-abeghelp px-4 md:px-[6.25rem] py-6">
        <LogoBanner textColor />
        <div className="ml-auto flex items-center gap-4">
          <Image src={bellIcon as string} height={20} width={20} alt="" />
          <Avatar className="" initials="LC" isCircle size={"sm"} hasBorder />
          <h3 className="hidden md:block">Locs Fesigner</h3>
          <Image src={arrowDown as string} height={20} width={20} alt="" />
        </div>
      </header>
      {children}
    </div>
  );
}
