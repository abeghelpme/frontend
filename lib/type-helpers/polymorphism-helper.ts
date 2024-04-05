export type AsProp<TElement extends React.ElementType = React.ElementType> = {
	as?: TElement;
};

type PropsWithOptionalAs<
	TElement extends React.ElementType,
	TProps,
> = "as" extends keyof TProps ? TProps : TProps & AsProp<TElement>;

// == Get all other primitive element props by Omit the result of MergedProps from React.ComponentPropsWithoutRef
type InferOtherProps<TElement extends React.ElementType, TProps> = Omit<
	React.ComponentPropsWithoutRef<TElement>,
	// == Removing children and className as well to give components control over these props
	keyof PropsWithOptionalAs<TElement, TProps> | "className" | "children"
>;

// == Polymorphic props helper
export type PolymorphicProps<
	TElement extends React.ElementType,
	TProps extends Record<string, unknown> = AsProp<TElement>,
> = PropsWithOptionalAs<TElement, TProps> & InferOtherProps<TElement, TProps>;

type RefProp<TElement extends React.ElementType> = {
	ref?: React.ComponentPropsWithRef<TElement>["ref"];
};

// == For components with the Ref Prop
export type PolymorphicPropsWithRef<
	TElement extends React.ElementType,
	TProps extends Record<string, unknown> = AsProp<TElement>,
> = PolymorphicProps<TElement, TProps> & RefProp<TElement>;
