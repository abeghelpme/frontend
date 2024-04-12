import { cn } from "@/lib";
import { useDragScroll } from "@/lib/hooks";
import { testimonialImage1 } from "@/public/assets/images/landing-page";
import Image from "next/image";

const testimonials = [
	{
		image: testimonialImage1,
		name: "Jonathan Doe",
		greeting: "Thanks AHM",
		text: "I was inspired by Abeghelp.me to easily raise funds and make a difference for my cause.",
	},
	{
		image: testimonialImage1,
		name: "Sandra Doe",
		greeting: "Thanks AHM",
		text: "Abeghelp.me helped me easily raise funds and make a difference for my project.",
	},
	{
		image: testimonialImage1,
		name: "William Doe",
		greeting: "Thanks AHM",
		text: "Grateful for the ease of raising funds and making a difference with Abeghelp.me for my cause.",
	},
];

const TestimonialCard = ({ className }: { className?: string }) => {
	const { dragScrollProps, dragContainerClasses } =
		useDragScroll<HTMLDivElement>();

	return (
		<section className={cn("w-full pb-10 md:pb-0", className)}>
			<h1 className="hidden text-center text-5xl font-bold md:block md:px-20 lg:px-32">
				Hear from some of our users we&apos;ve helped reach their goals
			</h1>
			<h1 className="text-center text-4xl font-bold md:hidden px-5">
				Some of our users we&apos;ve helped reach their goals
			</h1>
			<div
				{...dragScrollProps}
				className={cn(
					dragContainerClasses,
					"w-full gap-5 pl-5 lg:flex lg:flex-row lg:items-center lg:justify-between px-4 md:px-[80px]"
				)}
			>
				{testimonials.map((testimonial, index) => (
					<div
						key={index}
						className="relative mt-16 w-[90%] shrink-0 grow-0 items-center justify-center p-4 text-white md:p-7 lg:mt-20 lg:flex lg:gap-20"
					>
						<Image
							src="/assets/images/landing-page/background.png"
							className="z-[-1] rounded-xl object-cover object-center"
							fetchPriority="high"
							priority={true}
							alt=""
							fill
						/>
						<Image
							src={testimonial.image}
							alt="testimonial image"
							draggable={false}
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
		</section>
	);
};

export default TestimonialCard;
