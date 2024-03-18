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
import Image from "next/image";

const Dashboard = () => {
	const campaignData = [
		{
			image: userImage,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			time: "4 mins",
			amount: "+300,000",
		},
		{
			image: userImage,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			time: "4 mins",
			amount: "+300,000",
		},
		{
			image: userImage,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			time: "4 mins",
			amount: "+300,000",
		},
		{
			image: userImage,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			time: "4 mins",
			amount: "+300,000",
		},
		{
			image: userImage,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			time: "4 mins",
			amount: "+300,000",
		},
		{
			image: userImage,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			time: "4 mins",
			amount: "+300,000",
		},
	];
	return (
		<AuthenticatedUserLayout isDashboard>
			<section className="">
				<div className="flex flex-col lg:flex-row gap-8 justify-between md:m-0">
					<div className="lg:w-3/5 space-y-4 lg:space-y-5 flex-1">
						<h1 className="md:hidden font-bold text-lg mb-4">
							Bringing Dental Care to Undeserved Communities
						</h1>
						<div className="text-white relative lg:!m-0">
							<Image
								src={dashboardImage}
								alt="Dashboard Image"
								className="w-full rounded-md"
							/>
							<div className="space-x-1 absolute top-4 left-4 text-xs sm:text-sm flex items-center p-2 backdrop-blur-md rounded-md">
								<LocationIcon />
								<span className="">Lagos, Nigeria</span>
							</div>
							<div className="space-x-1 absolute bottom-4 right-4 text-xs sm:text-sm flex items-center p-2 backdrop-blur-md rounded-md">
								<ClockIcon />
								<span className="">20 days left</span>
							</div>
						</div>
						<div className="space-y-4 md:space-y-5">
							<h1 className="md:block hidden font-bold text-2xl ">
								Bringing Dental Care to Undeserved Communities
							</h1>
							<div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
								<div className="space-y-4 flex-1 text-sm">
									<div className="flex justify-between items-center gap-7">
										<span>&#x20A6; 2,000,000</span>
										<span>&#x20A6; 1,000,000 remaining</span>
									</div>
									<ProgressBar value={50} />
									<div className="flex justify-between items-center gap-7">
										<span className="">235,567 total donors</span>
										<span className="">235,567 comments</span>
									</div>
								</div>
								<div className="md:w-fit flex md:flex-col justify-between gap-4 text-sm">
									<Button
										variant="secondary"
										className="flex items-center gap-2"
									>
										<BankIcon />
										<span className="">Set up account</span>
									</Button>
									<Button variant="primary" className="flex items-center gap-2">
										<EyeIcon />
										<span className="">View campaign</span>
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div className="p-4 border-[0.5px] bg-white border-placeholder rounded-lg lg:w-[45%] lg:max-w-[450px]">
						<div className="flex justify-between items-center mb-8">
							<h2 className="font-bold text-2xl">Donors list</h2>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div className="flex items-center gap-2 md:gap-0 cursor-pointer border border-placeholder rounded-lg px-3 py-2">
										<span
											className="cursor-pointer font-medium text-sm flex gap-2 items-center"
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
							{campaignData.map((user: any, index) => (
								<div
									key={index}
									className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-7"
								>
									<div className="flex gap-2 items-center">
										<Image
											src={user.image}
											alt="User Image"
											width={30}
											height={30}
										/>
										<div className="flex flex-col xl:">
											<span className="font-medium">{user.name}</span>
											<span className="text-sm">{user.email}</span>
										</div>
									</div>
									<div className="flex items-center justify-between gap-4 md:gap-0 md:items-end md:flex-col">
										<div className="flex items-center gap-2 ml-10">
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
export default Dashboard;
Dashboard.protect = true;
