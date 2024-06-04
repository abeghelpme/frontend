import { Pagination as PaginationPrimitive } from "@nextui-org/pagination";

type PaginationProps = {
	startPage?: number;
	currentPage: number;
	totalPageCount: number;
	onPageChange: (value: number) => void;
};

function Pagination(props: PaginationProps) {
	const { currentPage, totalPageCount, startPage = 1, onPageChange } = props;

	return (
		<PaginationPrimitive
			disableCursorAnimation
			page={currentPage}
			onChange={onPageChange}
			classNames={{
				wrapper: "flex items-center gap-4",
				item: "h-auto w-auto min-w-[initial] bg-transparent text-base font-extrabold data-[active=true]:size-7 data-[active=true]:rounded-full data-[active=true]:border-[1.4px] data-[active=true]:border-black data-[active=true]:bg-abeg-primary",
			}}
			total={totalPageCount}
			initialPage={startPage}
		/>
	);
}
export default Pagination;
