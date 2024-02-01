const validateTagValue = (tagArrayState: string[], tagValue: string) => {
	if (tagValue.length < 3) {
		return
	} //TODO - show error

	if (tagArrayState.includes(tagValue)) {
		return
	} //TODO - show error

	if (tagArrayState.length >= 5) {
		return
	} //TODO - show error

	return tagValue
}

export { validateTagValue }
