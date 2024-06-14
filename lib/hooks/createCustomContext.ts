import { createContext, useContext } from "react";

export class ContextError extends Error {
	override name = "ContextError";
}

export const getErrorMessage = (hook: string, provider: string) => {
	return `${hook} returned "null". Did you forget to wrap the necessary components within ${provider}?`;
};

export type CustomContextOptions<TDefaultContextValue, TStrict extends boolean> = {
	name?: string;
	hookName?: string;
	providerName?: string;
	errorMessage?: string;
	strict?: TStrict;
	defaultValue?: TDefaultContextValue | null;
};

type UseCustomContextResult<TContextValue, TStrict extends boolean> = TStrict extends true
	? TContextValue
	: TContextValue | null;

const createCustomContext = <TContextValue, TStrict extends boolean = true>(
	options: CustomContextOptions<TContextValue, TStrict> = {}
) => {
	const {
		name = "Unnamed Context",
		hookName = "Unnamed Context hook",
		providerName = "Unnamed Provider",
		strict = true,
		errorMessage,
		defaultValue = null,
	} = options;

	const Context = createContext<TContextValue | null>(defaultValue);

	Context.displayName = name;

	const useCustomContext = (): UseCustomContextResult<TContextValue, TStrict> => {
		const contextValue = useContext(Context);

		if (strict && contextValue === null) {
			throw new ContextError(errorMessage ?? getErrorMessage(hookName, providerName));
		}

		return contextValue as UseCustomContextResult<TContextValue, TStrict>;
	};

	return [Context.Provider, useCustomContext] as const;
};

export { createCustomContext };
