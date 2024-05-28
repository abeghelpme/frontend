import { DonationChart } from "@/components/campaign-analytics";
import { useState } from "react";

const DonationStatsPanel = () => {
	const [item, setItem] = useState("Last 9 months");
	return (
		<section className="bg-white p-5 shadow-analyticsShadow">
			{/* <section className="flex flex-col gap-4 rounded-xl  border-CampaignCardBorderWidth border-placeholder bg-white px-4 py-8  text-sm text-abeg-text text-opacity-80 md:gap-8 md:p-8 md:text-base"> */}
			{/* <div className="flex items-center  justify-between border-b-CampaignCardBorderWidth border-b-placeholder border-opacity-80 pb-4">
				<p className="text-lg font-semibold">Average Donations</p>
				<DropdownMenu>
					<DropdownMenuTrigger
						asChild
						className="flex gap-2 border-CampaignCardBorderWidth border-abeg-text border-opacity-50 outline-none"
					>
						<div
							className="flex items-center justify-center gap-2 rounded-lg border-CampaignCardBorderWidth border-abeg-text p-2 text-sm text-abeg-text hover:cursor-pointer"
							//   size='sm'
							//   variant='secondary'
						>
							<p className="text-sm font-semibold">{item}</p>
							<ArrowDown />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="border-0 bg-white p-0 text-sm  md:text-base ">
						<DropdownMenuRadioGroup
							value={item}
							onValueChange={setItem}
							className="cursor-pointer bg-white text-abeg-text"
						>
							<DropdownMenuRadioItem value="3 months">3 months</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="30 days">30 days</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="1 week">1 week</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div> */}

			<DonationChart />
		</section>
	);
};
export default DonationStatsPanel;
