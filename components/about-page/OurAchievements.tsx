import {
	ourAchievements1,
	ourAchievements2,
	ourAchievements3,
	ourAchievements4,
} from "@/public/assets/images/about-page";
import Image from "next/image";

const ourAchievements = [
	{
		figure: "1,500",
		title: "Campaigns Completed",
		image: ourAchievements1,
	},
	{
		figure: "20 Million",
		title: "Raised to Date",
		image: ourAchievements2,
	},
	{
		figure: "950",
		title: "Partner Fundinds",
		image: ourAchievements3,
	},
	{
		figure: "7,000",
		title: "Happy Repeat Customers",
		image: ourAchievements4,
	},
];
const OurAchievements = () => {
	return (
		<section className="bg-abeg-gray md:grid md:grid-cols-2 lg:grid-cols-4 px-20 text-white">
			{ourAchievements.map((achievement, index) => (
				<div
					key={index}
					className="flex flex-col justify-center items-center gap-5 py-24 border-y md:border-x border-gray-300"
				>
					<Image
						src={achievement.image}
						alt="hero image"
						width={100}
						height={100}
					/>
					<div className="space-y-2">
						<h1 className="text-4xl font-bold text-center">
							{achievement.figure}
						</h1>
						<p className="text-2xl text-center">{achievement.title}</p>
					</div>
				</div>
			))}
		</section>
	);
};
export default OurAchievements;
