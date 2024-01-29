import { cn } from "@/lib/helpers/cn";
import type {
  AsProp,
  PolymorphicProps,
} from "./campaign-utils/polymorphism-helper";

type HeadingElementsType = keyof typeof semanticHeadings;

const semanticHeadings = {
  h1: "font-semibold text-formBtn",
  h2: "font-bold lg:text-2.4",
  h3: "font-bold lg:text-2",
};

type HeadingProps<TElement extends HeadingElementsType> = Required<
  AsProp<TElement>
>;

function Heading<TElement extends HeadingElementsType = "h1">(
  props: PolymorphicProps<TElement, HeadingProps<TElement>>,
) {
  const {
    as: HeadingElement = "h1",
    children,
    className,
    ...restOfProps
  } = props;

  return (
    <HeadingElement
      className={cn(semanticHeadings[HeadingElement], className)}
      {...restOfProps}
    >
      {children}
    </HeadingElement>
  );
}

export default Heading;
