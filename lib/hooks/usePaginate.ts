import { useEffect, useRef, useState } from "react";

type UsePaginateProps = {
	fetchAll?: boolean;
	paginationStyle?: "manual" | "scroll";
	limit?: number;
};

type Products = {
	id: number;
	title: string;
	price: number;
};

type res = {
	products: Products[];
	total: number;
	skip: number;
	limit: number;
};
export const usePaginate =
	// <T extends Omit<UsePaginateProps, keyof UsePaginateProps>>
	(
		endpoint: string | undefined,
		options: UsePaginateProps = {
			fetchAll: false,
			paginationStyle: "manual",
			limit: 10,
		}
	) => {
		const [page, setPage] = useState(1);
		const [skip, setSkip] = useState(options?.fetchAll ? 0 : 0);
		const [data, setData] = useState<Products[]>([]);
		const [loading, setLoading] = useState(false);
		const [hasMore, setHasMore] = useState(false);
		const itemsPerPage = options?.limit || 8;
		const start = (page - 1) * itemsPerPage;
		const end = page * itemsPerPage;
		const currData = data?.slice(start, end);
		const totalPages = Math.ceil(data?.length / itemsPerPage);
		const disablePrev = page === 1;
		const disableNext = page === totalPages;
		const limitRef = useRef(null);

		// const { data, error } = await callApi<ApiResponse<T[]>>(`/${endpoint}`);
		// if (error || !data || !data.data) {
		// 	console.error(error);
		// 	return;
		// }
		const fetchData = async () => {
			setLoading(true);
			if (!endpoint) {
				return;
			}

			const res = await fetch(
				`https://dummyjson.com/products?limit=0&skip=${skip}&select=title,price`
			);
			if (res.ok) {
				const result = (await res.json()) as res;
				setLoading(false);
				setData(result.products);
			}
		};

		useEffect(() => {
			fetchData();
		}, [skip]);
		const handleNext = () => {
			if (!itemsPerPage) return;
			setPage((prev) => prev + 1);
		};

		const handlePrev = () => {
			if (!itemsPerPage) return;
			setPage((prev) => prev - 1);
		};

		return {
			currData,
			page,
			setPage,
			handleNext,
			totalPages,
			disableNext,
			disablePrev,
			loading,
			handlePrev,
		};
	};
