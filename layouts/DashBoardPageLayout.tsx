// import DashboardSidebarNav from '@/components/common/DashboardSidebarNav';
// import DashboardTopNav from "@/components/common/DashboardTopNav";
import {
	DashboardAnalytics,
	DashboardSettings,
	DashboardUpdates,
} from "@/components/dashboard";

import { type ReactNode, useState } from "react";

type DashBoardLayoutProps = {
	children: ReactNode;
};

export const DashBoardPageLayout = function getLayout({
	children,
}: DashBoardLayoutProps): JSX.Element {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("Dashboard");

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleSidebarItemClick = (item: string) => {
		setSelectedItem(item);
	};

	const renderSelectedComponent = () => {
		switch (selectedItem) {
			case "Dashboard":
				return children;
			case "Campaign Analytics":
				return <DashboardAnalytics />;
			case "Updates":
				return <DashboardUpdates />;
			case "Settings":
				return <DashboardSettings />;
			default:
				return null;
		}
	};

	return (
		<main className="relative min-h-full scroll-smooth">
			<div className="relative flex">
				{/* <DashboardSidebarNav
					isSidebarOpen={isSidebarOpen}
					onSidebarItemClick={handleSidebarItemClick}
				/> */}
				<div className="flex-1 overflow-y-auto">
					<section>{renderSelectedComponent()}</section>
				</div>
			</div>
		</main>
	);
};
