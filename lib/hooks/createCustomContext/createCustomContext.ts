import { createContext, useContext } from "react";
import { ContextError, getErrorMessage } from "./custom-context.utils";
import type { CustomContextOptions } from "./customContext.types";

const createCustomContext = <TContextValue>(options: CustomContextOptions<TContextValue>) => {
	const {
		name = "Unnamed Context",
		hookName = "Unnamed Context hook",
		providerName = "Unnamed Provider",
		errorMessage,
		defaultValue = null,
	} = options;

	const Context = createContext<TContextValue | null>(defaultValue);

	Context.displayName = name;

	const useCustomContext = () => {
		const contextValue = useContext(Context);

		if (contextValue === null) {
			throw new ContextError(errorMessage ?? getErrorMessage(hookName, providerName));
		}

		return contextValue;
	};

	return [Context.Provider, useCustomContext] as const;
};

export { createCustomContext };
