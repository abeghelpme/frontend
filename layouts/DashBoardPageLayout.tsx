import DashboardSidebarNav from "@/components/Shared/DashboardSidebarNav";
import DashboardTopNav from "@/components/Shared/DashboardTopNav";

import { type ReactNode, useState } from "react";

type DashBoardLayoutProps = {
	children: ReactNode;
};

export const DashBoardPageLayout = function getLayout({
	children,
}: DashBoardLayoutProps): JSX.Element {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<main className="relative min-h-full scroll-smooth">
			<div className="relative flex">
				<DashboardSidebarNav isSidebarOpen={isSidebarOpen} />
				<div className="flex-1 overflow-y-auto">
					<DashboardTopNav toggleSidebar={toggleSidebar} />
					{children}
				</div>
			</div>
		</main>
	);
};
