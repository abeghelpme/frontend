import { Footer, NavBar } from "@/components/Shared";
import type { BaseLayoutProps } from "@/interfaces";

export const BaseLayout = ({ children }: BaseLayoutProps) => {
	return (
		<>
			<NavBar />
			<main className={`relative h-full bg-contours bg-cover bg-no-repeat`}>
				{/* <Image
        src={bgContours}
        alt=""
        role="presentation"
        priority
        className="absolute inset-0 -z-[1] h-full w-full object-cover object-[75%]"
        /> */}
				{children}
			</main>
			<Footer />
		</>
	);
};
