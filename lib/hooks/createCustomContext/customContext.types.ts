export type CustomContextOptions<TDefaultContextValue> = {
	name?: string;
	hookName?: string;
	providerName?: string;
	errorMessage?: string;
	defaultValue?: TDefaultContextValue | null;
};
