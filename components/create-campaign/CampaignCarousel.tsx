import type { Campaign } from "@/interfaces/Campaign";
import Image from "next/image";
import { Carousel } from "../ui/carousel";

type CampaignCarouselProps = {
	images: Campaign["images"];
};

const CampaignCarousel = (props: CampaignCarouselProps) => {
	const { images } = props;

	return (
		<Carousel.Root images={images}>
			<Carousel.Content classNames={{ scrollContainer: "rounded-lg lg:rounded-[10px]" }}>
				<Carousel.Button
					type="prev"
					classNames={{
						iconContainer: "top-[calc(100%_+_8px)] lg:top-[calc(100%_+_16px)] left-[24px]",
						icon: "size-5 lg:size-6",
					}}
				/>

				<Carousel.Button
					type="next"
					classNames={{
						iconContainer: "top-[calc(100%_+_8px)] lg:top-[calc(100%_+_16px)] right-[24px]",
						icon: "size-5 lg:size-6",
					}}
				/>

				<Carousel.ItemWrapper<typeof images>
					render={(image) => (
						<Carousel.Item key={image.secureUrl}>
							<Image
								src={image.secureUrl}
								blurDataURL={image.blurHash}
								alt="campaign image"
								className="aspect-[342/200] w-full rounded-lg object-cover lg:h-[400px] lg:max-w-[717px] lg:rounded-[10px]"
								width={342}
								height={200}
								priority={true}
								fetchPriority="high"
							/>
						</Carousel.Item>
					)}
				/>

				<Carousel.IndicatorWrapper<typeof images>
					classNames={{
						base: "top-[calc(100%_+_16px)] lg:top-[calc(100%_+_23px)]",
						indicatorContainer: "gap-2 overflow-x-hidden",
					}}
					render={(image, index) => (
						<Carousel.Indicator
							key={image.secureUrl}
							currentIndex={index}
							classNames={{
								base: "bg-lightGreen snap-start h-[6px] lg:h-[10px] w-[23px] rounded-[101px]",
								onActive: "bg-abeg-primary w-[40px]",
							}}
						/>
					)}
				/>
			</Carousel.Content>
		</Carousel.Root>
	);
};

export default CampaignCarousel;
