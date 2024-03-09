import { AbegHelpLogoWhite, FilterIcon } from "@/components/common";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import { useState } from "react";

const donators = [
	{
		name: "Example Charity Org.",
		email: "Staff@charity.org",
		type: "Corporate Donation",
		date: "Oct 20, 2022",
		time: "01:32 PM",
		amount: "300.00",
	},
	{
		name: "Example Charity Org.",
		email: "Staff@charity.org",
		type: "Corporate Donation",
		date: "Oct 20, 2022",
		time: "01:32 PM",
		amount: "300.00",
	},
	{
		name: "Example Charity Org.",
		email: "Staff@charity.org",
		type: "Corporate Donation",
		date: "Oct 20, 2022",
		time: "01:32 PM",
		amount: "300.00",
	},
	{
		name: "Example Charity Org.",
		email: "Staff@charity.org",
		type: "Corporate Donation",
		date: "Oct 20, 2022",
		time: "01:32 PM",
		amount: "300.00",
	},
	{
		name: "Example Charity Org.",
		email: "Staff@charity.org",
		type: "Corporate Donation",
		date: "Oct 20, 2022",
		time: "01:32 PM",
		amount: "300.00",
	},
	{
		name: "Example Charity Org.",
		email: "Staff@charity.org",
		type: "Corporate Donation",
		date: "Oct 20, 2022",
		time: "01:32 PM",
		amount: "300.00",
	},
	{
		name: "Example Charity Org.",
		email: "Staff@charity.org",
		type: "Corporate Donation",
		date: "Oct 20, 2022",
		time: "01:32 PM",
		amount: "300.00",
	},
	{
		name: "Example Charity Org.",
		email: "Staff@charity.org",
		type: "Corporate Donation",
		date: "Oct 20, 2022",
		time: "01:32 PM",
		amount: "300.00",
	},
];

const DonationTable = () => {
	const [item, setItem] = useState("");

	return (
		<div className="hidden flex-1 md:flex flex-col gap-4 rounded-xl border-CampaignCardBorderWidth border-placeholder bg-white px-4 py-6 text-sm text-abeg-text md:p-6 md:text-base">
			<div className="flex items-center">
				<p className="flex-1 text-lg font-semibold">Donor Count</p>
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
							<FilterIcon />
							<p className="text-sm font-semibold">Filter</p>
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
			<div className="max-h-96 overflow-auto scrollbar-hide text-sm font-semibold">
				<Table>
					<TableHeader className="border-t-[0.3px] border-placeholder border-opacity-50">
						<TableRow className="text-base text-abeg-text font-medium ">
							<TableHead>Name</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{donators.map((donator, id) => (
							<TableRow key={id} className="font-semibold text-sm h-24">
								<TableCell className="flex gap-2 items-center h-24">
									<AbegHelpLogoWhite />
									<div className="flex flex-col gap-2">
										<p>{donator.name}</p>
										<p className="font-normal text-xs">{donator.email}</p>
									</div>
								</TableCell>
								<TableCell>{donator.type}</TableCell>
								<TableCell>
									<p>{donator.date}</p>
									<p className="font-normal text-xs">{donator.time}</p>
								</TableCell>
								<TableCell className="text-">${donator.amount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
export default DonationTable;
