const ProgressBar = ({ totalAmount, remainingAmount }: any) => {
	const percentage = (remainingAmount / totalAmount) * 100;

	return (
		<div className="overflow-hidden rounded-full h-1 bg-teal-400">
			<div
				className="h-full bg-teal-700 rounded-full animate-pulse duration-600 ease-out "
				style={{ width: `${percentage}%` }}
			></div>
		</div>
	);
};

export default ProgressBar;
