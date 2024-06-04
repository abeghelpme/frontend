import type { Campaign } from "@/interfaces/Campaign";
import { useEffect, useState } from "react";
import { useCallbackRef } from "./useCallbackRef";

type UsePaginateOptions = {
	limit?: number;
	startPage?: number;
	returnAllData?: boolean;
	loop?: boolean;
};

export const usePagination = <TDataItem = Campaign>(
	campaignList: Campaign[] | undefined,
	options: UsePaginateOptions = {}
) => {
	const { limit = 10, startPage = 1, returnAllData, loop } = options;

	const [currentPage, setCurrentPage] = useState(startPage);
	const [paginatedData, setPaginatedData] = useState<TDataItem[]>([]);
	const shouldReturnAll = useState(returnAllData)[0];

	const totalPageCount = Math.ceil((campaignList?.length ?? 0) / limit);

	const handleUpdateData = (page: number) => {
		if (!campaignList || campaignList.length === 0) return;

		if (page < 1 || page > totalPageCount) return;

		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;

		const newDataSlice = campaignList.slice(startIndex, endIndex) as TDataItem[];

		const updatedData = shouldReturnAll ? [...paginatedData, ...newDataSlice] : newDataSlice;

		setCurrentPage(page);

		setPaginatedData(updatedData);
	};

	const initializePagination = useCallbackRef(() => handleUpdateData(currentPage));

	useEffect(() => {
		initializePagination();
	}, [limit, campaignList, initializePagination]);

	const handlePageChange = (directionOrPage: "prev" | "next" | number) => {
		if (typeof directionOrPage === "number") {
			handleUpdateData(directionOrPage);

			return;
		}

		let newPage = directionOrPage === "next" ? currentPage + 1 : currentPage - 1;

		if (loop && newPage > totalPageCount) {
			newPage = 1;
		}
		if (loop && newPage < 1) {
			newPage = totalPageCount;
		}

		handleUpdateData(newPage);
	};

	const hasMore = shouldReturnAll
		? paginatedData.length < totalPageCount
		: currentPage < totalPageCount;

	const hasPrevious = currentPage > 1;

	return {
		data: paginatedData,
		currentPage,
		totalPageCount,
		handlePageChange,
		hasPrevious,
		hasMore,
	};
};
