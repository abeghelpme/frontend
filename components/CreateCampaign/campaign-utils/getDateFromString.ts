import { DATE_TOMORROW } from "@/components/CreateCampaign/campaign-utils/constants";

/* eslint-disable no-console */
const getDateFromString = (dateString: string, fallback = DATE_TOMORROW) => {
	if (dateString === "") {
		console.error(
			"getDateFromString: Value is an empty string, returning fallback date"
		);
		return fallback;
	}

	const date = new Date(dateString);

	if (Number.isNaN(date.getTime())) {
		console.error(
			`getDateFromString: Invalid date string '${dateString}', returning fallback date`
		);
		return fallback;
	}

	return date;
};

export { getDateFromString };
