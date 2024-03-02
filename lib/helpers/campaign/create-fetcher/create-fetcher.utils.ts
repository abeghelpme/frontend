// eslint-disable-next-line require-await
export const getResponseData = async <TResponse>(response: Response) => {
	return response.json() as TResponse;
};
