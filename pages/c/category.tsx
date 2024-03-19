import TestimonialCard from "@/components/common/TestimonialCard";
import {
	CampaignCategories,
	Hero,
	HowItWorks,
} from "@/components/common/landingPage";
import { Button, Input, ProgressBar } from "@/components/ui";
import { BaseLayout } from "@/layouts";
import {
	ChooseDonation,
	SelectFundraiser,
	SubmitDonation,
} from "@/public/assets/icons/campaign";
import {
	happyPeople,
	testimonialImage1,
} from "@/public/assets/images/landing-page";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const campaignCard = [
	{
		image: SelectFundraiser,
		heading: "Select a Fundraiser",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam. quis nostrud ullamco laboris. ",
	},
	{
		image: ChooseDonation,
		heading: "Choose you Donation Method",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam. quis nostrud ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
	},
	{
		image: SubmitDonation,
		heading: "Submit your donation method",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam. quis nostrud ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
	},
];
const testimonials = [
	{
		image: testimonialImage1,
		name: "Jonathan Doe",
		greeting: "Thanks AHM",
		text: "Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me",
	},
	{
		image: testimonialImage1,
		name: "Sandra Doe",
		greeting: "Thanks AHM",
		text: "Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me",
	},
	{
		image: testimonialImage1,
		name: "William Doe",
		greeting: "Thanks AHM",
		text: "Join the effortless way to raise funds and make a difference and empower your cause with Abeghelp.me",
	},
];

const wellnessCampaign = [
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
const CampaignCategory = () => {
	const itemsPerPage = 9;
	const [currentPage, setCurrentPage] = useState(1);

	const totalItems = wellnessCampaign.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
	const currentItems = wellnessCampaign.slice(startIndex, endIndex);

	const handlePageChange = (page: any) => {
		setCurrentPage(page);
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};
	return (
		<BaseLayout>
			<div
				className="md:flex items-center h-screen md:h-full md:py-40 justify-center space-y-5 px-5 text-gray-50 md:space-y-10"
				style={{
					backgroundImage: `url(/assets/images/landing-page/background.png)`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<h1 className="md:text-center text-5xl font-bold md:text-6xl">
					Health & Wellness
				</h1>
				<p className="md:text-center text-lg text-gray-50 md:w-[30rem]">
					Join the effortless way to raise funds and make a difference and
					empower your cause with Abeghelp.me{" "}
				</p>

				<form className="flex gap-2 w-full">
					<Input
						placeholder="Type your enquiry here"
						className="bg-transparent border md:w-[30rem] text-white ring-1 ring-white"
					/>
					<Button className="px-10 py-2 bg-white text-abeg-primary rounded-md text-md font-bold">
						Search
					</Button>
				</form>
			</div>

			<div className="pt-10 md:pt-20 px-5 md:px-20">
				<div className="w-full flex flex-col gap-2 space-y-5">
					<h1 className="text-4xl md:w-full font-bold md:text-5xl">
						Explore our health & Wellness Campaigns
					</h1>
					<p className="text-xl md:w-3/6 text-placeholder font-medium">
						Join the effortless way to fundraise and make a difference and
						empower your cause with Abeghelp.me
					</p>
				</div>

				<div className="md:grid md:grid-cols-3 gap-5 mt-10">
					{currentItems.map((item, index) => (
						<Link
							key={index}
							href={`/explore?category=${item.name}`}
							className="mb-5 space-y-4 md:mb-0"
						>
							<Image
								src={item.image}
								alt={item.name}
								priority
								width={400}
								height={400}
								className="h-60 w-full rounded-md object-cover"
							/>
							<h3 className="text-md text-base font-semibold xl:pr-10 xl:text-lg">
								{item.title}
							</h3>
							<p className="text-xs">
								By: {item.name} - {item.proffession}
							</p>
							<ProgressBar
								value={70}
								className="rounded-full progress-unfilled:h-1 progress-unfilled:bg-teal-400 progress-filled:bg-abeg-primary"
							/>
							<p className="pt-2 text-xs text-abeg-primary">
								{item.amountRaised} raised
							</p>
						</Link>
					))}
				</div>

				<div className="flex justify-center items-center gap-5 mt-10 md:mt-20">
					<button
						onClick={handlePrevPage}
						disabled={currentPage === 1}
						className="font-bold md:text-2xl"
					>
						Prev
					</button>
					{Array.from({ length: totalPages }, (_, index) => index + 1).map(
						(pageNumber, i) => (
							<div className="flex items-center">
								{(pageNumber <= 3 || i === totalPages - 1) && (
									<button
										key={pageNumber}
										onClick={() => handlePageChange(pageNumber)}
										className={`px-3 rounded-full md:text-2xl ${
											currentPage === pageNumber
												? "bg-abeg-primary text-white font-bold border border-black"
												: "font-bold"
										}`}
									>
										{pageNumber}
									</button>
								)}
								{pageNumber === 3 && totalPages > 3 && (
									<span className="px-3 py-1 font-bold md:text-2xl">...</span>
								)}
							</div>
						)
					)}
					<button
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
						className="font-bold md:text-2xl"
					>
						Next
					</button>
				</div>
			</div>

			<div className="py-10 md:py-20 px-5 md:px-20">
				{/* <span className="hidden md:block">
          <CampaignCategories heading={"Our Other Campaign Categories"} />
        </span>

        <span className="md:hidden">
          <CampaignCategories heading={"Campaign Categories"} />
        </span> */}
				{/* <div className="space-y-5 pb-5 pt-10 md:pt-20 md:flex justify-between lg:space-y-0 lg:divide-x-2 lg:divide-slate-500">
          <div className="space-y-5 md:pr-21 lg:w-1/2">
            <h4 className="text-xl text-gray-500">Want to know more?</h4>
            <h1 className="text-4xl font-bold md:text-5xl">
              Here&apos;s how it works
            </h1>
            <Link href="/c/create">
              <Button className="mt-5 border bg-abeg-primary font-semibold outline-none px-8">
                Donate now
              </Button>
            </Link>
          </div>
          <div className="flex items-center lg:w-1/2 lg:flex lg:pl-24">
            <p className="text-2xl text-gray-500">
              Join the effortless way to fundraise and make a difference and
              empower your cause with Abeghelp.me
            </p>
          </div>
        </div> */}
				{/* <div className="gap-5 space-y-16 py-10 md:flex md:space-y-0 md:py-20">
          {campaignCard.map((card, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl bg-gray-200 p-5 w-full"
            >
              <Image
                src={card.image}
                alt="Create campaign card image"
                width={100}
                height={100}
                className="relative top-[-4rem]"
              />
              <h1 className="text-xl font-bold">{card.heading}</h1>
              <p className="text-md font-medium pb-10">{card.text}</p>
            </div>
          ))}
        </div> */}
				<HowItWorks />
			</div>

			<div className="px-5 md:px-20 pb-20">
				<h1 className="md:block hidden lg:px-32 text-center text-5xl font-bold">
					Hear from some of our users we&apos;ve helped reach their goals
				</h1>
				<h1 className="text-center text-4xl font-bold md:hidden">
					Some of our users we&apos;ve helped reach their goals
				</h1>
				<div className="flex w-full gap-5 overflow-x-auto hide-scrollbar">
					{testimonials.map((testimonial, index) => (
						<TestimonialCard key={index} testimonial={testimonial} />
					))}
				</div>
			</div>
		</BaseLayout>
	);
};
export default CampaignCategory;
