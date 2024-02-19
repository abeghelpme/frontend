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
		<div className="text-[#484848] text-sm  md:text-base flex flex-col justify-center gap-3 lg:gap-4 p-4 w-full border-[0.3px] border-[#8D8B8B] rounded-xl h-[180px] text-opacity-80 bg-white">
			<div className="flex relative gap-4 justify-center items-center">
				<ReceiveIcon />
				<p className="flex-1">Total {title}</p>
				<DropdownMenu>
					<DropdownMenuTrigger
						asChild
						className="border-[0.3px] border-[#484848] outline-none flex gap-2"
					>
						<Button
							className="flex justify-center items-center gap-2 text-[#484848] text-opacity-80"
							size="sm"
							variant="secondary"
						>
							<p className="text-sm  md:text-base text-opacity-80">{item}</p>
							<ArrowDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="bg-white p-0 border-0 text-sm  md:text-base ">
						<DropdownMenuRadioGroup
							value={item}
							onValueChange={setItem}
							className="bg-white cursor-pointer text-[#484848]"
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
			<div className="flex flex-col gap-2 mt-6">
				<p className="text-2xl md:text-[32px]">{amount}</p>
				<p>{analytics}</p>
			</div>
		</div>
	);
};

export default Card;
