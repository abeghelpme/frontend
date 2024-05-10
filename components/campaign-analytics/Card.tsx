import { ReceiveIcon } from "@/components/common";
// import { Button } from "@/components/ui";
import { useState } from "react";

type CardProps = { title: string; amount?: string; analytics?: string };
const Card = ({ title, amount = "0", analytics = "+ 0%" }: CardProps) => {
	const [item, setItem] = useState("All item");

	return (
		<div className="flex w-full flex-col justify-center gap-4 rounded-xl border-CampaignCardBorderWidth border-placeholder bg-white p-4 text-sm md:text-base text-abeg-text text-opacity-80 lg:gap-8">
			<div className="relative flex items-center justify-center gap-2">
				<ReceiveIcon />
				<p className="flex-1 text-sm md:text-base">Total {title}</p>
			</div>
			<div className=" flex flex-col gap-2">
				<p className="text-2xl md:text-3xl">{amount}</p>
				<p className="text-sm md:text-base">{analytics}</p>
			</div>
		</div>
	);
};

export default Card;
