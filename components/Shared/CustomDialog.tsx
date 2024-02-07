import {
	Dialog as DialogComp,
	DialogClose,
	DialogContent,
	DialogTrigger,
} from "@/components";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { type ReactNode, type SetStateAction } from "react";

type DialogProps = {
	children: ReactNode;
	trigger: ReactNode;
	openDialog?: boolean;
	setOpen?: (value: SetStateAction<boolean>) => void;
};

const CustomDialog = ({
	children,
	trigger,
	openDialog,
	setOpen,
}: DialogProps) => {
	return (
		<DialogComp open={openDialog} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="px-4 pt-9 md:px-6 lg:px-8">
				{children}
				<DialogClose className="dar:ring-offset-zinc-950 dar:focus:ring-zinc-300 dar:data-[state=open]:text-zinc-400 absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-500 dark:data-[state=open]:bg-zinc-800">
					<CrossCircledIcon className="h-5 w-5" />
					<span className="sr-only">Close</span>
				</DialogClose>
			</DialogContent>
		</DialogComp>
	);
};
export default CustomDialog;
