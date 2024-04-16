import {
	ContactForm,
	OurAchievements,
	OurPurpose,
	OurTeam,
} from "@/components/about-page";
import TestimonialCard from "@/components/common/TestimonialCard";
import { Button } from "@/components/ui";
import { BaseLayout } from "@/layouts";
import { aboutHero, whoWeAre } from "@/public/assets/images/about-page";
import {
	heroCircle,
	heroHalfMoon,
} from "@/public/assets/images/campaign-category";
import {
	avatar1,
	avatar2,
	avatar3,
	crowdFund,
	globalCommunity,
	joinnUs,
} from "@/public/assets/images/landing-page";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
	return (
		<BaseLayout>
			<div className="relative flex justify-center overflow-hidden bg-abeg-primary bg-cover bg-center px-5 md:px-20 pt-20 pb-56">
				<Image
					src="/assets/images/about-page/MagicPattern.png"
					className="object-cover object-center z-30"
					fetchPriority="high"
					priority={true}
					alt=""
					fill
				/>
				<div className="z-10 w-full lg:mx-12 xl:mx-32">
					<Image
						src={aboutHero}
						fetchPriority="high"
						priority={true}
						alt=""
						width={300}
						height={300}
						className="z-10 w-full aspect-video object-cover h-72 md:h-96 rounded-lg"
					/>
				</div>
				<Image
					src={heroHalfMoon}
					alt="hero svg icon"
					fetchPriority="high"
					priority={true}
					width={90}
					height={90}
					className="z-10 absolute top-4 left-2 md:left-16 md:top-16 md:-translate-y-0 md:translate-x-0 lg:left-40 lg:top-32"
				/>

				<Image
					src={heroCircle}
					alt="hero svg icon"
					fetchPriority="high"
					priority={true}
					width={150}
					height={150}
					className="z-10 md: absolute right-[-4rem] top-60 md:right-0 md:top-[25rem] "
				/>
				<div className="z-10 absolute sm:top-[10rem] top-[20rem] md:top-[25rem] text-white flex flex-col items-center gap-2 md:gap-10 md:max-w-[850px]  text-center px-5">
					<h3 className="text-5xl md:text-6xl font-extrabold">
						One Campaign at a time, we're renewing hope in lives
					</h3>
					<p className="font-medium text-base md:text-xl md:max-w-[700px] px-2">
						Join the effortless way to fundraise and make a difference and
						empower your cause with Abeghelp.me
					</p>
				</div>
			</div>

			<section className="px-5 py-16 md:px-20 lg:py-20">
				<div className="items-center lg:grid lg:grid-cols-2 lg:gap-20 justify-between relative">
					<div className="mb-8 space-y-5 lg:mb-0 lg:pr-24">
						<p className="text-xl">Who we are at Abeghelp.me?</p>
						<h1 className="text-3xl md:text-4xl font-bold pr-10 md:pr-20">
							Learn about our Company
						</h1>

						<div className="border-t-2 border-gray-300" />
						<p className="text-base">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
							convallis, purus a efficitur congue, arcu sem semper enim, sit
							amet iaculis neque purus in dui. Class aptent taciti sociosqu ad
							litora torquent per conubia nostra, per inceptos himenaeos. Nam
							quis lectus ac nibh porttitor tincidunt sed ac augue. Nunc viverra
							sed nisl eget scelerisque. Quisque finibus faucibus
							elementum. Donec scelerisque lectus id orci tempus sagittis ut in
							dolor.
						</p>
						<div className="space-y-10">
							<div className="flex items-start gap-5">
								<Image
									src={globalCommunity}
									alt="hero image"
									width={50}
									height={50}
								/>
								<div className="space-y-2">
									<h1 className="text-xl font-bold">Global Community</h1>
									<p className="text-gray-400 text-sm">
										The global community of volunteers, donors and supporters
										that help you achieve your goals with Abeghelp.me
									</p>
								</div>
							</div>
							<div className="flex items-start gap-5">
								<Image
									src={crowdFund}
									alt="hero image"
									width={50}
									height={50}
								/>
								<div className="space-y-2">
									<h1 className="text-xl font-bold">Crowd Funding</h1>
									<p className="text-gray-400 text-sm">
										Crowd funding platforms that help you raise funds for your
										cause and help them reach their goals with Abeghelp.me
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="relative">
						<Image
							src={whoWeAre}
							alt="hero image"
							width={600}
							height={600}
							className="size-full rounded-xl"
						/>
						<div className="absolute right-[120px] md:right-[290px] bottom-8 md:bottom-[70px] text-white px-5 md:px-10 py-5 bg-abeg-teal flex flex-col items-center justify-center">
							<p className="text-base">Over</p>
							<h1 className="text-3xl md:text-5xl">10,000</h1>
							<p className="text-base text-center">Satisfied Customers</p>
						</div>
					</div>
				</div>
			</section>

			<OurAchievements />

			<section className="flex flex-col-reverse lg:flex-row items-center justify-between px-5 py-16 md:px-20 lg:flex lg:gap-20 lg:py-20">
				<Image
					src={joinnUs}
					alt="hero image"
					width={600}
					height={600}
					className="size-full"
				/>
				<div>
					<div className="mb-8 space-y-5 lg:mb-0">
						<p className="text-xl hidden md:block">Why Abeghelp.me?</p>
						<p className="text-xl md:hidden">
							Lets Help you start your Journey
						</p>
						<h1 className="text-4xl font-bold">
							A Path to Making a Difference.
						</h1>
						<div className="border-t-2 border-gray-300" />
						<div className="space-y-10">
							<div className="flex items-start gap-5">
								<Image
									src={globalCommunity}
									alt="hero image"
									width={50}
									height={50}
								/>
								<div className="space-y-2">
									<h1 className="text-xl font-bold">Global Community</h1>
									<p className="text-gray-400 text-sm">
										The global community of volunteers, donors and supporters
										that help you achieve your goals with Abeghelp.me
									</p>
								</div>
							</div>
							<div className="flex items-start gap-5">
								<Image
									src={crowdFund}
									alt="hero image"
									width={50}
									height={50}
								/>
								<div className="space-y-2">
									<h1 className="text-xl font-bold">Crowd Funding</h1>
									<p className="text-gray-400 text-sm">
										Crowd funding platforms that help you raise funds for your
										cause and help them reach their goals with Abeghelp.me
									</p>
								</div>
							</div>
						</div>
						<div className="relative flex w-56 items-center rounded-full bg-abeg-avatar p-3 md:w-72">
							<div className="relative">
								<Image
									src={avatar1}
									alt="Avatar 1"
									width={50}
									height={50}
									className="relative z-10 rounded-full md:size-full"
								/>
								<Image
									src={avatar2}
									alt="Avatar 2"
									width={50}
									height={50}
									className="absolute left-10 top-0 z-20 rounded-full md:left-14 md:size-full"
								/>
								<Image
									src={avatar3}
									alt="Avatar 3"
									width={50}
									height={50}
									className="absolute left-20 top-0 z-30 rounded-full md:left-28 md:size-full"
								/>
								<p className="absolute left-32 top-2 ml-2 text-4xl font-semibold text-white md:left-48 md:top-4">
									8k+
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="lg:flex px-5 md:px-20 gap-20 space-y-10 lg:space-y-0">
				<div className="lg:w-1/3 space-y-5 w-full">
					<p className="text-xl">Why we do what we do</p>
					<h1 className="text-4xl font-bold">
						Saving lives one donation at a time
					</h1>
					<div className="border-t-2 border-gray-300" />
					<div className="space-y-10">
						<div className="flex items-start gap-5">
							<Image
								src={globalCommunity}
								alt="hero image"
								width={50}
								height={50}
							/>
							<div className="space-y-2">
								<h1 className="text-xl font-bold">Global Community</h1>
								<p className="text-gray-400 text-sm">
									The global community of volunteers, donors and supporters that
									help you achieve your goals with Abeghelp.me
								</p>
							</div>
						</div>
						<div className="flex items-start gap-5">
							<Image src={crowdFund} alt="hero image" width={50} height={50} />
							<div className="space-y-2">
								<h1 className="text-xl font-bold">Crowd Funding</h1>
								<p className="text-gray-400 text-sm">
									Crowd funding platforms that help you raise funds for your
									cause and help them reach their goals with Abeghelp.me
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Tabs */}
				<div className="lg:w-2/3 w-full">
					<OurPurpose />
				</div>
			</section>

			<OurTeam />

			<ContactForm />

			<section className="py-20">
				<div className="relative flex justify-center text-white py-36 lg:p-40">
					<Image
						src="/assets/images/about-page/image-pattern.png"
						className="object-cover object-center z-50"
						fetchPriority="high"
						priority={true}
						alt=""
						fill
					/>
					<div className="flex flex-col items-center space-y-5 z-50 max-w-[650px]">
						<p className="text-xl text-center">
							Let&apos;s Help you start your Journey
						</p>
						<h1 className="text-4xl font-bold md:text-5xl text-center pb-10">
							Let&apos;s help make your dream a reality today
						</h1>
						<Button
							className="flex w-[300px] py-5 justify-center border border-gray-100 font-semibold bg-abeg-primary text-white text-base outline-none"
							asChild
						>
							<Link href="/c/create">Start a Fundraiser</Link>
						</Button>
					</div>
				</div>
			</section>

			<TestimonialCard className="pb-10 md:pb-20" />
		</BaseLayout>
	);
};
export default AboutPage;
