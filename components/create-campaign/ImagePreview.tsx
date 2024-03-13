import { cn } from "@/lib";
import { useElementList } from "@/lib/hooks";
<<<<<<< HEAD
import { type StepThreeData, useFormStore } from "@/store";
=======
import { useInitCampaignForm } from "@/store/useCampaignForm";
>>>>>>> 25e901c (refactor)
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

type ImagePreviewProps = {
<<<<<<< HEAD
	value: StepThreeData["photos"];
	onChange: (files: StepThreeData["photos"]) => void;
=======
	value: string[];
	onChange: (files: string[]) => void;
>>>>>>> 25e901c (refactor)
};

function ImagePreview(props: ImagePreviewProps) {
	const { value: imageFiles, onChange } = props;

<<<<<<< HEAD
	const { updateFormData } = useFormStore((state) => state.actions);

	const { For: ImagePreviewList } = useElementList();

	const imageUrls = imageFiles.map((file) => {
		if (file instanceof File) {
			return URL.createObjectURL(file);
		}

		return file;
	});

	const handleRemoveImage =
		(imageFile: StepThreeData["photos"][number]) => () => {
			const updatedFileState = imageFiles.filter((file) => {
				if (file instanceof File && imageFile instanceof File) {
					return file.name !== imageFile.name;
				}

				if (typeof file === "string" && typeof imageFile === "string") {
					return file !== imageFile;
				}

				return false;
			});

			updateFormData({ photos: updatedFileState });

			onChange(updatedFileState);
		};
=======
	const { For: ImagePreviewList } = useElementList();

	const handleRemoveImage = (image: string) => () => {
		const filteredImages = imageFiles.filter((img) => img !== image);
		useInitCampaignForm.setState({
			...useInitCampaignForm.getState(),
			localImages: filteredImages,
		});
		onChange(filteredImages);
	};
>>>>>>> 25e901c (refactor)

	return (
		<ul
			className={cn(
				"custom-scrollbar relative mt-[13px] max-h-[140px] divide-y divide-gray-600 overflow-y-auto overscroll-y-contain rounded-md border border-gray-600",
				imageFiles.length === 0 && "hidden"
			)}
		>
			<ImagePreviewList
				each={imageFiles}
				render={(file, index) => {
					const isCoverImage = index === 0;

					return (
						<li
<<<<<<< HEAD
							key={file instanceof File ? file.name : file}
=======
							key={file}
>>>>>>> 25e901c (refactor)
							className="flex items-center justify-between p-2 text-xs"
						>
							<div className="flex min-w-0 items-center gap-2">
								<Image
<<<<<<< HEAD
									src={imageUrls[index]}
									className="size-[50px] shrink-0 rounded-md object-cover"
									width={50}
									height={50}
									fetchPriority="high"
									priority
=======
									src={file}
									className="size-[40px] shrink-0 rounded-md object-cover"
									width={40}
									height={40}
>>>>>>> 25e901c (refactor)
									alt="thumbnail"
								/>

								{file instanceof File && (
									<p className="truncate">{file.name}</p>
								)}

								{isCoverImage && (
									<span className="absolute left-[50%] top-0.5 block translate-x-[-50%] text-xs font-bold text-abeg-primary">
										*Cover image
									</span>
								)}
							</div>

							{file instanceof File && (
								<button type="button" onClick={handleRemoveImage(file)}>
									<Trash2Icon
										size={20}
										className="text-red-500 active:scale-110"
									/>
								</button>
							)}
						</li>
					);
				}}
			/>
		</ul>
	);
}

export default ImagePreview;
