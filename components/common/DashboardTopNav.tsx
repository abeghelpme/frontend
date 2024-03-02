import userImage from "@/public/assets/icons/dashboard/userIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";
import {
	ArrowDownIcon,
	Logo,
	MenuIcon,
	NotificationIcon,
	PlusIcon,
} from "./dashboardIcons";

type TopNavProps = {
	toggleSidebar: () => void;
};

const DashboardTopNav = ({ toggleSidebar }: TopNavProps) => {
	return (
		<header className="sticky top-0 flex items-center justify-between border-b border-gray-400 py-4 md:border-gray-300  md:pr-5 lg:p-6">
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
				<Button className="hidden rounded-md bg-teal-700 p-2 md:block md:p-0">
					<Link
						href={"/create-campaign"}
						className="flex items-center md:px-5 md:py-4"
					>
						<span className="pr-2">
							<PlusIcon />
						</span>

						<span>Create Campaign</span>
					</Link>
				</Button>
				<div className="cursor-pointer md:ml-2 md:pl-2">
					<NotificationIcon />
				</div>
				<div className="flex cursor-pointer items-center  space-x-2 pr-5 text-sm md:px-0 md:pl-3">
					<Image
						src={userImage}
						width={25}
						height={25}
						alt="User Image"
						className="hidden flex-1 md:block"
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
