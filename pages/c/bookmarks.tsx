import { ArrowDown, Heading } from "@/components/common";
import { CampaignCardList } from "@/components/common/CampaignCard";
import { SearchIcon } from "@/components/common/svg";
import { Dropdown, Tabs } from "@/components/ui";
import { AuthenticatedUserLayout } from "@/layouts";
import { usePaginate } from "@/lib/hooks";
import { useCampaignStore } from "@/store";
import { AlignJustifyIcon, Grid3x3Icon } from "lucide-react";
import { useState } from "react";

function BookmarksPage() {
	const campaignsFromDb = useCampaignStore((state) => state.campaigns);
	const [filter, setFilter] = useState("All");
	const [resultsPerPage, setResultsPerPage] = useState(10);
	const {
		data: { data: paginatedCampaigns },
	} = usePaginate(campaignsFromDb, { limit: resultsPerPage });

	return (
		<Tabs.Root defaultValue="grid" className="mb-[95px] space-y-8">
			<div className="flex flex-col flex-wrap justify-between gap-3 max-md:gap-6 md:flex-row md:items-center">
				<Heading as="h1" className="text-[32px]  font-extrabold md:text-white">
					Saved Campaigns
				</Heading>

				<div className="flex flex-wrap items-center justify-between gap-4 md:gap-8">
					<div className="flex gap-2 md:gap-8">
						<form className="flex items-center rounded-md border border-placeholder bg-white p-2 [--icon-size:22px] focus-visible:ring-2 focus-visible:ring-placeholder max-md:relative">
							<SearchIcon className="absolute size-[--icon-size] md:static [&>*]:stroke-current" />

							<input
								type="search"
								className="ml-[--icon-size] w-[118px] pl-1 text-sm outline-none md:hidden"
							/>
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
									<p className="text-sm font-medium">{filter}</p>
									<ArrowDown />
								</Dropdown.MenuTrigger>

								<Dropdown.MenuContent
									className="rounded-xl border-none p-0"
									align="start"
								>
									<Dropdown.MenuRadioGroup
										value={filter}
										onValueChange={setFilter}
										className="cursor-pointer bg-white p-2 text-sm font-medium text-abeg-text"
									>
										<Dropdown.MenuRadioItem value="All">
											All Campaigns
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Approved">
											Approved
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Rejected">
											Rejected
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Pending">
											Pending
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Published">
											Published
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Drafts">
											Drafts
										</Dropdown.MenuRadioItem>
										<Dropdown.MenuRadioItem value="Closed">
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
								<Dropdown.MenuRadioItem value="20">20</Dropdown.MenuRadioItem>
								<Dropdown.MenuRadioItem value="30">30</Dropdown.MenuRadioItem>
							</Dropdown.MenuRadioGroup>
						</Dropdown.MenuContent>
					</Dropdown.Menu>
				</div>
			</div>

			<Tabs.Content value="grid">
				<CampaignCardList
					cardDetailsArray={paginatedCampaigns}
					listType="grid"
				/>
			</Tabs.Content>

			<Tabs.Content value="list">
				<CampaignCardList
					cardDetailsArray={paginatedCampaigns}
					listType="vertical"
				/>
			</Tabs.Content>
		</Tabs.Root>
	);
}

export default BookmarksPage;
BookmarksPage.getLayout = (page: React.ReactElement) => (
	<AuthenticatedUserLayout isDashboard>{page}</AuthenticatedUserLayout>
);

BookmarksPage.protect = true;
