import { Button, DropZone, type DropZoneProps } from "@/components/ui";
import { validateFiles } from "@/lib/helpers/campaign";
import { allowedFileTypes } from "@/lib/helpers/campaign/validateFiles";
import { type StepThreeData, useFormStore } from "@/store";
import { toast } from "sonner";

type DropZoneInputProps = {
	value: StepThreeData["photos"];
	onChange: (files: StepThreeData["photos"]) => void;
};

function DropZoneInput(props: DropZoneInputProps) {
	const { value: imageFilesOrString, onChange } = props;

	const { updateFormData } = useFormStore((state) => state.actions);

	const handleImageUpload: DropZoneProps["onDrop"] = ({ acceptedFiles }) => {
		const newFileState = [...imageFilesOrString, ...acceptedFiles];

		updateFormData({ photos: newFileState });

		onChange(newFileState);

		toast.success("Success", {
			description: `Uploaded ${acceptedFiles.length} file${acceptedFiles.length > 1 ? "s" : ""}!`,
		});
	};

	const realImageFiles = imageFilesOrString.filter((file): file is File => file instanceof File);

	return (
		<DropZone
			multiple={true}
			onDrop={handleImageUpload}
			allowedFileTypes={allowedFileTypes}
			existingFiles={realImageFiles}
			validator={validateFiles}
			classNames={{
				base: "mt-4 flex min-h-40 flex-col items-center justify-end rounded-[5px] border border-dashed border-abeg-primary py-[0.9375rem] text-xs lg:min-h-60",
			}}
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
