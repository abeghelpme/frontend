import logo from "@/public/assets/images/shared/logo.svg";
import Image from "next/image";
import Link from "next/link";

const LogoBanner = () => {
	return (
		<Link href="/" className={`flex items-center justify-center gap-2`}>
			<Image
				className="aspect-square w-6"
				src={logo as string}
				priority
				alt="logo"
			/>
			<span role="" className={`font-bold text-abeg-primary`}>
				AbegHelp.me
			</span>
		</Link>
	);
};

export default LogoBanner;
