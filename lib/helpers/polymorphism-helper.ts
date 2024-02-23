export type AsProp<TElement extends React.ElementType> = {
	as?: TElement;
};

type RefProp<TElement extends React.ElementType> = {
	ref?: React.ComponentPropsWithRef<TElement>["ref"];
};

type MergePropsWithAsProp<
	TElement extends React.ElementType,
	TProps,
> = AsProp<TElement> & TProps;

// Get all other primitive element props by Omit the result of MergedProps from React.ComponentPropsWithoutRef
type GetOtherPrimitiveProps<TElement extends React.ElementType, TProps> = Omit<
	React.ComponentPropsWithoutRef<TElement>,
	keyof MergePropsWithAsProp<TElement, TProps>
>;

export type PolymorphicProps<
	TElement extends React.ElementType,
	TProps extends Record<string, unknown> = AsProp<TElement>,
> = MergePropsWithAsProp<TElement, TProps> &
	GetOtherPrimitiveProps<TElement, TProps>;

// For Components with Ref Prop
export type PolymorphicPropsWithRef<
	TElement extends React.ElementType,
	TProps extends Record<string, unknown> = AsProp<TElement>,
> = PolymorphicProps<TElement, TProps> & RefProp<TElement>;
