import { Button } from "@/components/ui";
import type { Campaign } from "@/interfaces/Campaign";
import { arrowDown, arrowLeft, arrowRight } from "@/public/assets/images/campaign-category";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CampaignCardList } from "../common/CampaignCard";
import NoCampaign from "./NoCampaigns";

// Custom hook to determine the number of items per page based on screen size
export const useItemsPerPage = () => {
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

export const CampaignCategoryCard = ({
	allCampaigns,
	categoryName,
}: {
	allCampaigns: Campaign[];
	categoryName: string | null;
}) => {
	if (allCampaigns?.length === 0) {
		return <NoCampaign categoryName={categoryName} />;
	}

	const itemsPerPage = useItemsPerPage();
	const [currentPage, setCurrentPage] = useState(1);

	const totalItems = allCampaigns?.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
	const currentItems = allCampaigns?.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	// Code below is for dropdown filter button of this component
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState("");

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (filter: string) => {
		setSelectedFilter(filter);
		setIsOpen(false);
	};
	return (
		<div className="px-5 md:px-20">
			<CampaignCardList
				classNames={{ base: "mt-10" }}
				cardDetailsArray={currentItems}
				listType="grid"
			/>

			<div className="mt-10 flex items-center justify-center gap-5 md:mt-20">
				<button
					onClick={handlePrevPage}
					disabled={currentPage === 1}
					className="flex items-center gap-2 font-bold outline-none md:text-2xl"
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
				{Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber, i) => (
					<div key={i} className="flex items-center">
						{(pageNumber <= 3 || i === totalPages - 1) && (
							<button
								key={pageNumber}
								onClick={() => handlePageChange(pageNumber)}
								className={`rounded-full px-3 py-1 md:px-4 md:text-2xl ${
									currentPage === pageNumber
										? "border border-black bg-abeg-primary font-bold text-white"
										: "font-bold"
								}`}
							>
								{pageNumber}
							</button>
						)}
						{pageNumber === 3 && totalPages > 3 && (
							<span className="mb-2 flex items-center px-2 py-1 font-bold md:text-2xl">...</span>
						)}
					</div>
				))}
				<button
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					className="flex items-center gap-2 bg-transparent font-bold outline-none md:text-2xl"
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
