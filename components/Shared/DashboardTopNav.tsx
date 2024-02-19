import userImage from "@/public/assets/icons/dashboard/userIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";
import {
	ArrowDownIcon,
	Logo,
	MenuIcon,
	NotificationIcon,
	PlusButtonIcon,
} from "./dashboardIcons";

type TopNavProps = {
	toggleSidebar: () => void;
};

const DashboardTopNav = ({ toggleSidebar }: TopNavProps) => {
	return (
		<header className="sticky top-0 flex items-center justify-between border-b border-gray-400 py-4 lg:p-6  md:border-gray-300 md:pr-5">
			<div className="hidden lg:block">
				<h1 className="text-sm font-semibold"> Hi, Locs Designer👋</h1>
				<p className="text-sm">Here is an overview of your campaign ✨</p>
			</div>
			<div className="flex items-center justify-center lg:hidden">
				<Button className="cursor-pointer" onClick={toggleSidebar}>
					<MenuIcon />
				</Button>
				<Link href={"/dashboard"}>
					<Logo />
				</Link>
			</div>
			<div className="flex items-center md:gap-2 md:divide-x-2 md:divide-gray-300">
				<Button className="md:flex hidden flex-1 items-center rounded-md bg-teal-700 p-2">
					<span className="pr-2">
						<PlusButtonIcon />
					</span>
					<span>Create Campaign</span>
				</Button>
				<div className="cursor-pointer md:ml-2 md:pl-2">
					<NotificationIcon />
				</div>
				<div className="flex items-center cursor-pointer  space-x-2 text-sm pr-5 md:px-0 md:pl-3">
					<Image
						src={userImage}
						width={25}
						height={25}
						alt="User Image"
						className="hidden md:block flex-1"
					/>
					<div className="rounded-full border border-teal-500 md:hidden">
						<p className="p-2 ">LD</p>
					</div>
					<span className="hidden md:block">Locs Designer</span>
					<span className="pl-1">
						<ArrowDownIcon />
					</span>
				</div>
			</div>
		</header>
	);
};
export default DashboardTopNav;
