import { Button } from "@/components/ui";
import { validateFiles } from "@/lib/helpers/campaign";
import { allowedFileTypes } from "@/lib/helpers/campaign/validateFiles";
import { type StepThreeData, useFormStore } from "@/store";
import { toast } from "sonner";
import { DropZone, type DropZoneProps } from "../common";

type DropZoneInputProps = {
	value: StepThreeData["photos"];
	onChange: (files: StepThreeData["photos"]) => void;
};

function DropZoneInput(props: DropZoneInputProps) {
	const { value: imageFiles, onChange } = props;

	const { updateFormData } = useFormStore((state) => state.actions);

	const existingImageFiles = imageFiles.filter((file) => file instanceof File) as File[];

	const handleImageUpload: DropZoneProps["onDrop"] = ({ acceptedFiles }) => {
		if (acceptedFiles.length === 0) return;

		const newFileState = [...imageFiles, ...acceptedFiles];

		updateFormData({ photos: newFileState });

		onChange(newFileState);

		toast.success("Success", {
			description: `Uploaded ${acceptedFiles.length} file${acceptedFiles.length > 1 ? "s" : ""}!`,
		});
	};

	return (
		<DropZone
			onDrop={handleImageUpload}
			allowedFileTypes={allowedFileTypes}
			existingFiles={existingImageFiles}
			validator={validateFiles}
			classNames={{
				base: "mt-4 flex min-h-40 flex-col items-center justify-end rounded-[5px] border border-dashed border-abeg-primary py-[0.9375rem] text-xs lg:min-h-60",
			}}
			multiple={true}
		>
			<Button
				variant="primary"
				className="rounded-md p-2 text-xs font-bold lg:rounded-lg lg:px-6 lg:py-[13px] lg:text-base"
				type="button"
			>
				Upload
			</Button>

			<div className="mt-[0.9375rem] text-center text-xs lg:text-xs">
				<p className="italic text-abeg-primary">Click to select files, or Drag {`'n'`} Drop</p>

				<p className="mt-1">Support files; PDF, JPG, CSV </p>

				<p className="text-abeg-primary">Not more than 5mb</p>
			</div>
		</DropZone>
	);
}

export default DropZoneInput;
