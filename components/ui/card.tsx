import type { PolymorphicProps } from "@/lib/type-helpers";
import { Slot } from "@radix-ui/react-slot";

type CardProps = {
	className?: string;
	children?: React.ReactNode;
};

function Card<TElement extends React.ElementType = "article">(
	props: PolymorphicProps<TElement, CardProps & { asChild?: boolean }>
) {
	const { as: Element = "article", children, asChild, ...restOfProps } = props;

	const Component = asChild ? Slot : Element;

	return <Component {...restOfProps}>{children}</Component>;
}

function CardHeader<TElement extends React.ElementType = "header">(
	props: PolymorphicProps<TElement, CardProps & { asChild?: boolean }>
) {
	const { as: Element = "header", asChild, children, ...restOfProps } = props;

	const Component = asChild ? Slot : Element;

	return <Component {...restOfProps}>{children}</Component>;
}

function CardContent<TElement extends React.ElementType = "div">(
	props: PolymorphicProps<TElement, CardProps>
) {
	const { as: Element = "div", children, ...restOfProps } = props;

	return <Element {...restOfProps}>{children}</Element>;
}

function CardFooter<TElement extends React.ElementType = "footer">(
	props: PolymorphicProps<TElement, CardProps>
) {
	const { as: Element = "footer", children, ...restOfProps } = props;

	return <Element {...restOfProps}>{children}</Element>;
}

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
