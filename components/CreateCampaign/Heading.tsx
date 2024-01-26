import { cn } from "@/lib/utils/cn";
import type { PolymorphicProps } from "./campaign-utils/polymorphism-helper";

type HeadingElementsType = keyof typeof semanticHeadings;

const semanticHeadings = {
  h1: "font-semibold text-formBtn",
  h2: "font-bold",
};

function Heading<TElement extends HeadingElementsType>(
  props: PolymorphicProps<TElement, { as: TElement }>,
) {
  const { as: Element = "h1", children, className, ...restOfProps } = props;

  return (
    <Element
      className={cn(semanticHeadings[Element], className)}
      {...restOfProps}
    >
      {children}
    </Element>
  );
}

export default Heading;
