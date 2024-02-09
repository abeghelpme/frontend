import { DATE_TOMORROW } from "@/components/CreateCampaign/campaign-utils/constants";

const getDateFromString = (dateString: string, fallback = DATE_TOMORROW) => {
	const date = dateString !== "" ? new Date(dateString) : fallback;

	return date;
};

export { getDateFromString };
