export type RenderPropFn<TArray extends unknown[]> = (
	item: TArray[number],
	index: number,
	array: TArray
) => React.ReactNode;

type ForPropsPartOne<TArray extends unknown[]> = {
	each: TArray;
	children: RenderPropFn<TArray>;
	render?: "Hey, Sorry but since your're currently using the children prop, the render prop is now redundant";
};

type ForPropsPartTwo<TArray extends unknown[]> = {
	each: TArray;
	children?: "Hey, Sorry but since your're currently using the render prop, so the children prop is now redundant";
	render: RenderPropFn<TArray>;
};

type ForProps<TArray extends unknown[]> = ForPropsPartOne<TArray> | ForPropsPartTwo<TArray>;

function For<TArray extends unknown[]>(props: ForProps<TArray>) {
	const { each: listOfItems, render, children } = props;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (listOfItems == null) {
		return [];
	}

	const JSXElementList = listOfItems.map((...params) => {
		const coercedParams = params as Parameters<RenderPropFn<TArray>>;

		if (typeof children === "function") {
			return children(...coercedParams);
		}

		return render(...coercedParams);
	});

	return JSXElementList;
}

export default For;
