import { cn } from "@/lib";
import type {
	AsProp,
	PolymorphicProps,
} from "./campaign-utils/polymorphism-helper";

const semanticHeadings = {
	h1: "font-semibold text-formBtn lg:text-2.4",
	h2: "font-bold lg:text-2.4",
	h3: "font-bold lg:text-2",
};

type HeadingElementsType = keyof typeof semanticHeadings;

type HeadingProps<TElement extends HeadingElementsType> = Required<
	AsProp<TElement>
>;

function Heading<TElement extends HeadingElementsType = "h1">(
	props: PolymorphicProps<TElement, HeadingProps<TElement>>
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
