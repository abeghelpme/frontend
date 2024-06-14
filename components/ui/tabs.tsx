import { cn } from "@/lib";
import type { ForwardedRefType, InferProps } from "@/lib/type-helpers";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef } from "react";

function TabList(
	props: InferProps<typeof TabsPrimitive.List>,
	ref: ForwardedRefType<typeof TabsPrimitive.List>
) {
	const { className, ...restOfProps } = props;

	return (
		<TabsPrimitive.List
			ref={ref}
			className={cn(
				"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
				className
			)}
			{...restOfProps}
		/>
	);
}

const TabsTrigger = (
	props: InferProps<typeof TabsPrimitive.Trigger>,
	ref: ForwardedRefType<typeof TabsPrimitive.Trigger>
) => {
	const { className, ...restOfProps } = props;

	return (
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn(
				"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
				className
			)}
			{...restOfProps}
		/>
	);
};

const TabsContent = (
	props: InferProps<typeof TabsPrimitive.Content>,
	ref: ForwardedRefType<typeof TabsPrimitive.Content>
) => {
	const { className, ...restOfProps } = props;

	return (
		<TabsPrimitive.Content
			ref={ref}
			className={cn(
				"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				className
			)}
			{...restOfProps}
		/>
	);
};

const Tabs = {
	Root: TabsPrimitive.Root,
	List: forwardRef(TabList),
	Trigger: forwardRef(TabsTrigger),
	Content: forwardRef(TabsContent),
};

export default Tabs;
