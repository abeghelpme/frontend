import { cn } from "@/lib";
import type { ForwardedRefType, InferProps } from "@/lib/type-helpers";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";

function DialogOverlay(
	props: InferProps<typeof DialogPrimitive.Overlay>,
	ref: ForwardedRefType<typeof DialogPrimitive.Overlay>
) {
	const { className, ...restOfprops } = props;

	return (
		<DialogPrimitive.Overlay
			ref={ref}
			className={cn(
				"fixed inset-0 z-30 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-zinc-950/80",
				className
			)}
			{...restOfprops}
		/>
	);
}

function DialogContent(
	props: InferProps<typeof DialogPrimitive.Content>,
	ref: ForwardedRefType<typeof DialogPrimitive.Content>
) {
	const { className, children, ...restOfprops } = props;

	const Overlay = forwardRef(DialogOverlay);

	return (
		<DialogPrimitive.Portal>
			<Overlay />

			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					"fixed left-[50%] top-[50%] z-50 mx-auto grid w-[90%] max-w-[467px] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-zinc-200 bg-white py-8 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:border-zinc-800 dark:bg-zinc-950",
					className
				)}
				{...restOfprops}
			>
				{children}
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
}

function DialogHeader(
	props: InferProps<HTMLDivElement>,
	ref: ForwardedRefType<HTMLDivElement>
) {
	const { className, ...restOfProps } = props;

	return (
		<div
			ref={ref}
			className={cn(
				"flex flex-col space-y-1.5 text-center sm:text-left",
				className
			)}
			{...restOfProps}
		/>
	);
}

function DialogFooter(
	props: InferProps<HTMLDivElement>,
	ref: ForwardedRefType<HTMLDivElement>
) {
	const { className, ...restOfProps } = props;

	return (
		<div
			ref={ref}
			className={cn(
				"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
				className
			)}
			{...restOfProps}
		/>
	);
}

function DialogTitle(
	props: InferProps<typeof DialogPrimitive.Title>,
	ref: ForwardedRefType<typeof DialogPrimitive.DialogTitle>
) {
	const { className, ...restOfProps } = props;

	return (
		<DialogPrimitive.Title
			ref={ref}
			className={cn(
				"text-lg font-semibold leading-none tracking-tight",
				className
			)}
			{...restOfProps}
		/>
	);
}

function DialogDescription(
	props: InferProps<typeof DialogPrimitive.Description>,
	ref: ForwardedRefType<typeof DialogPrimitive.Description>
) {
	const { className, ...restOfProps } = props;

	return (
		<DialogPrimitive.Description
			ref={ref}
			className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}
			{...restOfProps}
		/>
	);
}

const Dialog = {
	Root: DialogPrimitive.Root,
	Close: DialogPrimitive.Close,
	Content: forwardRef(DialogContent),
	Description: forwardRef(DialogDescription),
	Footer: forwardRef(DialogFooter),
	Header: forwardRef(DialogHeader),
	Overlay: forwardRef(DialogOverlay),
	Portal: DialogPrimitive.Portal,
	Title: forwardRef(DialogTitle),
	Trigger: DialogPrimitive.Trigger,
};

export default Dialog;
