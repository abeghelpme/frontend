import { ArrowDown, Heading } from "@/components/common";
import { CampaignCardList } from "@/components/common/CampaignCard";
import { Dropdown, Select, Tabs } from "@/components/ui";
import { AuthenticatedUserLayout } from "@/layouts";
import { useCampaignStore } from "@/store";
import { AlignJustifyIcon, Grid3x3Icon } from "lucide-react";

function AllCampaignsPage() {
	const campaignsFromDb = useCampaignStore((state) => state.campaigns);

	return (
		<AuthenticatedUserLayout isDashboard>
			<Tabs.Root defaultValue="grid" className="mb-[95px] space-y-8">
				<div className="flex flex-col justify-between max-md:gap-6 md:flex-row md:items-center">
					<Heading as="h2" className="text-[32px] font-[800] text-white">
						My Campaigns
					</Heading>

					<div className="flex justify-between gap-2">
						<Tabs.List className="items-stretch p-0 text-sm">
							<Tabs.Trigger
								value="grid"
								className="flex items-center gap-1 rounded-l-md border border-borderPrimary bg-white p-2 data-[state=active]:border-abeg-primary data-[state=active]:bg-abeg-primary data-[state=active]:font-extrabold data-[state=active]:text-white"
							>
								<Grid3x3Icon className="size-5 font-normal" />

								<p>Grid</p>
							</Tabs.Trigger>

							<Tabs.Trigger
								value="list"
								className="flex items-center gap-1 rounded-r-md border p-2 data-[state=active]:border-abeg-primary data-[state=active]:bg-abeg-primary data-[state=inactive]:bg-white data-[state=active]:font-extrabold data-[state=active]:text-white"
							>
								<AlignJustifyIcon className="size-5 font-normal" />

								<p>List</p>
							</Tabs.Trigger>
						</Tabs.List>

						{/* <Select.Root defaultValue="All">
							<Select.Trigger
								icon={<ArrowDown />}
								className="gap-2 rounded-[8px] border-placeholder bg-white px-3 text-sm py-2 font-medium"
							>
								<Select.Value />
							</Select.Trigger>

							<Select.Content>
								<Select.Item value="All" className="lg:text-base">
									All
								</Select.Item>
							</Select.Content>
						</Select.Root> */}

						<Dropdown.Menu>
							<Dropdown.MenuTrigger>
								All
								<ArrowDown />
							</Dropdown.MenuTrigger>
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
		</AuthenticatedUserLayout>
	);
}

export default AllCampaignsPage;
