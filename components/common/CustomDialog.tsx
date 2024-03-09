import { Dialog } from "@/components/ui";
import { cn } from "@/lib";
import type { DialogProps } from "@radix-ui/react-dialog";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";

type CustomDialogProps = {
	children: ReactNode;
	trigger?: ReactNode;
	isOpen?: boolean;
	hasCloseButton?: boolean;
	classNames?: {
		content?: string;
	};
	setIsOpen?: DialogProps["onOpenChange"];
};

function CustomDialog(props: CustomDialogProps) {
	const {
		children,
		classNames,
		trigger,
		isOpen,
		setIsOpen,
		hasCloseButton = true,
	} = props;

	return (
		<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

			<Dialog.Content
				className={cn("px-4 pt-9 md:px-6 lg:px-8", classNames?.content)}
			>
				{children}

				{hasCloseButton && (
					<Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-500 ">
						<CrossCircledIcon className="size-7" />

						<span className="sr-only">Close</span>
					</Dialog.Close>
				)}
			</Dialog.Content>
		</Dialog.Root>
	);
}

export default CustomDialog;
