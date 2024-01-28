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

type OtherValidProps<TElement extends React.ElementType, TProps> = Omit<
  React.ComponentPropsWithoutRef<TElement>,
  keyof MergePropsWithAsProp<TElement, TProps>
>;

export type PolymorphicProps<
  TElement extends React.ElementType,
  TProps extends Record<string, unknown> = AsProp<TElement>,
> = MergePropsWithAsProp<TElement, TProps> & OtherValidProps<TElement, TProps>;

export type PolymorphicPropsWithRef<
  TElement extends React.ElementType,
  TProps extends Record<string, unknown> = AsProp<TElement>,
> = PolymorphicProps<TElement, TProps> & RefProp<TElement>;
