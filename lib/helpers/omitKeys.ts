import type { Prettify } from "../type-helpers";

export const omitKeys = <
	const TObject extends Record<string, unknown>,
	const TOmitArray extends Array<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const arrayFromFilteredObject = Object.entries(initialObject).filter(
		([key]) => !keysToOmit.includes(key)
	);

	const updatedObject = Object.fromEntries(arrayFromFilteredObject);

	return updatedObject as Prettify<Omit<TObject, TOmitArray[number]>>;
};
