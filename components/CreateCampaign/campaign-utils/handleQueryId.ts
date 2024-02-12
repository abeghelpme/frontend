export const setQueryId = (key: string, id: string) => {
	const searchParamObj = new URLSearchParams();
	searchParamObj.set("id", id);

	const newQueryString = `?${searchParamObj.toString()}`;

	if (window.location.search !== newQueryString) {
		history.replaceState(null, "", newQueryString);
	}

	if (!localStorage.getItem(key)) {
		localStorage.setItem(key, newQueryString);
	}
};

export const getQueryId = (key: string = "query-id") => {
	if (localStorage.getItem(key)) {
		return localStorage.getItem(key) as string;
	}

	return window.location.search;
};
