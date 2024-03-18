const generateExcerpt = (story: string) => {
	// Take the first 200 characters of the campaign story
	const first200Chars = story.slice(0, 200);

	// Find the last punctuation mark within the first 200 characters
	const lastPunctuationIndex = Math.max(
		first200Chars.lastIndexOf("."),
		first200Chars.lastIndexOf("!"),
		first200Chars.lastIndexOf("?")
	);

	// If a punctuation mark is found, use the substring from the start of the story to the last punctuation mark(inclusive) as the excerpt
	// If no punctuation mark is found, use the first 200 characters as the excerpt
	const excerpt =
		lastPunctuationIndex !== -1
			? first200Chars.slice(0, lastPunctuationIndex + 1)
			: first200Chars;

	return excerpt;
};

export { generateExcerpt };
