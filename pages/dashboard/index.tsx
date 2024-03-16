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

	// const encouragements = [
	// 	{
	// 		image: userImage,
	// 		name: "Jane Doe",
	// 		email: "Janedoe12@gmail.com",
	// 		comment:
	// 			"You're doing such important work in raising awareness and support for this cause. Keep up the amazing effort!",
	// 	},
	// 	{
	// 		image: userImage,
	// 		name: "Jane Doe",
	// 		email: "Janedoe12@gmail.com",
	// 		comment:
	// 			"You're doing such important work in raising awareness and support for this cause. Keep up the amazing effort!",
	// 	},
	// 	{
	// 		image: userImage,
	// 		name: "Jane Doe",
	// 		email: "Janedoe12@gmail.com",
	// 		comment:
	// 			"You're doing such important work in raising awareness and support for this cause. Keep up the amazing effort!",
	// 	},
	// ];

	// const otherCampaigns = [
	// 	{
	// 		image: dashboardImage,
	// 		title: "Bringing Dental Care to Undeserved Communities",
	// 		name: "Locs Designer",
	// 		profession: "Health and Wellness",
	// 		amountRaised: "$2,000,000",
	// 	},
	// 	{
	// 		image: dashboardImage,
	// 		title: "Bringing Dental Care to Undeserved Communities",
	// 		name: "Locs Designer",
	// 		profession: "Health and Wellness",
	// 		amountRaised: "$2,000,000",
	// 	},
	// 	{
	// 		image: dashboardImage,
	// 		title: "Bringing Dental Care to Undeserved Communities",
	// 		name: "Locs Designer",
	// 		profession: "Health and Wellness",
	// 		amountRaised: "$2,000,000",
	// 	},
	// ];
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

			{/* <div className="min-h-screen  justify-center p-5 md:text-sm mb-10">
				<div className="space-y-5 mb-5">
					<div className="md:hidden">
						<h1 className="text-lg font-semibold"> Hi, Locs Designer👋</h1>
						<p className="text-md">Here is an overview of your campaign ✨</p>
					</div>
					<Button className="md:hidden flex items-center rounded-md bg-teal-700 p-3  text-md">
						<span className="pr-2">
							<PlusIcon />
						</span>
						Create Campaign
					</Button>
					<h1 className="font-semibold text-xl mb-3 md:hidden">
						Bringing Dental Care to Undeserved Communities
					</h1>
					<Image
						src={dashboardImage}
						alt="Dashboard Image"
						width={500}
						height={500}
						className="lg:hidden w-full h-60 md:h-80 object-cover rounded-md"
					/>
				</div>
				<section className="lg:flex-row gap-10 mb-5 flex flex-col-reverse ">
					<div className="w-full lg:w-1/2">
						<Image
							src={dashboardImage}
							priority
							alt="Dashboard Image"
							width={500}
							height={500}
							className="hidden lg:block w-full h-60 object-cover rounded-md"
						/>
						<div className="lg:flex gap-2 items-center mt-5 hidden">
							<Image src={userImage} alt="User Image" width={30} height={30} />

							<p>TheLocsDesigner is in charge of this fundraiser.</p>
						</div>
						<div className="md:mt-5">
							<p className="text-lg border-b border-gray-400 pb-1">
								<span className="font-semibold">Category:</span> Health and
								Wellness
							</p>
							<br />
							<p className="text-lg font-semibold border-b border-gray-400 pb-1">
								Words of encouragement
							</p>
							<br />
						</div>

						<article className="space-y-3">
							{encouragements.map((item: any, index) => (
								<aside key={index} className="flex items-start gap-2">
									<Image
										src={item.image}
										alt="User Image"
										width={30}
										height={30}
										className="object-fit"
									/>
									<div className="space-y-2">
										<div>
											<h5 className="font-medium ">{item.name}</h5>
											<p className="t ext-sm font-light">{item.email}</p>
										</div>
										<p>{item.comment}</p>
									</div>
								</aside>
							))}
						</article>
					</div>
					<div className="w-full lg:w-1/2">
						<h1 className="font-semibold text-2xl lg:mb-3 hidden md:block">
							Bringing Dental Care to Undeserved Communities
						</h1>
						<div className="space-y-5 lg:space-y-3">
							<div className="flex justify-between ">
								<p>$2,000,000</p>
								<p>$1,000,000</p>
							</div>

							<ProgressBar
								value={70}
								className="progress-filled:bg-teal-700 progress-unfilled:bg-teal-400 progress-unfilled:h-1 l rounded-full"
							/>
							<div className="flex justify-between">
								<span>235,567 total donors</span>
								<span>235,784 comments</span>
							</div>
							<div className="flex justify-between">
								<Button className="border  border-teal-700 rounded-md text-teal-900 hover:bg-teal-700 hover:text-white transition duration-300">
									Set up account
								</Button>
								<Button className="bg-teal-700 rounded-md hover:bg-transparent hover:text-teal-900 hover:border  hover:border-teal-700 transition duration-300">
									View campaign
								</Button>
							</div>
							<div className="pt-2 lg:pt-5">
								{campaignData.map((user: any, index) => (
									<div key={index} className="mb-3 lg:mb-8">
										<div className="flex justify-between">
											<div className="flex gap-2 items-center">
												<Image
													src={user.image}
													alt="User Image"
													width={30}
													height={30}
												/>

												<div>
													<h5 className="font-medium">{user.name}</h5>
													<div className="flex justify-between gap-5">
														<div>
															<p className="text-sm">{user.email}</p>
														</div>
													</div>
												</div>
											</div>
											<div className="flex gap-2 mt-6 items-center">
												<span className="text-sm">sent</span>
												<span className="font-semibold">{user.amount}</span>{" "}
												<span className="text-sm">{user.time} ago</span>{" "}
											</div>
										</div>
									</div>
								))}
							</div>
							<Button className="py-3 md:flex justify-center w-full  lg:w-full border  border-teal-700 rounded-md text-teal-900 hover:bg-teal-700 hover:text-white transition duration-300">
								See more
							</Button>
						</div>
					</div>
				</section>
				<section className="space-y-5">
					<h1 className="text-lg font-semibold">Explore Other Campaigns</h1>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
						{otherCampaigns.map((item: any, index) => (
							<div key={index} className="space-y-2 mb-5 md:mb-0">
								<Image
									src={item.image}
									alt={item.name}
									priority
									width={400}
									height={400}
									className="pb-3 object-cover w-full rounded-md h-60"
								/>
								<h3 className="xl:pr-10 text-md font-semibold text-base xl:text-lg">
									{item.title}
								</h3>
								<p className="text-xs">
									By: {item.name} - {item.profession}
								</p>
								<ProgressBar
									value={70}
									className="progress-filled:bg-teal-700 progress-unfilled:bg-teal-400 progress-unfilled:h-1 rounded-full"
								/>

								<p className="pt-2 text-xs">{item.amountRaised} raised</p>
							</div>
						))}
					</div>
				</section>
			</div> */}
		</AuthenticatedUserLayout>
	);
};
export default Dashboard;
// dashboard.protect = true;
