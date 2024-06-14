export const getResponseData = <TResponse>(response: Response) => {
	return response.json() as Promise<TResponse>;
};
