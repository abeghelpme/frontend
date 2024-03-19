import type { Campaign } from "@/interfaces/Campaign";
import { DonorIcon, DonorIcon2 } from "@/public/assets/icons/campaign";
import { ArrowBigRightIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { ClockIcon, LocationIcon } from "../common";
import { Carousel } from "../ui/carousel";

type CampaignCarouselProps = {
	images: Campaign["images"];
	classNames?: {
		base?: string;
	};
};

const CampaignCarousel = (props: CampaignCarouselProps) => {
	const { images, classNames } = props;

	return (
		<Carousel.Root images={images}>
			<Carousel.Content
				classNames={{
					base: classNames?.base,
					scrollContainer: "rounded-[5px]",
				}}
			>
				<Carousel.Button
					type="prev"
					icon={<ArrowLeftIcon className="size-3" />}
					classNames={{
						iconContainer:
							"size-[25px] bg-abeg-text/40 left-[18px] flex justify-center items-center border border-white backdrop-blur-md rounded-full",
					}}
				/>

				<Carousel.Button
					type="next"
					icon={<ArrowRightIcon className="size-3" />}
					classNames={{
						iconContainer:
							"size-[25px] flex bg-abeg-text/40 right-[18px] justify-center items-center border border-white backdrop-blur-md rounded-full",
					}}
				/>

				<Carousel.Caption
					as="figure"
					className="left-[18px] top-[25px] flex items-center gap-1 rounded-md bg-abeg-text/30 p-[6px] text-[11px] backdrop-blur-md"
				>
					<LocationIcon />
					<figcaption>Lagos, Nigeria</figcaption>
				</Carousel.Caption>

				<Carousel.ItemWrapper<typeof images>
					render={(image) => (
						<Carousel.Item key={image.secureUrl}>
							<Image
								src={image.secureUrl}
								blurDataURL={image.blurHash}
								alt="campaign image"
								className="aspect-[381/250] w-full object-cover"
								width={381}
								height={250}
								priority={true}
								draggable={false}
								fetchPriority="high"
							/>
						</Carousel.Item>
					)}
				/>

				<Carousel.Caption
					as="figure"
					className="bottom-[20px] right-[18px] flex items-center gap-1 rounded-md bg-abeg-text/30 p-[6px] text-[11px] backdrop-blur-md"
				>
					<ClockIcon />
					<figcaption>20 days left</figcaption>
				</Carousel.Caption>

				<Carousel.Caption
					as="figure"
					className="bottom-[20px] left-[18px] flex items-center gap-1 rounded-md bg-abeg-text/30 p-[6px] text-[11px] backdrop-blur-md"
				>
					<DonorIcon2 className="size-4" />
					<figcaption> 235,567 total donors</figcaption>
				</Carousel.Caption>
			</Carousel.Content>
		</Carousel.Root>
	);
};

export default CampaignCarousel;
