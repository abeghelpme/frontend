import SingleCountryDonor from "./SingleCountryDonor";
import WorldMap from "./WorldMap";

const MapDisplay = () => {
	return (
		<section className="flex flex-col gap-4 rounded-xl border-CampaignCardBorderWidth border-placeholder bg-white px-4 py-8 text-sm text-abeg-text text-opacity-80 md:gap-8 md:p-8 md:text-base">
			<div className="flex items-center justify-between border-b-CampaignCardBorderWidth border-b-placeholder border-opacity-80 pb-4">
				<p className="text-lg font-semibold">Total donors so far</p>
				<p className="rounded-lg border-CampaignCardBorderWidth border-abeg-text p-2 text-sm text-abeg-text">
					Real time report
				</p>
			</div>
			<div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
				<WorldMap countries={["Nigeria", "Mali", "Ghana"]} />
				<div className="flex flex-1 flex-col gap-3">
					<p className="text-2xl font-semibold md:text-4xl">10.8K</p>
					<div className="scrollbar-hide flex max-h-96 flex-col gap-2 overflow-auto pr-4">
						<SingleCountryDonor countryName="Nigeria" progress={70} />
						<SingleCountryDonor countryName="Ghana" progress={49} />
						<SingleCountryDonor countryName="Liberia" progress={30} />
						<SingleCountryDonor countryName="Cameroon" progress={17} />
						<SingleCountryDonor countryName="Gambia" progress={7} />
						<SingleCountryDonor countryName="Mali" progress={33} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default MapDisplay;
