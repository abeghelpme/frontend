type SummaryCardProps = {
	title: string;
	figure: string | number;
	result: string;
};
const SummaryCard = ({ title, figure, result }: SummaryCardProps) => {
	return (
		<div className="border-borderPrimary group w-1/3 space-y-9 rounded-xl border bg-white p-4 text-abeg-text transition-colors duration-300 hover:border-white hover:bg-abeg-primary hover:text-white max-md:w-full">
			<p className="space-y-2">
				<svg
					width="25"
					height="24"
					viewBox="0 0 25 24"
					fill="none"
					className="stroke-abeg-text group-hover:stroke-white"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M2.5 8.5H15"
						strokeWidth="1.5"
						strokeMiterlimit="10"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M6.5 16.5H8.5"
						strokeWidth="1.5"
						strokeMiterlimit="10"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M11 16.5H15"
						strokeWidth="1.5"
						strokeMiterlimit="10"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M22.5 14.03V16.11C22.5 19.62 21.61 20.5 18.06 20.5H6.94C3.39 20.5 2.5 19.62 2.5 16.11V7.89C2.5 4.38 3.39 3.5 6.94 3.5H15"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M20.5 3.5V9.5L22.5 7.5"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M20.5 9.5L18.5 7.5"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<span className="">
					<span className="capitalize">total</span> {title}
				</span>
			</p>
			<div className="space-y-2">
				<h3 className="text-[2rem] font-medium">{figure}</h3>
				<span className="">{result}</span>
			</div>
		</div>
	);
};

export default SummaryCard;
