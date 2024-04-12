import { cn } from "@/lib";
import { useDragScroll } from "@/lib/hooks";
import {
	storiesAboutUs,
	testimonialImage1,
} from "@/public/assets/images/landing-page";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";
import * as React from "react";

const successStories = [
	{
		title: "Education",
		secondTitle: "Empowering Future Generations",
		text: "Meet Sarah, a young girl from a rural village who had big dreams but limited resources. With the support of generous donors like you, Sarah received a scholarship that enabled her to pursue her education. Today, she's not just a graduate; she's an inspiration to her community, proving that education can break barriers and change lives.",
		image: storiesAboutUs,
	},
	{
		title: "Health and wellness",
		secondTitle: "Transforming Lives Through Care",
		text: "Join us in celebrating the remarkable journey of James, a father of three who battled a life-threatening illness. Thanks to your contributions, James received the medical treatment he desperately needed. Now, he's healthy, happy, and grateful for a second chance at life. Your support has made a profound impact on James and his family, giving them hope for a brighter future.",
		image: testimonialImage1,
	},
	{
		title: "Others",
		secondTitle: "Building Stronger Communities Together",
		text: "Discover the story of Maria, a passionate advocate for community development. Through your support, Maria's organization was able to implement vital projects that uplifted her community. From building schools and clean water systems to providing vocational training, your donations have empowered individuals like Maria to create lasting change and improve countless lives.",
		image: storiesAboutUs,
	},
	{
		title: "Volunteer",
		secondTitle: "Preserving Our Planet for Future Generations",
		text: "Join us in celebrating the conservation efforts of David, a dedicated environmentalist committed to protecting our planet's natural resources. With your support, David's organization launched initiatives to restore endangered ecosystems, promote sustainable practices, and educate communities about the importance of environmental stewardship. Together, we're safeguarding our planet for generations to come.",
		image: storiesAboutUs,
	},
	{
		title: "Emergency",
		secondTitle: "Providing Hope in Times of Crisis",
		text: "Meet Maria, a survivor of a devastating natural disaster that left her homeless and vulnerable. Thanks to your swift response and generosity, Maria received emergency relief aid that provided her with shelter, food, and essential supplies. Your compassion and support during times of crisis offer hope and comfort to those facing unimaginable hardships.",
		image: testimonialImage1,
	},
	{
		title: "Others",
		secondTitle: "Nurturing Creativity and Expression",
		text: "Celebrate the artistic journey of John, a talented musician whose passion for music knows no bounds. With your support, John was able to pursue his dreams, attend music school, and share his gift with the world. Through his captivating performances, John inspires others to embrace their creativity and express themselves through the power of music.",
		image: storiesAboutUs,
	},
];
const SuccessStories = ({ className }: { className?: string }) => {
	useDragScroll<HTMLDivElement>("desktopOnly");
	const [currentItem, setCurrentItem] = useState(0);

	const next = () => {
		setCurrentItem((prevItem) =>
			prevItem === successStories.length - 1 ? 0 : prevItem + 1
		);
	};

	const prev = () => {
		setCurrentItem((prevItem) =>
			prevItem === 0 ? successStories.length - 1 : prevItem - 1
		);
	};

	return (
		<div className={cn("relative flex flex-col md:gap-12", className)}>
			<h1 className="px-4 text-4xl font-bold text-center">
				The Success stories of the benefactors speak for themselves
			</h1>

			<div className={"md:flex overflow-hidden"}>
				{successStories.map((story, id) => (
					<div
						key={id}
						style={{ transform: `translateX(-${currentItem * 100}%)` }}
						className="w-full transition-transform duration-500 flex flex-col-reverse gap-5 md:flex-row shrink-0 grow-0 space-y-10 md:space-y-0 md:justify-between md:items-center"
					>
						<div className="md:w-1/2 space-y-5 md:space-y-10">
							<h1 className="text-xl">{story.title}</h1>
							<h1 className="text-4xl lg:text-5xl font-bold pr-16 md:pr-0">
								{story.secondTitle}
							</h1>
							<p className="text-xl md:text-base font-medium">{story.text}</p>
						</div>
						<div className="w-full md:w-1/2">
							<Image
								src={story.image}
								alt="Create campaign card image"
								width={350}
								height={350}
								className="w-full rounded-2xl object-cover"
							/>
							<button
								className="hidden md:block absolute z-50 top-[45%] right-0 transform -translate-y-1/2 border border-white rounded-full p-2 md:p-3 backdrop-filter backdrop-blur-md hover:backdrop-blur-lg transition-all duration-300"
								onClick={next}
							>
								<ArrowRightIcon className="text-white" />
							</button>
							<button
								className="hidden md:block absolute z-50 transform  top-[55%] right-0 -translate-y-1/2 border border-white rounded-full p-2 md:p-3 backdrop-filter backdrop-blur-md hover:backdrop-blur-lg transition-all duration-300"
								onClick={prev}
							>
								<ArrowLeftIcon className="text-white" />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default SuccessStories;
