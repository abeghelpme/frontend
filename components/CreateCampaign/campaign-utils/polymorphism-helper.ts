type WithChildren<TProps> = TProps & {
  children: React.ReactNode;
};

type AsPropObject<TElement extends React.ElementType> = { as?: TElement };

type RefPropObject<TElement extends React.ElementType> = {
  ref?: React.ComponentPropsWithRef<TElement>["ref"];
};

type MergePropsWithAs<
  TElement extends React.ElementType,
  TProps,
> = WithChildren<AsPropObject<TElement> & TProps>;

type GetRestOfProps<TElement extends React.ElementType, TProps> = Omit<
  React.ComponentPropsWithoutRef<TElement>,
  keyof MergePropsWithAs<TElement, TProps>
>;

export type PolymorphicProps<
  TElement extends React.ElementType,
  TProps extends Record<string, unknown> = AsPropObject<TElement>,
> = MergePropsWithAs<TElement, TProps> & GetRestOfProps<TElement, TProps>;

export type PolymorphicPropsWithRef<
  TElement extends React.ElementType,
  TProps extends Record<string, unknown> = AsPropObject<TElement>,
> = PolymorphicProps<TElement, TProps> & RefPropObject<TElement>;
