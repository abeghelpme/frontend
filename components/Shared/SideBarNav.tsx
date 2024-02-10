import Logo from "@/public/assets/icons/dashboard/Logo.svg";
import {
	AnalyticsChartIcon,
	ChatIcon,
	DashboardIcon,
	SettingsIcon,
	UpdatesIcon,
} from "@/public/assets/icons/dashboard/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SideBarNavProps = {
	isSidebarOpen: boolean;
};

export default function SideBarNav({ isSidebarOpen }: SideBarNavProps) {
	const pathname = usePathname();
	const navItems = [
		{ path: "/dashboard", icon: <DashboardIcon />, name: "Dashboard" },
		{
			path: "/dashboard/campaign-analytics",
			icon: <AnalyticsChartIcon />,
			name: "Campaign Analytics",
		},
		{ path: "/dashboard/updates", icon: <UpdatesIcon />, name: "Updates" },
		{ path: "/dashboard/settings", icon: <SettingsIcon />, name: "Settings" },
	];

	return (
		<aside
			className={`${
				!isSidebarOpen
					? "sticky top-0 z-10 hidden  h-screen border-r border-gray-300 md:block px-5"
					: "md:hidden absolute left-3 top-24 w-40 bg-white rounded-lg overflow-hidden text-xl justify-center items-center flex transition-all duration-500 ease-in-out"
			}`}
		>
			<div className="mx-auto flex justify-center py-3">
				<div
					className="mb-20
               justify-center space-y-4 lg:mb-10"
				>
					<Link
						href={"/dashboard"}
						className="mt-5  hidden md:flex flex-col items-center justify-center pb-10"
					>
						<Image
							src={Logo as string}
							width={28}
							height={28}
							alt="abeghelp logo"
						/>
					</Link>
					{navItems.map((item) => (
						<div
							className="flex flex-col items-center justify-center space-y-3 "
							key={item.name}
						>
							<Link href={item.path}>
								<span
									className={`flex flex-col items-center justify-center${
										pathname.startsWith(item.path) ? "" : ""
									}`}
								>
									<span>{item.icon}</span>
									<span className="mt-1 text-sm">{item.name}</span>
								</span>
							</Link>
						</div>
					))}
				</div>
				<div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 transform">
					<Link href={""}>
						<ChatIcon />
					</Link>
				</div>
			</div>
		</aside>
	);
}
