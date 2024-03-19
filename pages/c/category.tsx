import TestimonialCard from "@/components/common/TestimonialCard";
import { Button } from "@/components/ui";
import { BaseLayout } from "@/layouts";
import {
	ChooseDonation,
	SelectFundraiser,
	SubmitDonation,
} from "@/public/assets/icons/campaign";
import {
	createCampaignImage1,
	createCampaignImage2,
	createCampaignImage3,
	testimonialImage1,
} from "@/public/assets/images/landing-page";
import Image from "next/image";
import Link from "next/link";

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

const hobbies = [
	{ name: "Health & Wellness", color: "bg-teal-800", likes: 20 },
	{ name: "Religion", color: "bg-teal-800", likes: 12 },
	{ name: "Events", color: "bg-teal-800", likes: 10 },
	{ name: "Business", color: "bg-teal-800", likes: 12 },
	{ name: "Medical", color: "bg-violet-400", likes: 18 },
	{ name: "Wedding", color: "bg-teal-800", likes: 8 },
	{ name: "Family", color: "bg-gray-800", likes: 15 },
	{ name: "Volunteer", color: "bg-teal-800", likes: 20 },
	{ name: "Others", color: "bg-teal-800" },
	{ name: "Emergency", color: "bg-abeg-primary", likes: 30 },
	{ name: "Education", color: "bg-teal-800", likes: 15 },
];

// const chunkedHobbies = (array: any, size: any) => {
//   const chunkedArray = [];
//   for (let i = 0; i < array.length; i += size) {
//     chunkedArray.push(array.slice(i, i + size));
//   }
//   return chunkedArray;
// };

// const groupedHobbies = chunkedHobbies(hobbies, 3);
const CampaigCategory = () => {
	return (
		<BaseLayout>
			<div
				className="flex items-center justify-center md:py-10 lg:h-screen text-white"
				style={{
					backgroundImage: `url(/assets/images/landing-page/background.png)`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="mt-5 lg:mt-0 px-5 md:px-20">
					<h1 className="mt-10 text-3xl font-bold md:text-4xl lg:mt-20">
						Health & Wellness
					</h1>
					<p className="text-2xl font-extralight text-gray-200 md:text-3xl">
						Join the effortless way to fundraise and make a difference and
						empower your cause with Abeghelp.me
					</p>
				</div>
			</div>

			<div className="py-20 px-5 md:px-20">
				<div className="mb-10 md:mb-20 space-y-5">
					<h1 className="text-4xl font-bold md:text-5xl">
						Our Other Campaign Categories
					</h1>
					<p className="text-xl text-gray-500 lg:w-1/2">
						Join the effortless way to fundraise and make a difference and
						empower your cause with Abeghelp.me
					</p>
					<div className="md:grid md:grid-cols-4 gap-4 space-y-5">
						{hobbies.map((hobby, index) => (
							<div key={index} className="md:flex md:flex-col gap-4">
								<Link
									key={index}
									href={`/hobbies/${hobby.name.toLowerCase()}`}
									className={`flex flex-wrap items-center p-8 ${hobby.color} text-white justify-center rounded-lg w-full`}
								>
									<h2 className="font-semibold">{hobby.name}</h2>
									{hobby.likes && <p className="ml-2">({hobby.likes})</p>}
								</Link>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-5 pb-5 md:flex justify-between lg:space-y-0 lg:divide-x-2 lg:divide-slate-500">
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
				</div>
				<div className="gap-5 space-y-16 py-10 md:flex md:space-y-0 md:py-20">
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
				</div>
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
export default CampaigCategory;
