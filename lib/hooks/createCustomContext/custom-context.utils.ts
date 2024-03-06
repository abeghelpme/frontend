export class ContextError extends Error {
	constructor(message: string) {
		super(message);

		this.name = "ContextError";
	}
}

export const getErrorMessage = (hook: string, provider: string) => {
	return `${hook} returned "null". Did you forget to wrap the necessary components within ${provider}?`;
};
