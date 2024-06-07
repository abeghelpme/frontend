import { cn } from "@/lib";
import { handleFileValidation } from "@/lib/helpers/campaign/validateFiles";
import { useToggle } from "@/lib/hooks";
import type React from "react";
import type { ChangeEvent, DragEvent } from "react";
import { toast } from "sonner";

type InputProps = Omit<React.ComponentPropsWithRef<"input">, "className" | "onDrop"> & {
	classNames?: { base?: string; input?: string; dragInProgress?: string };
};

export type DropZoneProps =
	| {
			existingFiles?: File[];

			allowedFileTypes?: string[];

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			validator?: (...params: any[]) => File[];

			validationRules?: never;

			onDrop: (details: {
				acceptedFiles: File[];
				event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>;
			}) => void;
	  }
	| {
			existingFiles?: File[];

			allowedFileTypes?: string[];

			validationRules?: {
				fileLimit?: number;
				maxFileSize?: number;
				disallowDuplicates?: boolean;
			};

			validator?: never;

			onDrop: (details: {
				acceptedFiles: File[];
				event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>;
			}) => void;
	  };

function DropZone(props: DropZoneProps & InputProps) {
	const {
		onDrop,
		validationRules,
		validator,
		allowedFileTypes,
		existingFiles,
		classNames,
		children,
		...restOfInputProps
	} = props;

	const [isDragging, toggleIsDragging] = useToggle(false);

	const handleImageUpload = (event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>) => {
		if (event.type === "drop") {
			event.preventDefault();
			toggleIsDragging(false);
		}

		const fileList =
			event.type === "drop"
				? (event as DragEvent).dataTransfer.files
				: (event as ChangeEvent<HTMLInputElement>).target.files;

		if (fileList === null) {
			toast.error("Error", {
				description: "No file selected",
			});

			return;
		}

		const filesArray = validator
			? validator(fileList, existingFiles)
			: handleFileValidation(fileList, existingFiles, { ...validationRules, allowedFileTypes });

		onDrop({ acceptedFiles: filesArray, event });
	};

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		toggleIsDragging(true);
	};

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		toggleIsDragging(false);
	};

	return (
		<div
			onDrop={handleImageUpload}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={cn(
				"relative",
				classNames?.base,
				isDragging && ["opacity-60", classNames?.dragInProgress]
			)}
		>
			<input
				className="absolute inset-0 cursor-pointer opacity-0"
				type="file"
				{...(allowedFileTypes && { accept: allowedFileTypes.join(", ") })}
				onChange={handleImageUpload}
				{...restOfInputProps}
			/>

			{children}
		</div>
	);
}

export default DropZone;
