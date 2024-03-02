import { cn } from "@/lib";
import type {
	AsProp,
	PolymorphicProps,
} from "@/lib/helpers/polymorphism-helper";

// eslint-disable-next-line no-use-before-define
type HeadingElementsType = keyof typeof semanticHeadings;
type HeadingProps<TElement extends HeadingElementsType> = Required<
	AsProp<TElement>
>;

const semanticHeadings = {
	h1: "font-bold text-base lg:text-2xl",
	h2: "font-bold text-base lg:text-2xl",
	h3: "font-bold text-base lg:text-xl",
	h4: "font-medium text-xs lg:text-xl",
};

function Heading<TElement extends HeadingElementsType = "h1">(
	props: PolymorphicProps<TElement, HeadingProps<TElement>>
) {
	const {
		as: HeadingElement = "h1",
		children,
		className,
		...restOfProps
	} = props;

	const HEADING_CLASSES = cn(semanticHeadings[HeadingElement], className);

	return (
		<HeadingElement className={HEADING_CLASSES} {...restOfProps}>
			{children}
		</HeadingElement>
	);
}

export default Heading;
