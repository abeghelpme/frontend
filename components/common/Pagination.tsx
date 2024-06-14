import { Pagination as PaginationPrimitive } from "@nextui-org/pagination";
import { ArrowLeft } from "./svg";

type PaginationProps = {
	startPage?: number;
	currentPage: number;
	totalPageCount: number;
	onPageChange: (value: number | "prev" | "next") => void;
};

function Pagination(props: PaginationProps) {
	const { currentPage, totalPageCount, startPage = 1, onPageChange } = props;

	return (
		<div className="mt-[30px] flex items-center justify-center gap-[14px] p-2 md:mt-[40px]">
			<button
				onClick={() => onPageChange("prev")}
				className="flex items-center gap-2 p-2 font-extrabold"
			>
				<ArrowLeft className="size-5" />
				Prev
			</button>

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

			<button
				onClick={() => onPageChange("next")}
				className="flex items-center gap-2 p-2 font-extrabold"
			>
				Next
				<ArrowLeft className="size-5 rotate-180" />
			</button>
		</div>
	);
}
export default Pagination;
