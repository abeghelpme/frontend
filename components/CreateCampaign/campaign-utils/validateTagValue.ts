const validateTagValue = (tagsArray: string[], newTag: string | undefined) => {
	if (!newTag) return;

	if (newTag.length < 3) {
		return;
	} // FIXME - show error

	if (tagsArray.includes(newTag)) {
		return;
	} // FIXME - show error

	if (tagsArray.length >= 5) {
		return;
	} // FIXME - show error

	return newTag;
};

export { validateTagValue };
