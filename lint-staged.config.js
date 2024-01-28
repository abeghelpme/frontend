module.exports = {
	'*.{js,jsx,ts,tsx,json,yaml}': [
		'biome check --apply --no-errors-on-unmatched',
	],
	'**/*.ts?(x)': () => 'npm run check-types',
};
