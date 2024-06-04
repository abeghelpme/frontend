import { ArrowDown, CampaignIcon, Heading, Pagination } from "@/components/common";
import { CampaignCardList } from "@/components/common/CampaignCard";
import {
	ClosedIcon,
	DraftsIcon,
	PendingStarIcon,
	SearchIcon,
	SlashedStarIcon,
	StarIcon,
	VerifiedIcon,
} from "@/components/common/svg";
import { Dropdown, Tabs } from "@/components/ui";
import type { Campaign } from "@/interfaces/Campaign";
import { AuthenticatedUserLayout } from "@/layouts";
import { usePagination } from "@/lib/hooks/usePagination";
import { useCampaignStore } from "@/store";
import { AlignJustifyIcon, Grid3x3Icon } from "lucide-react";
import { useState } from "react";

export const STATUS_FILTER_LOOKUP = (campaign: Campaign[]) => ({
	All: campaign,
	Approved: campaign.filter((c) => c.status === "Approved"),
	Pending: campaign.filter((c) => c.status === "In Review"),
	Rejected: campaign.filter((c) => c.status === "Rejected"),
	Drafts: campaign.filter((c) => c.status === "Draft"),
	Closed: campaign.filter((c) => c.status === ("Closed" as Campaign["status"])),
	Published: campaign.filter((c) => c.isPublished),
});

function AllCampaignsPage() {
	const [statusFilter, setStatusFilter] =
		useState<keyof ReturnType<typeof STATUS_FILTER_LOOKUP>>("All");
	const [resultsPerPage, setResultsPerPage] = useState(10);
	const allUserCampaigns = useCampaignStore((state) => state.allUserCampaigns);
	const {
		data: paginatedCampaigns,
		totalPageCount,
		handlePageChange,
		currentPage,
	} = usePagination(allUserCampaigns, { limit: resultsPerPage });

	const filteredCampaigns = STATUS_FILTER_LOOKUP(paginatedCampaigns)[statusFilter];

	return (
		<Tabs.Root defaultValue="grid" className="flex flex-col gap-8 pb-[90px]">
			<div className="flex flex-col flex-wrap justify-between gap-3 max-md:gap-6 md:flex-row md:items-center">
				<Heading as="h1" className="text-[32px] font-extrabold md:text-white">
					My Campaigns
				</Heading>

				<div className="flex flex-wrap items-center justify-between gap-4 md:gap-8">
					<div className="flex gap-2 md:gap-8">
						<form className="flex items-center gap-[6px] rounded-md border border-placeholder bg-white p-2 focus-visible:ring-2 focus-visible:ring-placeholder">
							<SearchIcon className="size-[22px] md:static [&>*]:stroke-current" />

							<input type="search" className="w-[118px] text-sm outline-none md:hidden" />
						</form>

						<div className="flex items-center gap-4">
							<Tabs.List className="bg-transparent p-0 text-sm">
								<Tabs.Trigger
									value="grid"
									className="flex items-center gap-1 rounded-l-md border-y border-l border-borderPrimary bg-white p-2 data-[state=active]:bg-abeg-primary data-[state=active]:font-extrabold data-[state=active]:text-white"
								>
									<Grid3x3Icon className="size-5 font-normal" />
									<p>Grid</p>
								</Tabs.Trigger>

								<Tabs.Trigger
									value="list"
									className="flex items-center gap-1 rounded-r-md border-y border-r border-borderPrimary p-2 data-[state=active]:bg-abeg-primary data-[state=inactive]:bg-white data-[state=active]:font-extrabold data-[state=active]:text-white"
								>
									<AlignJustifyIcon className="size-5 font-normal" />
									<p>List</p>
								</Tabs.Trigger>
							</Tabs.List>

							<Dropdown.Menu>
								<Dropdown.MenuTrigger className="flex cursor-pointer items-center gap-2 rounded-lg border border-placeholder bg-white px-3 py-2 outline-none">
									<p className="text-sm font-medium">{statusFilter}</p>
									<ArrowDown />
								</Dropdown.MenuTrigger>

								<Dropdown.MenuSeparator />
								<Dropdown.MenuContent className="rounded-xl border-none p-0" align="start">
									<Dropdown.MenuRadioGroup
										value={statusFilter}
										onValueChange={(value) =>
											setStatusFilter(value as keyof typeof STATUS_FILTER_LOOKUP)
										}
										className="cursor-pointer bg-white p-2 text-sm font-medium text-abeg-text"
									>
										<Dropdown.MenuRadioItem value="All" className="gap-2 px-0">
											<CampaignIcon className="size-5 [&>*]:stroke-abeg-text" />
											All Campaigns
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Approved" className="gap-2 px-0">
											<StarIcon className="size-5" />
											Approved
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Rejected" className="gap-2 px-0">
											<SlashedStarIcon className="size-5" />
											Rejected
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Pending" className="gap-2 px-0">
											<PendingStarIcon className="size-5" />
											Pending
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Published" className="gap-2 px-0">
											<VerifiedIcon className="size-5 [&>*]:stroke-abeg-text" />
											Published
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Drafts" className="gap-2 px-0">
											<DraftsIcon className="size-5" />
											Drafts
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Closed" className="gap-2 px-0">
											<ClosedIcon className="size-5" />
											Closed
										</Dropdown.MenuRadioItem>
									</Dropdown.MenuRadioGroup>
								</Dropdown.MenuContent>
							</Dropdown.Menu>
						</div>
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

						<Dropdown.MenuContent className="border-none p-0" align="start">
							<Dropdown.MenuRadioGroup
								value={String(resultsPerPage)}
								onValueChange={(value) => setResultsPerPage(Number(value))}
								className="ml-auto block cursor-pointer bg-white text-sm font-medium text-abeg-text"
							>
								<Dropdown.MenuRadioItem value="10">10</Dropdown.MenuRadioItem>
								<Dropdown.MenuRadioItem value="15">15</Dropdown.MenuRadioItem>
								<Dropdown.MenuRadioItem value="20">20</Dropdown.MenuRadioItem>
								<Dropdown.MenuRadioItem value="25">25</Dropdown.MenuRadioItem>
								<Dropdown.MenuRadioItem value="30">30</Dropdown.MenuRadioItem>
							</Dropdown.MenuRadioGroup>
						</Dropdown.MenuContent>
					</Dropdown.Menu>
				</div>
			</div>

			<Tabs.Content value="grid">
				<CampaignCardList
					cardDetailsArray={filteredCampaigns}
					listType="grid"
					withStatusCaption={true}
				/>
			</Tabs.Content>

			<Tabs.Content value="list">
				<CampaignCardList
					cardDetailsArray={filteredCampaigns}
					listType="vertical"
					withStatusCaption={true}
				/>
			</Tabs.Content>

			<Pagination
				onPageChange={handlePageChange}
				currentPage={currentPage}
				totalPageCount={totalPageCount}
			/>
		</Tabs.Root>
	);
}

export default AllCampaignsPage;
AllCampaignsPage.getLayout = (page: React.ReactElement) => (
	<AuthenticatedUserLayout isDashboard>{page}</AuthenticatedUserLayout>
);

AllCampaignsPage.protect = true;
