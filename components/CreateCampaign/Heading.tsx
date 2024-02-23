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
	h1: "font-semibold lg:text-xl.4",
	h2: "font-bold lg:text-xl.4",
	h3: "font-bold lg:text-xl",
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
