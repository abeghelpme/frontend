import facebook from "@/public/assets/images/landing-page/Facebook.svg";
import instagram from "@/public/assets/images/landing-page/Instagram.svg";
import linkedIn from "@/public/assets/images/landing-page/LinkedIn.svg";
import twitter from "@/public/assets/images/landing-page/Twitter.svg";
import youtube from "@/public/assets/images/landing-page/YouTube.svg";
import joinUs from "@/public/assets/images/landing-page/joinUs.svg";
import Image from "next/image";
import Link from "next/link";
import LogoBanner from "./LogoBanner";

const Footer = () => {
	const socialIcons = [
		{ icon: facebook, url: "https://www.facebook.com/" },
		{ icon: twitter, url: "https://twitter.com/" },
		{ icon: instagram, url: "https://www.instagram.com/" },
		{ icon: linkedIn, url: "https://www.linkedin.com/" },
		{ icon: youtube, url: "https://www.youtube.com/" },
	];

	const siteMapLinks = [
		{ name: "About", url: "/about" },
		{ name: "How it works", url: "/how-it-works" },
		{ name: "Testimonials", url: "/testimonials" },
		{ name: "Partners", url: "/partners" },
		{ name: "FAQ's", url: "/faq" },
	];

	const joinUsLinks = [
		{ name: "Sponsoships", url: "/sponsorships" },
		{ name: "Volunteers", url: "/volunteers" },
		{ name: "Careers", url: "/careers" },
	];

	const contactUsLinks = [
		{ name: "Support@abeghelp.me", url: "mailto:support@abeghelp.me" },
		{ name: "(+234) 876 - 5432 - 109)", url: "tel:+2348765432109" },
	];
	return (
		<footer className="bg-primary text-white p-10 md:p-20 space-y-5 divide-y-2 divide-gray-400">
			<div className="md:flex justify-between items-center pb-5 md:pb-0">
				<h1 className="text-center md:text-start text-3xl font-bold">
					Be a part of the{" "}
					<span className="text-abeg-primary">
						change <br /> today
					</span>{" "}
					with Abeghelp.me
				</h1>
				<div className="flex justify-center items-center mt-10 md:mt-0">
					<Image
						src={joinUs}
						alt="join us"
						width={100}
						height={100}
						className="w-40 h-40"
					/>
				</div>
			</div>
			<div className="flex flex-col-reverse lg:flex-row md:justify-center lg:justify-between pt-10 space-y-10 md:space-y-0 lg:space-x-20 w-full mx-auto">
				<div className="flex flex-col space-y-5 md:space-y-10 md:w-1/3">
					<div className="mt-20 md:mt-10 lg:mt-0 space-y-5">
						<div className="flex justify-center md:justify-start">
							<LogoBanner className="text-white text-3xl" />
						</div>
						<div>
							<p className="text-md font-extralight text-center md:text-start">
								“Join the effortless way to fundraise and make adifference and
								empower your cause with Abeghelp.me”
							</p>
						</div>
					</div>
					<div className="flex space-x-5 items-center justify-center md:justify-start">
						{socialIcons.map((social, index) => (
							<Link href={social.url} key={index}>
								<Image src={social.icon} alt="social media icon" />
							</Link>
						))}
					</div>
				</div>
				<div className="md:flex md:flex-row gap-10 lg:w-2/3 justify-center text-center lg:justify-between space-y-20 md:space-y-0 md:justify-between">
					<div className="space-y-5 flex flex-col text-center md:text-start">
						<h1 className="text-2xl font-bold">Sitemap</h1>
						{siteMapLinks.map((link, index) => (
							<div key={index}>
								<Link href={link.url} className="text-xl">
									{link.name}
								</Link>
							</div>
						))}
					</div>
					<div className="space-y-5 flex flex-col text-center md:text-start">
						<h1 className="text-2xl font-bold">Join Us</h1>
						{joinUsLinks.map((link, index) => (
							<div key={index}>
								<Link href={link.url} className="text-xl">
									{link.name}
								</Link>
							</div>
						))}
					</div>
					<div className="space-y-5 flex flex-col text-center md:text-start">
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
