import { ArrowDown, Heading } from "@/components/common";
import { CampaignCardList } from "@/components/common/CampaignCard";
import { SearchIcon } from "@/components/common/svg";
import { Dropdown, Tabs } from "@/components/ui";
import { AuthenticatedUserLayout } from "@/layouts";
import { cn } from "@/lib";
import {
	arrowLeft,
	arrowRight,
} from "@/public/assets/images/campaign-category";
import { useCampaignStore } from "@/store";
import { AlignJustifyIcon, Grid3x3Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function AllCampaignsPage() {
	const campaignsFromDb = useCampaignStore((state) => state.campaigns);
	const [filter, setFilter] = useState("All");
	const [resultsPerPage, setResultsPerPage] = useState(10);

	return (
		<AuthenticatedUserLayout isDashboard>
			<Tabs.Root defaultValue="grid" className="mb-[95px] space-y-8">
				<div className="flex flex-col flex-wrap justify-between gap-6 md:flex-row md:items-center md:gap-3">
					<Heading
						as="h1"
						className="text-[32px]  font-extrabold md:text-white"
					>
						My Campaigns
					</Heading>

					<div className="flex items-center justify-between gap-8">
						<figure className="rounded-md border border-placeholder bg-white p-2">
							<SearchIcon className="size-[22px] [&_>_*]:stroke-current" />
						</figure>

						<div className="flex gap-4">
							<Tabs.List className="items-stretch bg-transparent p-0 text-sm">
								<Tabs.Trigger
									value="grid"
									className="flex items-center gap-1 rounded-l-md border-y border-l border-borderPrimary bg-white p-2 data-[state=active]:bg-abeg-primary data-[state=active]:font-extrabold data-[state=active]:text-white"
								>
									<Grid3x3Icon className="size-5 font-normal" />
									<p>Grid</p>
								</Tabs.Trigger>

								<Tabs.Trigger
									value="list"
									className="flex items-center gap-1 rounded-r-md border-y border-r p-2 data-[state=active]:bg-abeg-primary data-[state=inactive]:bg-white data-[state=active]:font-extrabold data-[state=active]:text-white"
								>
									<AlignJustifyIcon className="size-5 font-normal" />
									<p>List</p>
								</Tabs.Trigger>
							</Tabs.List>

							<Dropdown.Menu>
								<Dropdown.MenuTrigger className="flex cursor-pointer items-center gap-2 rounded-lg border border-placeholder bg-white px-3 py-2 outline-none">
									<p className="text-sm font-medium">{filter}</p>
									<ArrowDown />
								</Dropdown.MenuTrigger>

								<Dropdown.MenuContent className="border-none p-0">
									<Dropdown.MenuRadioGroup
										value={filter}
										onValueChange={setFilter}
										className="ml-auto block cursor-pointer bg-white text-sm font-medium text-abeg-text"
									>
										<Dropdown.MenuRadioItem value="All">
											All item
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Option 2">
											Option 2
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Option 3">
											Option 3
										</Dropdown.MenuRadioItem>
									</Dropdown.MenuRadioGroup>
								</Dropdown.MenuContent>
							</Dropdown.Menu>
						</div>

						<Dropdown.Menu>
							<div className="flex items-center gap-2">
								<p className="md:text-white">View</p>

								<Dropdown.MenuTrigger className="flex min-w-[70px] cursor-pointer items-center gap-2 rounded-lg border border-placeholder bg-white px-3 py-2 outline-none">
									<p className="text-sm font-medium">{resultsPerPage}</p>
									<ArrowDown />
								</Dropdown.MenuTrigger>

								<p className="md:text-white">Results Per Page</p>
							</div>

							<Dropdown.MenuContent className="border-none p-0">
								<Dropdown.MenuRadioGroup
									value={String(resultsPerPage)}
									onValueChange={(value) => setResultsPerPage(Number(value))}
									className="ml-auto block cursor-pointer bg-white text-sm font-medium text-abeg-text"
								>
									<Dropdown.MenuRadioItem value="10">10</Dropdown.MenuRadioItem>
									<Dropdown.MenuRadioItem value="20">20</Dropdown.MenuRadioItem>
									<Dropdown.MenuRadioItem value="30">30</Dropdown.MenuRadioItem>
								</Dropdown.MenuRadioGroup>
							</Dropdown.MenuContent>
						</Dropdown.Menu>
					</div>
				</div>

				<Tabs.Content value="grid">
					<CampaignCardList
						cardDetailsArray={campaignsFromDb}
						listType="grid"
					/>
				</Tabs.Content>

				<Tabs.Content value="list">
					<CampaignCardList
						cardDetailsArray={campaignsFromDb}
						listType="vertical"
					/>
				</Tabs.Content>
			</Tabs.Root>

			<section className="mt-10 flex items-center justify-center gap-5 md:mt-20">
				<button
					// onClick={handlePrevPage}
					// disabled={currentPage === 1}
					className="flex items-center gap-2 font-bold outline-none md:text-2xl"
				>
					<span>
						<Image
							src={arrowLeft}
							alt={"arrow left icon"}
							priority
							width={30}
							height={30}
						/>
					</span>
					<span> Prev</span>
				</button>

				{Array.from({ length: resultsPerPage }, (_, index) => index + 1).map(
					(pageNumber, i) => (
						<div key={i} className="flex items-center">
							{(pageNumber <= 3 || i === resultsPerPage - 1) && (
								<button
									key={pageNumber}
									// onClick={() => handlePageChange(pageNumber)}
									className={cn(
										"rounded-full px-3 py-1 font-bold md:px-4 md:text-2xl"
										// currentPage === pageNumber &&
										// 	"border border-black bg-abeg-primary text-white"
									)}
								>
									{pageNumber}
								</button>
							)}
							{pageNumber === 3 && resultsPerPage > 3 && (
								<span className="mb-2 flex items-center px-2 py-1 font-bold md:text-2xl">
									...
								</span>
							)}
						</div>
					)
				)}

				<button
					// onClick={handleNextPage}
					// disabled={currentPage === totalPages}
					className="flex items-center gap-2 bg-transparent font-bold outline-none md:text-2xl"
				>
					<span>Next</span>

					<span>
						<Image
							src={arrowRight}
							alt={"arrow right icon"}
							priority
							width={30}
							height={30}
						/>
					</span>
				</button>
			</section>
		</AuthenticatedUserLayout>
	);
}

export default AllCampaignsPage;
