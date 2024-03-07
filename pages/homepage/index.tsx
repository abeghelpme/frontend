import { Button, ProgressBar } from "@/components/ui";
import { BaseLayout } from "@/layouts";
import {
	avatar1,
	avatar2,
	avatar3,
	createCampaignImage1,
	createCampaignImage2,
	createCampaignImage3,
	crowdFund,
	dropbox,
	envato,
	globalCommunity,
	google,
	happyPeople,
	hero,
	joinnUs,
	netflix,
	senville,
	testimonialImage1,
	testimonialImage2,
	timeCamp,
} from "@/public/assets/images/landing-page";
import Image from "next/image";
import { useState } from "react";

const HomePage = () => {
	const trustedPioneers = [
		timeCamp,
		senville,
		google,
		dropbox,
		netflix,
		envato,
	]; // Trusted Pioneers images

	// State to manage the visibility of each question's answer
	const [expanded, setExpanded] = useState<boolean[]>([]);

	const toggleAnswer = (index: number) => {
		setExpanded((prevExpanded) => {
			const newExpanded = [...prevExpanded];
			newExpanded[index] = !newExpanded[index]; // Toggle the visibility of the answer when the '+' or '-' icon is clicked
			return newExpanded;
		});
	};

	// FAQ data (questions and answers)
	const faqData = [
		{
			question: "How can  I make a donation?",
			answer: "We will let you know soon...",
		},
		{
			question: "Is my donation tax deductible?",
			answer: "We will let you know soon...",
		},
		{
			question: "Can i donate in honor of someone?",
			answer: "We will let you know soon...",
		},
		{
			question: "How will my donation be used?",
			answer: "We will let you know soon...",
		},
		{
			question: "Can i set up a recurring donation?",
			answer: "We will let you know soon...",
		},
	];

	const urgentFundraisers = [
		{
			image: happyPeople,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			proffession: "Health and Welness",
			amountRaised: "$2,000,000",
		},
		{
			image: happyPeople,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			proffession: "Health and Welness",
			amountRaised: "$2,000,000",
		},
		{
			image: happyPeople,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			proffession: "Health and Welness",
			amountRaised: "$2,000,000",
		},
		{
			image: happyPeople,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			proffession: "Health and Welness",
			amountRaised: "$2,000,000",
		},
	];

	const testimonials = [
		{
			image: testimonialImage1,
			name: "Jonathan Doe",
			greeting: "Thanks AHM",
			text: "Join the effortless way to fundraise and make a difference and empower your cause with Abeghelp.me",
		},
		{
			image: testimonialImage2,
			name: "Sandra Doe",
			greeting: "Thanks AHM",
			text: "Join the effortless way to fundraise and make a difference and empower your cause with Abeghelp.me",
		},
		{
			image: testimonialImage1,
			name: "William Doe",
			greeting: "Thanks AHM",
			text: "Join the effortless way to fundraise and make a difference and empower your cause with Abeghelp.me",
		},
	];

	const campaignCard = [
		{
			index: 1,
			image: createCampaignImage1,
			heading: "Create Your Campaign",
			text: "Share your vision. In just a few clicks, set up your fundraising page and tell us what you're passionate about.",
		},
		{
			index: 2,
			image: createCampaignImage2,
			heading: "Share you story",
			text: "Spread the word with our easy sharing tools. Reach out to friends, family, and beyond.",
		},
		{
			index: 3,
			image: createCampaignImage3,
			heading: "Collect Donations",
			text: "See generosity in action. Our secure platform makes donating simple, so you can focus on your cause.",
		},
		{
			index: 4,
			image: createCampaignImage1,
			heading: "Be Happy",
			text: "Change lives With the funds raised, take the steps to turn your dream project into reality.",
		},
	];
	return (
		<BaseLayout>
			<div
				className="flex items-center md:py-10 lg:h-screen"
				style={{
					backgroundImage: `url(/assets/images/landing-page/background.png)`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="md:items-center justify-center md:justify-between lg:flex lg:gap-20 text-gray-50 px-5 md:px-20">
					<div className="space-y-5 mt-5 lg:mt-0">
						<h1 className="text-5xl md:text-6xl font-bold pr-5 md:pr-0">
							Start your journey into fundraising with ease
						</h1>
						<p className="text-gray-50 pr-10 md:pr-5 text-lg">
							Join the effortless way to fundraise and make a difference and
							empower your cause with Abeghelp.me
						</p>
						<div className="flex space-x-10 py-5 md:pt-20">
							<Button className="bg-gray-50 text-abeg-primary outline-none font-semibold text-md">
								Start fundraiser
							</Button>
							<Button className="bg-transparent text-gray-100 outline-none border border-gray-200 font-semibold text-md">
								Donate now
							</Button>
						</div>
					</div>
					<Image
						src={hero}
						alt="hero image"
						width={500}
						height={500}
						className="py-10 lg:py-0 flex justify-center md:justify-start w-full ml-[-1.5rem]"
					/>
				</div>
			</div>

			<div className="px-5 md:px-20 pt-10 md:pt-20 pb-10">
				<div className="lg:flex md:justify-between lg:divide-x-2 lg:divide-slate-500 w-full space-y-5 lg:space-y-0">
					<div className="space-y-5 md:pr-20">
						<h4 className="text-xl text-gray-500">How it works</h4>
						<h1 className="text-4xl md:text-5xl font-bold">
							A Path to Making <br /> a Difference.
						</h1>
					</div>
					<div className="items-center lg:flex justify-between flex-1 gap-10 xl:w-1/3 lg:pl-20 w-full">
						<p className="text-2xl text-gray-500">
							Join the effortless way to fundraise <br /> and make a difference
							and empower <br /> your cause with Abeghelp.me
						</p>
						<Button className="text-gray-500 border border-gray-500 font-semibold outline-none mt-5">
							Explore campaigns
						</Button>
					</div>
				</div>

				<div className="md:flex overflow-x-scroll gap-5 py-10 md:py-20 space-y-5 md:space-y-0 hide-scrollbar">
					{campaignCard.map((card, index) => (
						<div
							key={index}
							className="relative bg-gray-200 p-5 space-y-3 rounded-xl md:w-[45%] lg:w-[30%] flex-shrink-0 flex-grow-0"
						>
							<h1 className="text-2xl font-bold">{card.heading}</h1>
							<p className="text-md font-medium">{card.text}</p>
							<div className="flex">
								<Image
									src={card.image}
									alt="Create campaign card image"
									width={200}
									height={200}
								/>
								<p className="flex justify-end text-end absolute bottom-0 top-[8rem] left-0 right-[-1.5rem] text-white text-[13rem] font-bold">
									{card.index}
								</p>
							</div>
						</div>
					))}
				</div>

				<div
					className="flex justify-center rounded-xl text-white py-20 lg:px-20"
					style={{
						backgroundImage: `url(/assets/images/landing-page/background.png)`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<div className="space-y-5 md:px-10">
						<p className="flex justify-center text-xl text-center font-light">
							Let&apos;s Help you start your Journey
						</p>
						<h1 className="flex justify-center text-4xl lg:text-5xl font-bold px-5 sm:px-10 md:px-0 text-center">
							Together We are Stronger
						</h1>
						<div className="md:flex md:gap-10 py-14 lg:px-10 space-y-20 md:space-y-0">
							<div className="space-y-5 px-16 md:px-0">
								<h1 className="text-4xl lg:text-5xl flex justify-center font-bold">
									50K
								</h1>
								<p className="flex text-center text-xl font-light">
									Reach more people and hit your goals faster
								</p>
							</div>
							<div className="space-y-5 px-16 md:px-0">
								<h1 className="text-4xl lg:text-5xl  flex justify-center font-bold">
									15+
								</h1>
								<p className="flex text-center text-xl font-light">
									Get donations across 15 different countries
								</p>
							</div>
							<div className="space-y-5 px-16 md:px-0">
								<h1 className="text-4xl lg:text-5xl  flex justify-center font-bold">
									20M
								</h1>
								<p className="flex text-center text-xl font-light">
									More than 20M naira donated everyday
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="items-center justify-between lg:flex lg:gap-20 py-16 lg:py-20">
					<div className="space-y-5 mb-8 lg:mb-0">
						<p className="text-xl">Let&apos;s Help you start your Journey</p>
						<h1 className="text-4xl md:text-5xl font-bold">
							A Path to Making a Difference.
						</h1>
						<div className="border-t-2 border-gray-400"></div>
						<div className="space-y-10">
							<div className="flex gap-5 items-start">
								<Image
									src={globalCommunity}
									alt="hero image"
									width={50}
									height={50}
								/>
								<div className="space-y-2">
									<h1 className="font-bold text-xl">Global Community</h1>
									<p className="text-gray-400">
										Join the effortless way to fundraise and make a difference
										and empower your cause with Abeghelp.me
									</p>
								</div>
							</div>
							<div className="flex gap-5 items-start">
								<Image
									src={crowdFund}
									alt="hero image"
									width={50}
									height={50}
								/>
								<div className="space-y-2">
									<h1 className="font-bold text-xl">Crowd Funding</h1>
									<p className="text-gray-400">
										Join the effortless way to fundraise and make a difference
										and empower your cause with Abeghelp.me
									</p>
								</div>
							</div>
						</div>
						<div className="flex items-center relative bg-teal-300 rounded-full p-3 w-56 md:w-72">
							<div className="relative">
								<Image
									src={avatar1}
									alt="Avatar 1"
									width={50}
									height={50}
									className="md:w-full md:h-full rounded-full relative z-10"
								/>
								<Image
									src={avatar2}
									alt="Avatar 2"
									width={50}
									height={50}
									className="absolute top-0 left-10 md:left-14 md:w-full md:h-full rounded-full z-20"
								/>
								<Image
									src={avatar3}
									alt="Avatar 3"
									width={50}
									height={50}
									className="absolute top-0 left-20 md:left-28 md:w-full md:h-full rounded-full z-30"
								/>
								<p className="absolute top-2 md:top-4 left-32 md:left-48 text-3xl font-semibold ml-2 text-white">
									8k+
								</p>
							</div>
						</div>
					</div>
					<Image src={joinnUs} alt="hero image" width={600} height={600} />
				</div>
				<div>
					<h1 className="hidden md-block font-bold text-5xl text-center px-32">
						Hear from some of our users we&apos;ve helped reach their goals
					</h1>
					<h1 className="md:hidden font-bold text-4xl text-center">
						Some of our users we&apos;ve helped reach their goals
					</h1>
					<div className="flex gap-5 overflow-x-auto w-full hide-scrollbar">
						{testimonials.map((card, index) => (
							<div
								key={index}
								className="lg:flex lg:gap-20 justify-center items-center p-4 md:p-7 rounded-xl mt-16 lg:mt-20 text-white w-[90%] flex-shrink-0 flex-grow-0"
								style={{
									backgroundImage: `url(/assets/images/landing-page/background.png)`,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								<Image
									src={card.image}
									alt="hero image"
									width={400}
									height={400}
									className="w-full"
								/>
								<div className="mt-5 lg:mt-0">
									<p className=" text-2xl font-extralight md:text-3xl text-gray-200">
										{card.text}
									</p>
									<h1 className="text-3xl md:text-4xl font-bold mt-10 lg:mt-20">
										{card.greeting}
									</h1>
									<h1 className="text-xl md:text-2xl font-normal">
										{card.name}
									</h1>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="py-20">
					<div className="lg:flex md:justify-between md:items-center">
						<div className="space-y-5 mb-5">
							<h4 className="text-xl text-gray-500">Donate today</h4>
							<h1 className="text-4xl md:text-5xl font-bold">
								Urgent Fundraisers
							</h1>
							<p className="text-xl text-gray-500">
								Join our community of change makers and make an impact today
							</p>
						</div>
						<Button className="text-gray-500 border border-gray-500 font-semibold outline-none">
							Explore campaigns
						</Button>
					</div>

					<div className="md:flex overflow-x-auto gap-5 mt-14 hide-scrollbar">
						{urgentFundraisers.map((item: any, index) => (
							<div
								key={index}
								className="space-y-4 mb-5 md:mb-0 flex-shrink-0 flex-grow-0 md:w-[45%] lg:w-[30%]"
							>
								<Image
									src={item.image}
									alt={item.name}
									priority
									width={400}
									height={400}
									className="object-cover w-full rounded-md h-60"
								/>
								<h3 className="xl:pr-10 text-md font-semibold text-base xl:text-lg">
									{item.title}
								</h3>
								<p className="text-xs">
									By: {item.name} - {item.proffession}
								</p>
								<ProgressBar
									value={70}
									className="progress-filled:bg-abeg-primary progress-unfilled:bg-teal-400 progress-unfilled:h-1 rounded-full"
								/>

								<p className="pt-2 text-xs text-abeg-primary">
									{item.amountRaised} raised
								</p>
							</div>
						))}
					</div>
				</div>

				<div>
					<h1 className="font-bold text-4xl md:text-5xl text-center md:px-32">
						Trusted By Pioneers
					</h1>
					<div className="flex flex-wrap justify-center gap-10 md:justify-normal py-10">
						{trustedPioneers.map((item: any, index) => (
							<Image key={index} src={item} alt={""} width={150} height={150} />
						))}
					</div>
				</div>

				<div className="mt-10">
					<p className="text-xl text-gray-500">Wanna know more?</p>
					<h1 className="font-bold text-4xl md:text-5xl mt-5 mb-10 md:mb-20">
						Freequently asked questions
					</h1>
					{faqData.map((item, index) => (
						<div key={index} className="bg-white p-4 mb-4 space-y-2">
							<div className="flex justify-between items-center">
								<h3 className="text-4xl font-semibold">{item.question}</h3>
								<span
									className="text-3xl mr-2 cursor-pointer"
									onClick={() => toggleAnswer(index)}
								>
									{expanded[index] ? "−" : "+"}
								</span>
							</div>
							{expanded[index] && <p className="mt-2">{item.answer}</p>}
							<div className="border-t-2 border-gray-300 mt-2"></div>
						</div>
					))}
				</div>
			</div>
		</BaseLayout>
	);
};

export default HomePage;
