export const getResponseData = <TResponse>(response: Response) => {
	return response.json() as Promise<TResponse>;
};

export const getDaysLeftForDonationCarousel = (days: number) => {
	return days < 0 ? 0 : days ?? 0;
};
