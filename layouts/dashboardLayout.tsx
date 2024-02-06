import SideBarNav from "@/components/dashboardNav/SideBarNav";
import TopNav from "@/components/dashboardNav/TopNav";
import bgContours from "@/public/assets/images/shared/bg-contours.png";
import Image from "next/image";
import type { FC, ReactNode } from "react";

interface DashBoardLayoutProps {
  children: ReactNode;
}

const DashBoardLayout: FC<DashBoardLayoutProps> = ({ children }) => {
  return (
    <>
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
          <aside className="sticky top-0 z-10 hidden h-screen w-[20%] border-r border-gray-300 md:block md:w-[20%] lg:w-[15%] xl:w-[13%]">
            <SideBarNav />
          </aside>

          <article className="flex-1 overflow-y-auto">
            <TopNav />

            {children}
          </article>
        </section>
      </main>
    </>
  );
};

export default DashBoardLayout;
