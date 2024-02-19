import { ArrowDown, ReceiveIcon } from "@/components/common";
import { Button } from "@/components/ui";
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
		<div className="flex h-[180px]  w-full flex-col justify-center gap-3 rounded-xl border-CampaignCardBorderWidth border-placeholder bg-white p-4 text-sm text-abeg-text text-opacity-80 md:text-base lg:gap-4">
			<div className="relative flex items-center justify-center gap-4">
				<ReceiveIcon />
				<p className="flex-1">Total {title}</p>
				<DropdownMenu>
					<DropdownMenuTrigger
						asChild
						className="flex gap-2 border-CampaignCardBorderWidth border-abeg-text border-opacity-50 outline-none"
					>
						<Button
							className="flex items-center justify-center gap-2 text-abeg-text text-opacity-80"
							size="sm"
							variant="secondary"
						>
							<p className="text-sm  text-opacity-80 md:text-base">{item}</p>
							<ArrowDown />
						</Button>
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
			<div className="mt-6 flex flex-col gap-2">
				<p className="text-2xl md:text-[32px]">{amount}</p>
				<p>{analytics}</p>
			</div>
		</div>
	);
};

export default Card;
