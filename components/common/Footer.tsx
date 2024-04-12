import {
	facebook,
	instagram,
	joinUs,
	linkedIn,
	twitter,
	youtube,
} from "@/public/assets/images/landing-page";
import Image from "next/image";
import Link from "next/link";
import LogoBanner from "./LogoBanner";

const socialIcons = [
	{ icon: facebook, url: "https://www.facebook.com/" },
	{ icon: twitter, url: "https://twitter.com/" },
	{ icon: instagram, url: "https://www.instagram.com/" },
	{ icon: linkedIn, url: "https://www.linkedin.com/" },
	{ icon: youtube, url: "https://www.youtube.com/" },
];

const siteMapLinks = [
	{ name: "About", url: "/about" },
	{ name: "How it works", url: "/explore" },
	{ name: "Testimonials", url: "/" },
	{ name: "Partners", url: "/" },
	{ name: "FAQ's", url: "/" },
];

const joinUsLinks = [
	{ name: "Sponsorships", url: "/sponsorships" },
	{ name: "Volunteers", url: "/volunteers" },
	{ name: "Careers", url: "/careers" },
];

const contactUsLinks = [
	{ name: "Support@abeghelp.me", url: "mailto:support@abeghelp.me" },
	{ name: "(+234) 876 - 5432 - 109)", url: "tel:+2348765432109" },
];
const Footer = () => {
	return (
		<footer className="space-y-5 divide-y-2 divide-gray-400 bg-primary p-10 text-white md:p-20">
			<div className="items-center justify-between pb-5 md:flex md:pb-0">
				<h1 className="text-center text-3xl font-bold md:text-start">
					Be a part of the{" "}
					<span className="text-abeg-primary">
						change <br /> today
					</span>{" "}
					with Abeghelp.me
				</h1>
				<div className="mt-10 flex items-center justify-center md:mt-0">
					<Image
						src={joinUs}
						alt="join us"
						width={100}
						height={100}
						className="h-40 w-40"
					/>
				</div>
			</div>
			<div className="mx-auto flex w-full flex-col-reverse space-y-10 pt-10 md:justify-center md:space-y-0 lg:flex-row lg:justify-between lg:space-x-20">
				<div className="flex flex-col space-y-5 md:w-1/3 md:space-y-10">
					<div className="mt-20 space-y-5 md:mt-10 lg:mt-0">
						<div className="flex justify-center md:justify-start">
							<LogoBanner className="text-3xl text-white" />
						</div>
						<div>
							<p className="text-md text-center font-extralight md:text-start">
								“Join the effortless way to raise funds and make adifference and
								empower your cause with Abeghelp.me”
							</p>
						</div>
					</div>
					<div className="flex items-center justify-center space-x-5 md:justify-start">
						{socialIcons.map((social, index) => (
							<Link href={social.url} key={index}>
								<Image src={social.icon} alt="social media icon" />
							</Link>
						))}
					</div>
				</div>
				<div className="justify-center gap-10 space-y-20 text-center md:flex md:flex-row md:justify-between md:space-y-0 lg:w-2/3 lg:justify-between">
					<div className="flex flex-col space-y-5 text-center md:text-start">
						<h1 className="text-2xl font-bold">Sitemap</h1>
						{siteMapLinks.map((link, index) => (
							<div key={index}>
								<Link href={link.url} className="text-xl">
									{link.name}
								</Link>
							</div>
						))}
					</div>
					<div className="flex flex-col space-y-5 text-center md:text-start">
						<h1 className="text-2xl font-bold">Join Us</h1>
						{joinUsLinks.map((link, index) => (
							<div key={index}>
								<Link href={link.url} className="text-xl">
									{link.name}
								</Link>
							</div>
						))}
					</div>
					<div className="flex flex-col space-y-5 text-center md:text-start">
						<h1 className="text-2xl font-bold">Contact Us</h1>
						{contactUsLinks.map((link, index) => (
							<div key={index}>
								<Link href={link.url} className="text-xl">
									{link.name}
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
