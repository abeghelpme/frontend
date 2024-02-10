import ProgressBar from "@/components/dashboard/DasboardProgressBar";
import { Button } from "@/components/ui";
import { DashBoardLayout } from "@/layouts/DashBoardPageLayout";
import { PlusButtonIcon } from "@/public/assets/icons/dashboard/icons";
import userIcon from "@/public/assets/icons/dashboard/userIcon.svg";
import dashboardImage from "@/public/assets/images/dashboard/dashboardImage.png";
import Image from "next/image";
import React, { useState } from "react";

export default function index() {
	const [totalAmount, setTotalAmount] = useState(100);
	const [remainingAmount, setRemainingAmount] = useState(80);

	const campaignData = [
		{
			image: userIcon,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			time: "4 mins",
			amount: "+300,000",
		},
		{
			image: userIcon,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			time: "4 mins",
			amount: "+300,000",
		},
		{
			image: userIcon,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			time: "4 mins",
			amount: "+300,000",
		},
		{
			image: userIcon,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			time: "4 mins",
			amount: "+300,000",
		},
		{
			image: userIcon,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			time: "4 mins",
			amount: "+300,000",
		},
		{
			image: userIcon,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			time: "4 mins",
			amount: "+300,000",
		},
	];

	const encouragements = [
		{
			image: userIcon,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			comment:
				"You're doing such important work in raising awareness and support for this cause. Keep up the amazing effort!",
		},
		{
			image: userIcon,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			comment:
				"You're doing such important work in raising awareness and support for this cause. Keep up the amazing effort!",
		},
		{
			image: userIcon,
			name: "Jane Doe",
			email: "Janedoe12@gmail.com",
			comment:
				"You're doing such important work in raising awareness and support for this cause. Keep up the amazing effort!",
		},
	];

	const otherCampaigns = [
		{
			image: dashboardImage,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			proffession: "Health and Welness",
			amountRaised: "$2,000,000",
		},
		{
			image: dashboardImage,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			proffession: "Health and Welness",
			amountRaised: "$2,000,000",
		},
		{
			image: dashboardImage,
			title: "Bringing Dental Care to Undeserved Communities",
			name: "Locs Designer",
			proffession: "Health and Welness",
			amountRaised: "$2,000,000",
		},
	];
	return (
		<DashBoardLayout>
			<div className="min-h-screen  justify-center p-5 md:text-sm mb-10">
				<div className="space-y-5 mb-5">
					<div className="md:hidden">
						<h1 className="text-lg font-semibold"> Hi, Locs Designer👋</h1>
						<p className="text-md">Here is an overview of your campaign ✨</p>
					</div>
					<div className="md:hidden">
						<Button className="flex items-center rounded-md bg-teal-700 p-3  text-md">
							<span className="pr-2">
								<PlusButtonIcon />
							</span>
							Create Campaign
						</Button>
					</div>
					<div>
						<h1 className="font-semibold text-xl mb-3 md:hidden">
							Bringing Dental Care to Undeserved Communities
						</h1>
					</div>
					<div className="lg:hidden">
						<Image
							src={dashboardImage}
							alt="Dashboard Image"
							width={500}
							height={500}
							className="w-full h-60 md:h-80 object-cover rounded-md"
						/>
					</div>
				</div>
				<div className="lg:flex-row gap-10 mb-5 flex flex-col-reverse ">
					<div className="w-full lg:w-1/2">
						<div className="hidden lg:block">
							<Image
								src={dashboardImage}
								alt="Dashboard Image"
								width={500}
								height={500}
								className="w-full h-60 object-cover rounded-md"
							/>
						</div>
						<div className="lg:flex gap-2 items-center mt-5 hidden">
							<div>
								<Image
									src={userIcon}
									alt={"Locs Designer"}
									width={35}
									height={35}
								/>
							</div>

							<div>
								<p>TheLocsDesigner is in charge of this fundraiser.</p>
							</div>
						</div>
						<div className="md:mt-5">
							<div>
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
						</div>

						{encouragements.map((item: any, index) => (
							<div key={index} className="flex gap-2 mb-3 md:mb-10">
								<div>
									<Image
										src={item.image}
										alt={item.name}
										width={50}
										height={50}
									/>
								</div>

								<div>
									<h5 className="font-medium text-lg">{item.name}</h5>
									<div className="space-y-2">
										<p className="md:text-xs font-light md:font-normal">
											{item.email}
										</p>
										<p className="md:text-sm">{item.comment}</p>
									</div>
								</div>
							</div>
						))}
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
							<div>
								<ProgressBar
									totalAmount={totalAmount}
									remainingAmount={remainingAmount}
								/>
							</div>
							<div className="flex justify-between">
								<p>235,567 total donors</p>
								<p>235,784 comments</p>
							</div>
							<div>
								<div className="flex justify-between">
									<Button className="border  border-teal-700 rounded-md text-teal-900">
										Set up account
									</Button>
									<Button className="bg-teal-700 rounded-md ">
										View campaign
									</Button>
								</div>
							</div>
							<div className="pt-2 lg:pt-5">
								{campaignData.map((user: any, index) => (
									<div key={index} className="mb-3 lg:mb-8">
										<div className="flex justify-between">
											<div className="flex gap-2 items-center">
												<div>
													<Image
														src={user.image}
														alt={user.name}
														width={35}
														height={35}
													/>
												</div>

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
							<div className="py-3 md:flex justify-center">
								<Button className="w-full md:w-1/2 lg:w-full border  border-teal-700 rounded-md text-teal-900">
									See more
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className="space-y-5">
					<h1 className="text-lg font-semibold">Explore Other Campaigns</h1>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
						{otherCampaigns.map((item: any, index) => (
							<div key={index} className="space-y-2 mb-5 md:mb-0">
								<div className="pb-3">
									<Image
										src={item.image}
										alt={item.name}
										width={400}
										height={400}
										className=" object-cover w-full rounded-md h-60"
									/>
								</div>
								<div className="xl:pr-10">
									<h3 className="text-md font-semibold text-base xl:text-lg">
										{item.title}
									</h3>
								</div>
								<p className="text-xs">
									By: {item.name} - {item.proffession}
								</p>
								<div>
									<ProgressBar
										totalAmount={totalAmount}
										remainingAmount={remainingAmount}
									/>
									<p className="pt-2 text-xs">{item.amountRaised} raised</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</DashBoardLayout>
	);
}
