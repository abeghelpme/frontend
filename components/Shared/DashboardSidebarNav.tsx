import Image from "next/image";
import Link from "next/link";
import Logo from "/public/assets/icons/dashboard/Logo.svg";
import {
	AnalyticsChartIcon,
	ChatIcon,
	DashboardIcon,
	SettingsIcon,
	UpdatesIcon,
} from "./dashboardIcons";

type SideBarNavProps = {
	isSidebarOpen: boolean;
};

const DashboardSidebarNav = ({ isSidebarOpen }: SideBarNavProps) => {
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
					? "sticky top-0 z-10 hidden  h-screen border-r border-gray-300 lg:block px-5"
					: "lg:hidden absolute left-5 top-20 z-10 w-40 bg-teal-50 rounded-lg overflow-hidden text-xl justify-center items-center flex transition-all duration-500 ease-in-out"
			}`}
		>
			<nav>
				<div className="mx-auto flex flex-col items-center justify-center py-3">
					<ul
						className="pb-5 lg:pb-40
               justify-center space-y-4 lg:mb-10"
					>
						<li className="mt-5  hidden lg:flex flex-col items-center justify-center lg:pb-10">
							<Link href={"/dashboard"}>
								<Image
									src={Logo as string}
									width={28}
									height={28}
									alt="abeghelp logo"
								/>
							</Link>
						</li>
						{navItems.map((item) => (
							<li
								key={item.name}
								className="flex flex-col items-center justify-center pb-2 space-y-3 "
							>
								<Link href={item.path} onClick={() => isSidebarOpen}>
									<span className="flex flex-col items-center justify-center">
										<span>{item.icon}</span>
										<span className="mt-1 text-sm">{item.name}</span>
									</span>
								</Link>
							</li>
						))}
					</ul>
					<Link href={"#"} className="mb-5">
						<ChatIcon />
					</Link>
				</div>
			</nav>
		</aside>
	);
};
export default DashboardSidebarNav;
