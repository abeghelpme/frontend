import { Button } from "@/components/ui";
import type { Campaign } from "@/interfaces/Campaign";
import { cn } from "@/lib";
import Link from "next/link";
import { CampaignCardList } from "../CampaignCard";
import Heading from "../Heading";

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
				<div className="space-y-2.5">
					<Heading as="h3" className="text-xl font-normal">
						Donate Today
					</Heading>

					<Heading as="h3" className="text-[40px] lg:text-5xl">
						Urgent Fundraiser
					</Heading>

					<p className="text-pretty text-xl lg:text-2xl">
						Join our community of change makers and make an impact today
					</p>
				</div>
				<Button
					className="mt-4 flex max-w-[185px] shrink-0 justify-center border border-placeholder text-base font-extrabold text-placeholder"
					asChild
				>
					<Link href="/explore/all-categories">Explore campaigns</Link>
				</Button>
			</div>

			<CampaignCardList
				listType="horizontal"
				cardDetailsArray={featuredCampaigns}
				classNames={{ base: "mt-10 lg:mt-14 pl-5 md:pl-[80px]" }}
			/>
		</section>
	);
}

export default UrgentFundraisers;
