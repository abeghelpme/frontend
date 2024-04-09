import { cn } from "@/lib";
import { useDragScroll } from "@/lib/hooks";
import { storiesAboutUs } from "@/public/assets/images/landing-page";
import Image from "next/image";

const successStories = [
	{
		title: "Health and wellness",
		secondTitle: "A Path to Making a Difference.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborinisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		image: storiesAboutUs,
	},
	{
		title: "Health and wellness",
		secondTitle: "A Path to Making a Difference.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborinisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		image: storiesAboutUs,
	},
	{
		title: "Health and wellness",
		secondTitle: "A Path to Making a Difference.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborinisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		image: storiesAboutUs,
	},
	{
		title: "Health and wellness",
		secondTitle: "A Path to Making a Difference.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborinisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		image: storiesAboutUs,
	},
	{
		title: "Health and wellness",
		secondTitle: "A Path to Making a Difference.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborinisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		image: storiesAboutUs,
	},
	{
		title: "Health and wellness",
		secondTitle: "A Path to Making a Difference.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborinisi ut aliquip ex ea commodo consequat.",
		image: storiesAboutUs,
	},
];
const SuccessStories = ({ className }: { className?: string }) => {
	const { dragContainerClasses, dragScrollProps } =
		useDragScroll<HTMLDivElement>("desktopOnly");
	return (
		<div className={cn("flex flex-col gap-8 md:gap-12", className)}>
			<h1 className="px-8 text-4xl font-bold text-center">
				The Success stories of the benefactors speak for themselves
			</h1>
			<div
				{...dragScrollProps}
				className={cn("gap-5 md:gap-20", dragContainerClasses)}
			>
				{successStories.map(
					(story, id) => (
						<div
							key={id}
							className="flex flex-col-reverse gap-5 md:flex-row shrink-0 grow-0 space-y-10 space-x-20 w-[100%] justify-between md:items-center"
						>
							<div className="md:w-1/2 space-y-5 md:space-y-10">
								<h1 className="text-xl">{story.title}</h1>
								<h1 className="text-4xl lg:text-5xl font-bold pr-24 md:pr-0">
									{story.secondTitle}
								</h1>
								<p className="text-xl md:text-base font-medium">{story.text}</p>
							</div>
							<div className="md:w-1/2">
								<Image
									src={story.image}
									alt="Create campaign card image"
									width={350}
									height={350}
									className="w-full"
								/>
							</div>
						</div>
					)
					//   return (
					// <div
					//   key={id}
					//   className={`flex flex-col-reverse gap-4 md:gap-16 justify-between ${
					//     (id + 1) % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
					//   }`}
					// >
					//   <div className="flex flex-col gap-1 md:gap-4 w-full lg:w-[51%] justify-center">
					//     <p className="text-xl font-normal">{story.title}</p>
					//     <p className="text-4xl md:text-5xl font-bold">
					//       {story.secondTitle}
					//     </p>
					//     <p className="text-xl font-extralight">{story.text}</p>
					//   </div>
					//   <Image
					//     src={story.image}
					//     alt="stories about us"
					//     // width={400}
					//     // height={400}
					//     className="w-full lg:w-[49%] rounded-2xl object-cover"
					//   />
					// </div>
					//   );
					// }
				)}
			</div>
		</div>
	);
};
export default SuccessStories;
