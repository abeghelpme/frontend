import SideBarNav from "@/components/Shared/SideBarNav";
import TopNav from "@/components/Shared/TopNav";
import bgContours from "@/public/assets/images/shared/bg-contours.png";
import Image from "next/image";
import { type ReactNode, useState } from "react";

type DashBoardLayoutProps = {
	children: ReactNode;
};

export const DashBoardLayout = function getLayout({
	children,
}: DashBoardLayoutProps): JSX.Element {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<main className="relative min-h-full scroll-smooth">
			<div className="fixed inset-0 z-[-1] h-full w-full overflow-hidden">
				<Image
					src={bgContours}
					alt=""
					priority
					className="h-full w-full object-cover object-[75%]"
				/>
			</div>
			<section className="relative flex">
				<SideBarNav isSidebarOpen={isSidebarOpen} />
				<article className="flex-1 overflow-y-auto">
					<TopNav toggleSidebar={toggleSidebar} />
					{children}
				</article>
			</section>
		</main>
	);
};
