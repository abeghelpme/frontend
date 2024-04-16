import { Button } from "@/components/ui";
import type { Campaign } from "@/interfaces/Campaign";
import { cn } from "@/lib";
import Link from "next/link";
import { CampaignCardList } from "../CampaignCard";
import Heading from "../Heading";
import { ArrowUpRight } from "../svg";

type UrgentFundraiserProps = {
	featuredCampaigns: Campaign[];
	className?: string;
};

function UrgentFundraisers(props: UrgentFundraiserProps) {
	const { featuredCampaigns, className } = props;

	if (featuredCampaigns.length === 0) {
		return null;
	}

	return (
		<section className={cn("w-full", className)}>
			<div className="px-5 md:px-[80px] lg:flex lg:flex-row lg:items-center lg:justify-between">
				<div className="flex gap-3 items-center">
					<div className="w-2 bg-abeg-primary rounded-md h-20"></div>
					<div className="flex flex-col gap-2">
						<p className="text-xl">Donate today</p>
						<h3 className="text-2xl md:text-3xl font-bold">
							Urgent fundraiser
						</h3>
					</div>
				</div>
				{/* <div className='space-y-2.5'>
          <Heading as='h3' className='text-xl font-normal'>
            Donate Today
          </Heading>

          <Heading as='h3' className='text-[40px] lg:text-5xl'>
            Urgent Fundraiser
          </Heading>

          <p className='text-pretty text-xl lg:text-2xl'>
            Join our community of change makers and make an impact today
          </p>
        </div> */}
			</div>

			<CampaignCardList
				listType="horizontal"
				cardDetailsArray={featuredCampaigns}
				classNames={{ base: "mt-10 lg:mt-14 pl-5 md:pl-[80px]" }}
			/>
			<div className="px-5 md:px-[80px] pt-5">
				<Button
					className="mt-4 flex max-w-[210px] shrink-0 justify-center border border-abeg-primary text-base text-abeg-primary whitespace-nowrap"
					asChild
				>
					<Link href="/explore" className="flex gap-2">
						<span>Explore campaigns</span>
						<div className="inline-block text-abeg-primary">
							<ArrowUpRight fill="#008080" />
						</div>
					</Link>
				</Button>
			</div>
		</section>
	);
}

export default UrgentFundraisers;
