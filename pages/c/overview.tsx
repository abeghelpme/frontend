import { DonationStatsPanel } from "@/components/campaign-analytics";
import MapDisplay from "@/components/campaign-analytics/MapDisplay";
import {
	ArrowDown,
	BankIcon,
	ClockIcon,
	EyeIcon,
	LocationIcon,
} from "@/components/common";
import {
	Button,
	Card,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
	ProgressBar,
} from "@/components/ui";
import { AuthenticatedUserLayout } from "@/layouts";
import userImage from "@/public/assets/icons/dashboard/userIcon.svg";
import dashboardImage from "@/public/assets/images/dashboard/dashboardImage.png";
import { useCampaignStore } from "@/store";
import Error from "next/error";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const donorData = {
	image: userImage as string,
	name: "Jane Doe",
	email: "Janedoe12@gmail.com",
	time: "4 mins",
	amount: "+300,000",
};

const donorDataList = Array<typeof donorData>(6).fill(donorData);

const Overview = () => {
	const searchParams = useSearchParams();
	const currentCampaign = useCampaignStore((state) =>
		state.campaigns.find((campaign) => campaign._id === searchParams.get("id"))
	);

	if (!currentCampaign) {
		return <Error statusCode={404} />;
	}

	return (
		<AuthenticatedUserLayout isDashboard>
			<section className="">
				<div className="flex flex-col justify-between gap-8 md:m-0 lg:flex-row">
					<div className="flex-1 space-y-4 lg:w-3/5 lg:space-y-5">
						<h1 className="mb-4 text-lg font-bold md:hidden">
							Bringing Dental Care to Undeserved Communities
						</h1>
						<div className="relative text-white lg:!m-0">
							<Image
								src={dashboardImage}
								alt="Dashboard Image"
								className="w-full rounded-md"
							/>
							<div className="absolute left-4 top-4 flex items-center space-x-1 rounded-md p-2 text-xs backdrop-blur-md sm:text-sm">
								<LocationIcon />
								<span className="">Lagos, Nigeria</span>
							</div>
							<div className="absolute bottom-4 right-4 flex items-center space-x-1 rounded-md p-2 text-xs backdrop-blur-md sm:text-sm">
								<ClockIcon />
								<span className="">20 days left</span>
							</div>
						</div>
						<div className="space-y-4 md:space-y-5">
							<h1 className="hidden text-2xl font-bold md:block ">
								{currentCampaign.title}
							</h1>
							<div className="flex flex-col justify-between gap-4 md:flex-row md:gap-6">
								<div className="flex-1 space-y-4 text-sm">
									<div className="flex items-center justify-between gap-7">
										<span>&#x20A6; 2,000,000</span>
										<span>&#x20A6; 1,000,000 remaining</span>
									</div>
									<ProgressBar value={50} />
									<div className="flex items-center justify-between gap-7">
										<span className="">235,567 total donors</span>
										<span className="">235,567 comments</span>
									</div>
								</div>
								<div className="flex justify-between gap-4 text-sm md:w-fit md:flex-col">
									<Button
										variant="secondary"
										className="flex items-center gap-2"
									>
										<BankIcon />
										<span className="">Set up account</span>
									</Button>
									<Button variant="primary">
										<Link
											href={{
												pathname: "/c/preview",
												query: { id: currentCampaign._id },
											}}
											className="flex items-center gap-2"
										>
											<EyeIcon />
											<span className="">View campaign</span>
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div className="rounded-lg border-[0.5px] border-placeholder bg-white p-4 lg:w-[45%] lg:max-w-[450px]">
						<div className="mb-8 flex items-center justify-between">
							<h2 className="text-2xl font-bold">Donors list</h2>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div className="flex cursor-pointer items-center gap-2 rounded-lg border border-placeholder px-3 py-2 md:gap-0">
										<span
											className="flex cursor-pointer items-center gap-2 text-sm font-medium"
											aria-hidden
										>
											Latest
											<ArrowDown />
										</span>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56" align="end" forceMount>
									<DropdownMenuGroup>
										<DropdownMenuItem className="py-2">7 days</DropdownMenuItem>
										<DropdownMenuItem className="py-2">
											14 days
										</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div className="space-y-6">
							{donorDataList.map((user, index) => (
								<div
									key={index}
									className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-7"
								>
									<div className="flex items-center gap-2">
										<Image
											src={user.image}
											alt="User Image"
											width={30}
											height={30}
										/>
										<div className="xl: flex flex-col">
											<span className="font-medium">{user.name}</span>
											<span className="text-sm">{user.email}</span>
										</div>
									</div>
									<div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:gap-0">
										<div className="ml-10 flex items-center gap-2">
											<span className="text-sm">sent</span>
											<span className="font-semibold">{user.amount}</span>
										</div>
										<span className="text-sm">{user.time} ago</span>
									</div>
								</div>
							))}
						</div>
						<Button variant="secondary" fullWidth className="mt-8">
							See more
						</Button>
					</div>
				</div>
			</section>
			<section className="">
				<MapDisplay />
			</section>
			<section className="">
				<DonationStatsPanel />
			</section>
		</AuthenticatedUserLayout>
	);
};
export default Overview;
Overview.protect = true;
