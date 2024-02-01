const validateTagValue = (tagsArray: string[], newTag: string) => {
	if (newTag.length < 3) {
		return;
	} //TODO - show error

	if (tagsArray.includes(newTag)) {
		return;
	} //TODO - show error

	if (tagsArray.length >= 5) {
		return;
	} //TODO - show error

	return newTag;
};

export { validateTagValue };
