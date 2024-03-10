import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { isServer } from "../constants";
import type { CallbackFn } from "../type-helpers/global-type-helpers";

const useIsoMorpicEffect = isServer ? useEffect : useLayoutEffect;

const useCallbackRef = <TParams, TResult>(
	callbackFn: CallbackFn<TParams, TResult>
) => {
	const callbackRef = useRef(callbackFn);

	useIsoMorpicEffect(() => {
		// == Doing this instead updating it directly during render phase, cuz according to Dan Abramov, render should be pure
		callbackRef.current = callbackFn;
	}, [callbackFn]);

	const savedCallback = useCallback(
		(...params: TParams[]) => callbackRef.current(...params),
		[]
	);

	return savedCallback;
};

export { useCallbackRef };
