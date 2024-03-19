/* eslint-disable @typescript-eslint/array-type */
import type {
	ForwardedRefType,
	PolymorphicPropsWithRef,
} from "@/lib/type-helpers";
import { forwardRef } from "react";

// prettier-ignore
type RenderPropFn<TArray extends ReadonlyArray<unknown>> = (
	item: TArray[number],
	index: number,
	array: TArray
) => React.ReactNode;

export type EachProp<TArray extends ReadonlyArray<unknown>> = { each: TArray };

export type ForRenderProps<TArray extends ReadonlyArray<unknown>> =
	| {
			children: RenderPropFn<TArray>;
			render?: "Hey, Sorry but since your're currently using the children prop, the render prop is now redundant";
	  }
	| {
			children?: "Hey, Sorry but since your're currently using the render prop, so the children prop is now redundant";
			render: RenderPropFn<TArray>;
	  };

type ForProps<TArray extends ReadonlyArray<unknown>> = ForRenderProps<TArray> &
	EachProp<TArray>;

function For<TArray extends ReadonlyArray<unknown>>(props: ForProps<TArray>) {
	const { each, render, children } = props;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (each == null) {
		return [];
	}

	const JSXElementList = each.map((...params) => {
		const coercedParams = params as Parameters<RenderPropFn<TArray>>;

		if (typeof children === "function") {
			return children(...coercedParams);
		}

		return render(...coercedParams);
	});

	return JSXElementList;
}

function ForList<
	TArray extends ReadonlyArray<unknown>,
	TElement extends React.ElementType = "ul",
>(
	props: PolymorphicPropsWithRef<
		TElement,
		ForProps<TArray> & { className?: string }
	>,
	ref: ForwardedRefType<HTMLElement>
) {
	const {
		each,
		render,
		children,
		as: ListContainer = "ul",
		className,
		...restOfListProps
	} = props;

	return (
		<ListContainer className={className} {...restOfListProps} ref={ref}>
			<For {...({ each, render, children } as ForProps<TArray>)} />
		</ListContainer>
	);
}

const ForObject = {
	For,
	ForList: forwardRef(ForList) as typeof ForList,
};

export default ForObject;
