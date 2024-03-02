import { DATE_TODAY } from "@/lib/helpers/campaign/constants";

/* eslint-disable no-console */
const getDateFromString = (dateString: string, fallback = DATE_TODAY) => {
	if (dateString === "") {
		console.warn(
			"getDateFromString: Value is an empty string, returning fallback date"
		);
		return fallback;
	}

	const date = new Date(dateString);

	if (Number.isNaN(date.getTime())) {
		console.warn(
			`getDateFromString: Invalid date string '${dateString}', returning fallback date`
		);
		return fallback;
	}

	return date;
};

export { getDateFromString };
