import { Button } from "@/components/ui";
import { hero } from "@/public/assets/images/landing-page";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type Button = {
	href: String;
	text: String;
};
type Props = {
	h1Tag: String;
	pTag: String;
	button1: Button;
	button2?: Button;
	imageSrc: StaticImageData;
};
const Hero = ({ h1Tag, pTag, button1, button2, imageSrc }: Props) => {
	return (
		<div
			className="flex items-center md:py-10 lg:h-screen"
			style={{
				backgroundImage: `url(/assets/images/landing-page/background.png)`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="flex flex-col lg:flex-row gap-4 lg:gap-12 lg:items-center px-5 text-gray-50  md:px-20">
				<div className="w-full lg:w-1/2 flex flex-col gap-6">
					<h1 className="pr-5 text-5xl font-bold md:pr-0 md:text-6xl md:leading-snug leading-tight">
						{h1Tag}
					</h1>
					<p className="pr-10 text-lg text-gray-50 md:pr-5">{pTag} </p>
					<div className="flex space-x-10 py-5 md:pt-20">
						<Link href={`${button1.href}`}>
							<Button className="text-md bg-gray-50 font-semibold text-abeg-primary outline-none">
								{button1.text}
							</Button>
						</Link>
						{button2 && (
							<Link href={`${button2.href}`}>
								<Button className="text-md border border-gray-200 bg-transparent font-semibold text-gray-100 outline-none">
									{button2.text}
								</Button>
							</Link>
						)}
					</div>
				</div>
				<Image
					src={imageSrc}
					alt="hero image"
					width={300}
					height={300}
					priority={true}
					className="ml-[-1.5rem] flex lg:w-1/2 w-full justify-center py-10 md:justify-start lg:py-0"
				/>
			</div>
		</div>
	);
};
export default Hero;
