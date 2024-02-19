const parseJSON = <TResult>(value: string | undefined | null) => {
	if (typeof value !== "string" || value === "") {
		return null;
	}

	return JSON.parse(value) as TResult;
};

export { parseJSON };
