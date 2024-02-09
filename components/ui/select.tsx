import { cn } from "@/lib/helpers/cn";
import {
	CaretSortIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef } from "react";

type ForwardedRefType<TComponent extends React.ElementType> =
	React.ForwardedRef<React.ElementRef<TComponent>>;

type SelectPropsType<TComponent extends React.ElementType> =
	React.ComponentPropsWithoutRef<TComponent>;

function SelectTrigger(
	props: SelectPropsType<typeof SelectPrimitive.Trigger> & {
		icon?: React.JSX.Element;
	},
	ref: ForwardedRefType<typeof SelectPrimitive.Trigger>
) {
	const { children, icon, className, ...restOfProps } = props;

	return (
		<SelectPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex h-[3.6rem] w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-[1.2rem] py-[0.8rem] text-sm shadow-sm ring-offset-background placeholder:text-placeholder focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
				className
			)}
			{...restOfProps}
		>
			{children}

			<SelectPrimitive.Icon asChild>
				{icon ?? <CaretSortIcon className="size-[1.6rem] opacity-50" />}
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectScrollUpButton(
	props: SelectPropsType<typeof SelectPrimitive.ScrollUpButton>,
	ref: ForwardedRefType<typeof SelectPrimitive.ScrollUpButton>
) {
	const { className, ...restOfProps } = props;

	return (
		<SelectPrimitive.ScrollUpButton
			ref={ref}
			className={cn(
				"flex cursor-default items-center justify-center py-[0.4rem]",
				className
			)}
			{...restOfProps}
		>
			<ChevronUpIcon />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton(
	props: SelectPropsType<typeof SelectPrimitive.ScrollDownButton>,
	ref: ForwardedRefType<typeof SelectPrimitive.ScrollDownButton>
) {
	const { className, ...restOfProps } = props;

	return (
		<SelectPrimitive.ScrollDownButton
			ref={ref}
			className={cn(
				"flex cursor-default items-center justify-center py-[0.4rem]",
				className
			)}
			{...restOfProps}
		>
			<ChevronDownIcon />
		</SelectPrimitive.ScrollDownButton>
	);
}

function SelectContent(
	props: SelectPropsType<typeof SelectPrimitive.Content>,
	ref: ForwardedRefType<typeof SelectPrimitive.Content>
) {
	const { className, children, position = "popper", ...restOfProps } = props;

	const ScrollDownButton = forwardRef(SelectScrollDownButton);
	const ScrollUpButton = forwardRef(SelectScrollUpButton);

	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				ref={ref}
				className={cn(
					"relative z-50 max-h-[24rem] min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-[0.8rem] data-[side=left]:slide-in-from-right-[0.8rem] data-[side=right]:slide-in-from-left-[0.8rem] data-[side=top]:slide-in-from-bottom-[0.8rem]",
					position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
					className
				)}
				position={position}
				{...restOfProps}
			>
				<ScrollUpButton />

				<SelectPrimitive.Viewport
					className={cn(
						"p-[0.4rem]",
						position === "popper" &&
							"h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]"
					)}
				>
					{children}
				</SelectPrimitive.Viewport>

				<ScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel(
	props: SelectPropsType<typeof SelectPrimitive.Label>,
	ref: ForwardedRefType<typeof SelectPrimitive.Label>
) {
	const { className, ...restOfProps } = props;

	return (
		<SelectPrimitive.Label
			ref={ref}
			className={cn("px-[0.8rem] py-[0.6rem] text-sm font-semibold", className)}
			{...restOfProps}
		/>
	);
}

function SelectItem(
	props: SelectPropsType<typeof SelectPrimitive.Item>,
	ref: ForwardedRefType<typeof SelectPrimitive.Item>
) {
	const { className, children, ...restOfProps } = props;

	return (
		<SelectPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex w-full cursor-default select-none items-center rounded-lg py-[0.6rem] pl-[0.8rem] pr-[2rem] text-1 outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className
			)}
			{...restOfProps}
		>
			<span className="absolute right-[0.8rem] flex size-1 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<CheckIcon className="size-[1rem]" />
				</SelectPrimitive.ItemIndicator>
			</span>

			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator(
	props: SelectPropsType<typeof SelectPrimitive.Separator>,
	ref: ForwardedRefType<typeof SelectPrimitive.Separator>
) {
	const { className, ...restOfProps } = props;

	return (
		<SelectPrimitive.Separator
			ref={ref}
			className={cn("-mx-[0.4rem] my-[0.4rem] h-px bg-muted", className)}
			{...restOfProps}
		/>
	);
}

const Select = {
	Root: SelectPrimitive.Root,
	Content: forwardRef(SelectContent),
	Group: SelectPrimitive.Group,
	Item: forwardRef(SelectItem),
	Label: forwardRef(SelectLabel),
	ScrollDownButton: forwardRef(SelectScrollDownButton),
	ScrollUpButton: forwardRef(SelectScrollUpButton),
	Separator: forwardRef(SelectSeparator),
	Trigger: forwardRef(SelectTrigger),
	Value: SelectPrimitive.Value,
};

export { Select, SelectPrimitive };
