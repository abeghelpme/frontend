type BaseFetcherOptions<TString extends string> = RequestInit & {
  baseURL: TString;
  baseTimeout?: number;
};

type FetcherOptions = RequestInit & {
  timeout?: number;
};

const createFetcherInstance = <TBaseURL extends string>(
  baseOptions: BaseFetcherOptions<TBaseURL>,
) => {
  const { baseURL, baseTimeout = 10000, ...restOfBaseOptions } = baseOptions;

  const baseController = new AbortController();

  const fetcherFn = async <TResponseData>(
    url: `/${string}`,
    options: FetcherOptions = {},
  ) => {
    const { timeout = baseTimeout, ...restOfFetchOptions } = options;

    const controller = new AbortController();
    const ID = window.setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${baseURL}${url}`, {
        signal:
          timeout === baseTimeout ? baseController.signal : controller.signal,
        ...restOfBaseOptions,
        ...restOfFetchOptions,
      });

      window.clearTimeout(ID);

      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }

      return response.json() as TResponseData;

      // Re-throw error in case of timeout for better debugging
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error(`Request to ${url} timed out after ${timeout}ms`);
      }
    }
  };

  fetcherFn.defaults = baseOptions; /* REVIEW - This is up for debate,
		 														whether or not we want to be able to override the defaults from instance just like axios
												*/

  return fetcherFn;
};

export { createFetcherInstance };
