import SingleTopDonor from "./SingleTopDonor";

const dummyData = [
	{
		name: "Example Charity Org.",
		type: "Corporate Donor",
		donated: 30,
	},
	{
		name: "Example Charity Org.",
		type: "Corporate Donor",
		donated: 378,
	},
	{
		name: "Example Charity Org.",
		type: "Corporate Donor",
		donated: 307,
		target: 1000,
	},
	{
		name: "Example Charity Org.",
		type: "Corporate Donor",
		donated: 450,
	},
	{
		name: "Example Charity Org.",
		type: "Corporate Donor",
		donated: 30,
	},
	{
		name: "Example Charity Org.",
		type: "Corporate Donor",
		donated: 700,
	},
];
const TopDonators = () => {
	return (
		<div className="flex flex-col gap-6 rounded-xl border-CampaignCardBorderWidth border-placeholder bg-white text-abeg-text px-4 py-6 text-sm md:p-6 md:text-base lg:w-[419px]">
			<p className="border-b-CampaignCardBorderWidth border-b-placeholder border-opacity-80 pb-4 text-lg font-semibold">
				Top Donors
			</p>
			<div className="flex flex-col gap-6 max-h-96 overflow-auto">
				{dummyData.map((data, id) => {
					return (
						<SingleTopDonor
							key={id}
							name={`${data.name} ${id + 1}`}
							type={data.type}
							target={1000}
							donated={data.donated}
						/>
					);
				})}
			</div>
		</div>
	);
};
export default TopDonators;
