const BASE_BACKEND_URL = "http://abeghelp-backend-staging.up.railway.app"; //TODO - Find a way to hide this via environment variables

export const fetcher = async <TData>(url: string, options?: RequestInit) => {
  const response = await fetch(`${BASE_BACKEND_URL}/${url}`, options);

  if (!response.ok) {
    throw new Error("Failed to fetch data from server");
  }

  return response.json() as TData;
};
