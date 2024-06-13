import type { ApiResponse } from "@/interfaces";
import type { Campaign } from "@/interfaces/Campaign";
import { useRef, useState } from "react";
import { callApi } from "../helpers/callApi";

type UsePaginateProps = {
	allData?: boolean;
	startPage?: number;
};

type PaginatedResponse<T> = {
	data: T[];
	count: number;
};

const LIMIT = 12;

export const usePaginate = <T = Campaign>(
	endpoint: string | undefined,
	options: UsePaginateProps = {
		allData: false,
		startPage: 1,
	}
) => {
	const [page, setPage] = useState(options.startPage ?? 1);
	const returnAll = useRef(options.allData ?? false);

	const [data, setData] = useState<PaginatedResponse<T>>({
		data: [],
		count: 0,
	});
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState("");

	const fetch = async (direction: "prev" | "next") => {
		setIsFetching(true);
		setError("");
		if (!endpoint) {
			return setError("Endpoint is required");
		}

		if (direction === "prev" && page <= 1) {
			setIsFetching(false);
			return;
		}

		const newPage = direction === "next" ? page + 1 : page - 1;
		setPage(newPage);

		const { data: response, error } = await callApi<ApiResponse<PaginatedResponse<T>>>(
			`/${endpoint}?page=${newPage}&limit=${LIMIT}`
		);

		if (error || !response || !response.data) {
			setError(error?.message || "Could not fetch data");
			setIsFetching(false);
			return;
		}

		let updateData;
		if (returnAll.current) {
			updateData = {
				...data,
				data: [...data.data, ...response.data.data],
			};
		} else {
			updateData = response.data;
		}

		setData(updateData);
		setIsFetching(false);
	};

	const hasMore = () => {
		if (returnAll.current) {
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
		fetch,
		hasPrevious,
		hasMore,
	};
};
