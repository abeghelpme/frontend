export const getTimeDifference = (time: string): string => {
	const createdDate = new Date(time);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

	const intervals = [
		{ label: "year", seconds: 31536000 },
		{ label: "month", seconds: 2592000 },
		{ label: "day", seconds: 86400 },
		{ label: "hour", seconds: 3600 },
		{ label: "min", seconds: 60 },
		{ label: "sec", seconds: 1 },
	];

	for (const interval of intervals) {
		const count = Math.floor(diffInSeconds / interval.seconds);
		if (count > 0) {
			return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
		}
	}

	return "just now";
};
