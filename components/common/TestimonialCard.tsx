import Image from "next/image";

type TestimonialProps = {
	testimonial: {
		image: any;
		name: string;
		greeting: string;
		text: string;
	};
};

const TestimonialCard = ({ testimonial }: TestimonialProps) => {
	const { image, name, greeting, text } = testimonial;

	return (
		<div
			className="mt-16 w-[90%] flex-shrink-0 flex-grow-0 items-center justify-center rounded-xl p-4 text-white md:p-7 lg:mt-20 lg:flex lg:gap-20"
			style={{
				backgroundImage: `url(/assets/images/landing-page/background.png)`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<Image
				src={image}
				alt="testimonial image"
				width={400}
				height={400}
				className="w-full"
			/>
			<div className="mt-5 lg:mt-0">
				<p className="text-2xl font-extralight text-gray-200 md:text-3xl">
					{text}
				</p>
				<h1 className="mt-10 text-3xl font-bold md:text-4xl lg:mt-20">
					{greeting}
				</h1>
				<h1 className="text-xl font-normal md:text-2xl">{name}</h1>
			</div>
		</div>
	);
};

export default TestimonialCard;
