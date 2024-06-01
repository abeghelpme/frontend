import type { ApiResponse } from "@/interfaces";
import type { Campaign } from "@/interfaces/Campaign";
import { useEffect, useState } from "react";
import { callApi } from "../helpers/callApi";
import { useCallbackRef } from "./useCallbackRef";

type UsePaginateOptions = {
	allData?: boolean;
	limit?: number;
	startPage?: number;
};

type PaginatedResponse<T> = {
	data: T[];
	count: number;
};

const LIMIT = 12;

export const usePaginate = <T = Campaign>(
	endpointOrCampaignList: string | Campaign[] | undefined,
	options: UsePaginateOptions = {}
) => {
	const [page, setPage] = useState(options.startPage ?? 1);
	const [shouldReturnAll] = useState(options.allData ?? false);

	const [data, setData] = useState<PaginatedResponse<T>>({
		data: Array.isArray(endpointOrCampaignList)
			? (endpointOrCampaignList.slice(page - 1, options.limit ?? LIMIT) as T[])
			: [],
		count: 0,
	});
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState("");

	const upDateWithDataFromStore = useCallbackRef(() => {
		if (!Array.isArray(endpointOrCampaignList) || endpointOrCampaignList.length === 0) return;

		const newDataSlice = endpointOrCampaignList.slice(page - 1, options.limit ?? LIMIT) as T[];

		const updatedData = shouldReturnAll
			? { ...data, data: [...data.data, ...newDataSlice] }
			: { ...data, data: newDataSlice };

		setData(updatedData);
	});

	const upDateWithDataFromApi = useCallbackRef(async () => {
		if (typeof endpointOrCampaignList !== "string" || endpointOrCampaignList.length === 0) return;

		setIsFetching(true);

		const { data: response, error: apiError } = await callApi<ApiResponse<PaginatedResponse<T>>>(
			`/${endpointOrCampaignList}?page=1&limit=${options.limit ?? LIMIT}`
		);

		if (apiError || !response?.data) {
			setError(apiError?.message ?? "Could not fetch data");
			setIsFetching(false);
			return;
		}

		setIsFetching(false);

		const updatedData = shouldReturnAll
			? { ...data, data: [...data.data, ...response.data.data] }
			: { ...data, data: response.data as never };

		setData(updatedData);
	});

	useEffect(() => {
		upDateWithDataFromStore();
		void upDateWithDataFromApi();
	}, [options.limit]);

	const fetchFromEndpoint = async (direction: "prev" | "next") => {
		setIsFetching(true);
		setError("");

		if (typeof endpointOrCampaignList !== "string" || endpointOrCampaignList.length === 0) {
			return setError("Endpoint is required");
		}

		if (direction === "prev" && page <= 1) {
			setIsFetching(false);
			return;
		}

		const newPage = direction === "next" ? page + 1 : page - 1;
		setPage(newPage);

		const { data: response, error: apiError } = await callApi<ApiResponse<PaginatedResponse<T>>>(
			`/${endpointOrCampaignList}?page=${newPage}&limit=${LIMIT}`
		);

		if (apiError || !response?.data) {
			setError(apiError?.message ?? "Could not fetch data");
			setIsFetching(false);
			return;
		}

		const updateData = shouldReturnAll
			? {
					...data,
					data: [...data.data, ...response.data.data],
			  }
			: { ...data, data: response.data as never };

		setData(updateData);
		setIsFetching(false);
	};

	const fetchFromStore = (direction: "prev" | "next") => {
		if (!Array.isArray(endpointOrCampaignList) || endpointOrCampaignList.length === 0) return;

		if (direction === "prev" && page <= 1) return;

		const newPage = direction === "next" ? page + 1 : page - 1;

		setPage(newPage);

		const newDataSlice = endpointOrCampaignList.slice(newPage - 1, options.limit ?? LIMIT) as T[];

		const updatedData = shouldReturnAll
			? { ...data, data: [...data.data, ...newDataSlice] }
			: { ...data, data: newDataSlice };

		setData(updatedData);
	};

	const hasMore = () => {
		if (shouldReturnAll) {
			return data.data.length < data.count;
		}

		return page < Math.floor(data.count / LIMIT);
	};

	const hasPrevious = () => page > 1 && !isFetching;

	return {
		currentPage: page,
		data,
		isFetching,
		error,
		fetchFromEndpoint,
		fetchFromStore,
		hasPrevious,
		hasMore,
	};
};
