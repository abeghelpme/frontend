import {
  ArrowDownIcon,
  MenuIcon,
  NotificationIcon,
  PlusButtonIcon,
} from "@/public/assets/icons/dashboard/icons";
import Button from "../primitives/Button/button";
import Image from "next/image";
import userIcon from "@/public/assets/icons/dashboard/userIcon.svg";
import Logo from "@/public/assets/icons/dashboard/Logo.svg";
import Link from "next/link";

export default function TopNav() {
  return (
    <div className="sticky top-0 flex items-center justify-between border-b border-teal-100 p-7  md:border-gray-300 md:p-4 md:pr-10">
      <div className="hidden md:block">
        <h1 className="text-sm font-semibold"> Hi, Locs Designer👋</h1>
        <p className="text-sm">Here is an overview of your campaign ✨</p>
      </div>
      <div className="flex items-center justify-center gap-3 md:hidden">
        <div className="cursor-pointer">
          <MenuIcon />
        </div>
        <Link href={"/dashboard"}>
          <Image
            src={Logo as string}
            width={28}
            height={28}
            alt="abeghelp logo"
          />
        </Link>
      </div>
      <div className="flex items-center md:space-x-3">
        <div className="hidden md:block">
          <Button className="flex items-center rounded-md bg-teal-700 p-2">
            <span className="pr-2">
              <PlusButtonIcon />
            </span>
            Create Campaign
          </Button>
        </div>
        <div className="relative mr-1 md:mr-0">
          <div className="absolute left-0 top-3 hidden h-5 border-l border-gray-300 md:block"></div>
          <div className="cursor-pointer md:m-2">
            <NotificationIcon />
          </div>
          <div className="absolute right-0 top-3 hidden h-5 border-r border-gray-300 md:block"></div>
        </div>
        <div className="flex cursor-pointer items-center space-x-2 text-sm">
          <div className="hidden md:block">
            <Image
              src={userIcon as string}
              width={24}
              height={24}
              alt="User Profile Picture"
            />
          </div>
          <div className="rounded-full border border-teal-500 md:hidden">
            <p className="p-2 ">LD</p>
          </div>
          <div className="hidden md:block">Locs Designer</div>
          <div className="pl-1">
            <ArrowDownIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
