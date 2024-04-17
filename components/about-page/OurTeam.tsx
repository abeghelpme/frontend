import { JaneDoe, JohnDoe1, JohnDoe2 } from "@/public/assets/images/about-page";
import Image from "next/image";

const ourTeam = [
	{
		name: "Jane Doe",
		position: "UI UX Designer",
		image: JaneDoe,
	},
	{
		name: "John Doe",
		position: "UI UX Designer",
		image: JohnDoe1,
	},
	{
		name: "John Doe",
		position: "Frontend Engineer",
		image: JohnDoe2,
	},
	{
		name: "John Doe",
		position: "Frontend Engineer",
		image: JohnDoe2,
	},
	{
		name: "John Doe",
		position: "Frontend Engineer",
		image: JaneDoe,
	},
	{
		name: "John Doe",
		position: "Frontend Engineer",
		image: JohnDoe1,
	},
	{
		name: "John Doe",
		position: "Frontend Engineer",
		image: JohnDoe2,
	},
	{
		name: "John Doe",
		position: "Support Engineer",
		image: JohnDoe2,
	},
	{
		name: "John Doe",
		position: "Team Lead",
		image: JohnDoe2,
	},
];
const OurTeam = () => {
	return (
		<section className="px-5 md:px-20 py-10 lg:py-20">
			<div className="flex flex-col items-center space-y-5">
				<p className="text-xl">Meet the team</p>
				<h1 className="font-bold text-4xl">A pack of achievers with a dream</h1>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-10">
				{ourTeam.map((dev, index) => (
					<div key={index} className="flex flex-col items-center">
						<Image src={dev.image} width={300} height={300} alt={dev.name} />
						<span className="bg-abeg-gray text-white flex flex-col items-center p-2 w-full">
							<h1 className="text-2xl">{dev.name}</h1>
							<p className="text-base">{dev.position}</p>
						</span>
					</div>
				))}
			</div>
		</section>
	);
};
export default OurTeam;
