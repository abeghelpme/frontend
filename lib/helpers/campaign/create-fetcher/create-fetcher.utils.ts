export const getResponseData = async <TResponse>(response: Response) => {
	return (await response.json()) as TResponse;
};
