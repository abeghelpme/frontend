import { cn } from "@/lib";
import { useToggle } from "@/lib/hooks/useToggle";
import { useFormStore } from "@/store/formStore";
import type { ChangeEvent, DragEvent } from "react";
import Button from "../ui/button";
import { toast } from "../ui/use-toast";
import { validateFiles } from "./campaign-utils";
import { acceptedFilesString } from "./campaign-utils/constants";

type DropZoneInputProps = {
	value: File[];
	onChange: (files: File[]) => void;
};

function DropZoneInput(props: DropZoneInputProps) {
	const { value: imageFiles, onChange } = props;

	const [isDragActive, toggleIsDragActive] = useToggle(false);

	const { setData } = useFormStore((state) => state.actions);

	const handleImageUpload = (
		event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>
	) => {
		event.type === "drop" && toggleIsDragActive(false);

		const fileList =
			event.type === "drop"
				? (event as DragEvent).dataTransfer.files
				: (event as ChangeEvent<HTMLInputElement>).target.files;

		if (fileList === null) {
			toast({
				title: "Error",
				description: "No file selected",
				duration: 3000,
				variant: "destructive",
			});

			return;
		}

		const validFilesArray = validateFiles(fileList, imageFiles);

		if (validFilesArray.length === 0) return;

		const newFileState = [...imageFiles, ...validFilesArray];

		setData({ step: 3, data: { photos: newFileState } });

		onChange(newFileState);
	};

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		toggleIsDragActive(true);
	};

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		toggleIsDragActive(false);
	};

	return (
		<div
			onDrop={handleImageUpload}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={cn(
				"relative mt-1.6 flex min-h-[16.1rem] lg:min-h-[24.2rem] flex-col items-center justify-end rounded-[5px] border border-dashed border-formBtn py-1.5 text-1",
				isDragActive && "opacity-60"
			)}
		>
			<Button
				variant="primary"
				className=" bg-formBtn p-0.8 text-1.2 font-bold lg:text-1.6 lg:px-2.6 lg:py-1.3"
				type="button"
			>
				Upload
			</Button>

			<input
				className="absolute inset-0 cursor-pointer opacity-0"
				type="file"
				accept={acceptedFilesString}
				onChange={handleImageUpload}
				multiple
			/>

			<div className="mt-1.5 text-center text-1 lg:text-1.2">
				<p className="italic text-formBtn">
					Click to select files, or Drag {`'n'`} Drop
				</p>

				<p className="mt-0.3">Support files; PDF, JPG, CSV </p>

				<p className="text-abeg-green">Not more than 5mb</p>
			</div>
		</div>
	);
}

export default DropZoneInput;
