import { Button } from "@/components/ui";
import { cn } from "@/lib";
import { acceptedFilesString, validateFiles } from "@/lib/helpers/campaign";
import { useToggle } from "@/lib/hooks";
<<<<<<< HEAD
import { type StepThreeData, useFormStore } from "@/store";
=======
import { useInitCampaignForm } from "@/store/useCampaignForm";
>>>>>>> 25e901c (refactor)
import type { ChangeEvent, DragEvent } from "react";
import { toast } from "sonner";

type DropZoneInputProps = {
<<<<<<< HEAD
	value: StepThreeData["photos"];
	onChange: (files: StepThreeData["photos"]) => void;
=======
	value: File[];
	onChange: (files: string[]) => void;
>>>>>>> 25e901c (refactor)
};

function DropZoneInput(props: DropZoneInputProps) {
	const { value: imageFiles, onChange } = props;

	const [isDragActive, toggleIsDragActive] = useToggle(false);

<<<<<<< HEAD
	const { updateFormData } = useFormStore((state) => state.actions);

=======
>>>>>>> 25e901c (refactor)
	const handleImageUpload = (
		event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>
	) => {
		event.type === "drop" && toggleIsDragActive(false);

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

		const realImageFiles = imageFiles.filter(
			(file) => file instanceof File
		) as File[];

		const validFilesArray = validateFiles(fileList, realImageFiles);

		if (validFilesArray.length === 0) return;

		const base64Files: string[] = [];

<<<<<<< HEAD
		updateFormData({ photos: newFileState });
=======
		// convert file to base 64 strings
		validFilesArray.map((file) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				base64Files.push(reader.result as string);
			};
		});
>>>>>>> 25e901c (refactor)

		const newFileState = [...imageFiles, ...base64Files];
		useInitCampaignForm.setState({
			...useInitCampaignForm.getState(),
			fileBlobs: validFilesArray,
			localImages: [
				...useInitCampaignForm.getState().localImages,
				...base64Files,
			],
		});

		onChange(newFileState as string[]);

		toast.success("Success", {
			description: `Uploaded ${validFilesArray.length} file${
				validFilesArray.length > 1 ? "s" : ""
			}!`,
		});
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
				"relative mt-4 flex min-h-40 flex-col items-center justify-end rounded-[5px] border border-dashed border-abeg-primary py-[0.9375rem] text-xs lg:min-h-60",
				isDragActive && "opacity-60"
			)}
		>
			<Button
				variant="primary"
				className="rounded-md p-2 text-xs font-bold lg:rounded-lg lg:px-6 lg:py-[13px] lg:text-base"
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

			<div className="mt-[0.9375rem] text-center text-xs lg:text-xs">
				<p className="italic text-abeg-primary">
					Click to select files, or Drag {`'n'`} Drop
				</p>

				<p className="mt-1">Support files; PDF, JPG, CSV </p>

				<p className="text-abeg-green">Not more than 5mb</p>
			</div>
		</div>
	);
}

export default DropZoneInput;
