"use client";
import { useToggle } from "@/lib/hooks";
import { closeIcon, menuIcon } from "@/public/assets/images/landing-page";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../ui";
import LogoBanner from "./LogoBanner";

const navLinks = [
	{ name: "How it works", url: "/create-campaign" },
	{ name: "Explore Campaigns", url: "/create-campaign" },
	{ name: "About", url: "/about" },
];
const Header = () => {
	const [isMobileNavOpen, toggleMobileNav] = useToggle(false);
	const router = useRouter();

	return (
		<header className="bg-abeg-primary text-white  lg:py-7 px-5 md:px-20">
			<div className="hidden lg:flex lg:justify-between items-center">
				<LogoBanner className="text-white font-normal" />
				<nav className="text-lg">
					<ul className="lg:flex-row lg:justify-between lg:space-x-10">
						{navLinks.map((link, index) => (
							<Link key={index} href={link.url}>
								{link.name}
							</Link>
						))}
					</ul>
				</nav>
				<div className="md:flex gap-2">
					<Button
						className="bg-transparent border-2 border-white px-8 font-semibold text-md"
						onClick={() => void router.push("/signin")}
					>
						Sign In
					</Button>
					<Button
						className="bg-white text-abeg-primary font-semibold text-md"
						onClick={() => void router.push("/create-campaign")}
					>
						Start Fundraiser
					</Button>
				</div>
			</div>

			<div className="lg:hidden flex justify-between">
				<LogoBanner className="text-white font-normal" />
				<Button onClick={() => toggleMobileNav()}>
					<Image src={menuIcon} alt="menu icon" width={35} height={35} />
				</Button>
			</div>

			{/* Mobile Navigation Menu */}
			{isMobileNavOpen && (
				<div className="lg:hidden fixed z-50 top-0 left-0 w-full h-full bg-white text-abeg-primary font-medium flex flex-col space-y-5 text-2xl py-10 px-5 md:items-center md:justify-center">
					{/* Close button for mobile nav */}
					<div className="flex md:absolute md:top-20 md:right-20 justify-end">
						<Button
							onClick={() => toggleMobileNav()}
							className="text-abeg-primary"
						>
							<Image src={closeIcon} alt="menu icon" width={70} height={70} />
						</Button>
					</div>

					{navLinks.map((link, index) => (
						<div key={index}>
							<Link className="text-xl" href={link.url}>
								{link.name}
							</Link>
						</div>
					))}

					<div className="space-y-5 md:flex md:flex-col justify-center">
						<Button
							className="bg-transparent border-2 border-abeg-primary text-abeg-primary font-semibold text-xl mt-4 w-full md:w-80"
							onClick={() => void router.push("/signin")}
						>
							Sign In
						</Button>
						<Button
							className="bg-abeg-primary px-8 font-semibold text-xl mt-2 w-full md:w-80"
							onClick={() => void router.push("/create-campaign")}
						>
							Start Fundraiser
						</Button>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
