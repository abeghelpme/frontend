import { DATE_TOMORROW } from "@/components/CreateCampaign/campaign-utils/constants";

const getDateFromString = (dateString: string, fallback = DATE_TOMORROW) => {
	const date = dateString === "" ? fallback : new Date(dateString);

	return date;
};

export { getDateFromString };
