import { cn } from "@/lib";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

type ForwardedRefType<TComponent extends React.ElementType> =
	React.ForwardedRef<React.ElementRef<TComponent>>;

type TogglePropsType<TComponent extends React.ElementType> =
	React.ComponentPropsWithoutRef<TComponent> &
		VariantProps<typeof toggleVariants>;

function Toggle(
	props: TogglePropsType<typeof TogglePrimitive.Root>,
	ref: ForwardedRefType<typeof TogglePrimitive.Root>
) {
	const { className, variant, size, ...restOfProps } = props;

	return (
		<TogglePrimitive.Root
			ref={ref}
			className={cn(toggleVariants({ variant, size, className }))}
			{...restOfProps}
		/>
	);
}

export default forwardRef(Toggle);

export const toggleVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-10",
				sm: "h-9",
				lg: "h-11",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);
