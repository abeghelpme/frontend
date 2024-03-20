import { testimonialImage1 } from "@/public/assets/images/landing-page";
import Image from "next/image";

type TestimonialProps = {
	testimonial: {
		image: any;
		name: string;
		greeting: string;
		text: string;
	};
};

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

const TestimonialCard = () => {
	return (
		<>
			<h1 className="md:block hidden lg:px-32 text-center text-5xl font-bold">
				Hear from some of our users we&apos;ve helped reach their goals
			</h1>
			<h1 className="text-center text-4xl font-bold md:hidden">
				Some of our users we&apos;ve helped reach their goals
			</h1>
			<div className="flex w-full gap-5 overflow-x-auto hide-scrollbar">
				{testimonials.map((testimonial, index) => (
					<div
						key={index}
						className="mt-16 w-[90%] flex-shrink-0 flex-grow-0 items-center justify-center rounded-xl p-4 text-white md:p-7 lg:mt-20 lg:flex lg:gap-20"
						style={{
							backgroundImage: `url(/assets/images/landing-page/background.png)`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						<Image
							src={testimonial.image}
							alt="testimonial image"
							width={400}
							height={400}
							className="w-full"
						/>
						<div className="mt-5 lg:mt-0">
							<p className="text-2xl font-extralight text-gray-200 md:text-3xl">
								{testimonial.text}
							</p>
							<h1 className="mt-10 text-3xl font-bold md:text-4xl lg:mt-20">
								{testimonial.greeting}
							</h1>
							<h1 className="text-xl font-normal md:text-2xl">
								{testimonial.name}
							</h1>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default TestimonialCard;
