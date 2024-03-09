import { ArrowDown, ReceiveIcon } from "@/components/common";
// import { Button } from "@/components/ui";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui";
import { useState } from "react";

type CardProps = { title: string; amount?: string; analytics?: string };
const Card = ({ title, amount = "0", analytics = "+ 0%" }: CardProps) => {
	const [item, setItem] = useState("All item");

	return (
		<div className="flex w-full flex-col justify-center gap-4 rounded-xl border-CampaignCardBorderWidth border-placeholder bg-white p-4 text-sm md:text-base text-abeg-text text-opacity-80 lg:gap-8">
			<div className="relative flex items-center justify-center gap-2">
				<ReceiveIcon />
				<p className="flex-1 text-sm md:text-base">Total {title}</p>
				<DropdownMenu>
					<DropdownMenuTrigger
						asChild
						className="flex gap-2 border-CampaignCardBorderWidth border-abeg-text border-opacity-50 outline-none"
					>
						<div
							className="flex items-center justify-center gap-2 rounded-lg border-CampaignCardBorderWidth border-abeg-text p-2 text-sm text-abeg-text hover:cursor-pointer"
							// size='sm'
							// variant='secondary'
						>
							<p className="text-sm text-opacity-80">{item}</p>
							<ArrowDown />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="border-0 bg-white p-0 text-sm  md:text-base ">
						<DropdownMenuRadioGroup
							value={item}
							onValueChange={setItem}
							className="cursor-pointer bg-white text-abeg-text"
						>
							<DropdownMenuRadioItem value="All item">
								All item
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="Option 2">
								Option 2
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="Option 3">
								Option 3
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className=" flex flex-col gap-2">
				<p className="text-2xl md:text-3xl">{amount}</p>
				<p className="text-sm md:text-base">{analytics}</p>
			</div>
		</div>
	);
};

export default Card;
