import { Button } from "@/components/ui";
import {
	arrowDown,
	arrowLeft,
	arrowRight,
} from "@/public/assets/images/campaign-category";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CampaignCardList, type CardProps } from "../common/CampaignCard";

const dummyCardData = Array<CardProps["cardDetails"]>(15).fill({
	imageSrc: "/assets/images/dashboard/dummyCardImg.svg",
	title: "Bringing Dental Care to Underserved Communities",
	location: "Lagos, Nigeria",
	name: "Locs Designer",
	goal: "₦1,000,000",
	amountRaised: "₦2,000,000",
	donorCount: "235,567",
	daysLeft: "20",
	category: "Health and Wellness",
	status: "Incomplete",
});

export const CampaignCategoryCard = () => {
	// Custom hook to determine the number of items per page based on screen size
	const useItemsPerPage = () => {
		const [itemsPerPage, setItemsPerPage] = useState(9);

		useEffect(() => {
			const handleResize = () => {
				if (window.innerWidth < 768) {
					setItemsPerPage(3);
				} else if (window.innerWidth < 1024) {
					setItemsPerPage(8);
				} else {
					setItemsPerPage(9);
				}
			};

			handleResize(); // Call to initialize, to prevent flashing original state on load when resizing window
			window.addEventListener("resize", handleResize);

			return () => {
				window.removeEventListener("resize", handleResize);
			};
		}, []);

		return itemsPerPage;
	};
	const itemsPerPage = useItemsPerPage();
	const [currentPage, setCurrentPage] = useState(1);

	const totalItems = dummyCardData.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
	const currentItems = dummyCardData.slice(startIndex, endIndex);

	const handlePageChange = (page: any) => {
		setCurrentPage(page);
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	//code below is for dropdown filter button of this component
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState("");

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (filter: any) => {
		setSelectedFilter(filter);
		setIsOpen(false);
	};
	return (
		<div className="px-5 md:px-20">
			<div className="w-full flex flex-col gap-2 space-y-5">
				<h1 className="text-4xl md:w-full font-bold md:text-5xl">
					Explore our health & Wellness Campaigns
				</h1>
				<p className="text-xl md:w-3/6 text-placeholder font-medium">
					Join the effortless way to fundraise and make a difference and empower
					your cause with Abeghelp.me
				</p>
			</div>

			<div className="relative hidden md:flex justify-end items-center mt-2 mr-10">
				<Button
					onClick={toggleDropdown}
					className="border border-gray-500 flex gap-3 items-center px-3 py-2"
				>
					<span className="text-black text-base">
						{selectedFilter || "Latest"}
					</span>
					<span>
						<Image
							src={arrowDown}
							alt={"arrow down icon"}
							priority
							width={20}
							height={20}
						/>
					</span>
					{/* Dropdown menu */}
					{isOpen && (
						<div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10">
							<button
								onClick={() => handleSelect("Latest")}
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
							>
								Latest
							</button>
							<button
								onClick={() => handleSelect("Monthly")}
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
							>
								Monthly
							</button>
							<button
								onClick={() => handleSelect("Weekly")}
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
							>
								Weekly
							</button>
						</div>
					)}
				</Button>
			</div>

			{/* href={`/explore?category=${item.url}`} */}
			<CampaignCardList
				classNames={{ base: "mt-10" }}
				cardDetailList={currentItems}
				listType="grid"
			/>

			<div className="flex justify-center items-center gap-5 mt-10 md:mt-20">
				<button
					onClick={handlePrevPage}
					disabled={currentPage === 1}
					className="flex gap-2 items-center font-bold md:text-2xl outline-none"
				>
					<span>
						{" "}
						<Image
							src={arrowLeft}
							alt={"arrow left icon"}
							priority
							width={30}
							height={30}
							className=""
						/>
					</span>
					<span> Prev</span>
				</button>
				{Array.from({ length: totalPages }, (_, index) => index + 1).map(
					(pageNumber, i) => (
						<div key={i} className="flex items-center">
							{(pageNumber <= 3 || i === totalPages - 1) && (
								<button
									key={pageNumber}
									onClick={() => handlePageChange(pageNumber)}
									className={`px-3 md:px-4 py-1 rounded-full md:text-2xl ${
										currentPage === pageNumber
											? "bg-abeg-primary text-white font-bold border border-black"
											: "font-bold"
									}`}
								>
									{pageNumber}
								</button>
							)}
							{pageNumber === 3 && totalPages > 3 && (
								<span className="px-2 py-1 mb-2 font-bold md:text-2xl flex items-center">
									...
								</span>
							)}
						</div>
					)
				)}
				<button
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					className="flex gap-2 items-center font-bold md:text-2xl outline-none bg-transparent"
				>
					<span>Next</span>

					<span>
						{" "}
						<Image
							src={arrowRight}
							alt={"arrow right icon"}
							priority
							width={30}
							height={30}
							className=""
						/>
					</span>
				</button>
			</div>
		</div>
	);
};
export default CampaignCategoryCard;
