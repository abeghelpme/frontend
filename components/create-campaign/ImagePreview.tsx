import { cn } from "@/lib";
import { useElementList } from "@/lib/hooks";
import { useFormStore } from "@/store/formStore";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

type ImagePreviewProps = {
	value: File[];
	onChange: (files: File[]) => void;
};

function ImagePreview(props: ImagePreviewProps) {
	const { value: imageFiles, onChange } = props;

	const { setData } = useFormStore((state) => state.actions);

	const { For: ImagePreviewList } = useElementList();

	const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));

	const handleRevokeImageUrl = (index: number) => () => {
		URL.revokeObjectURL(imageUrls[index]);
	};

	const handleRemoveImage = (imageFile: File) => () => {
		const updatedFileState = imageFiles.filter(
			(file) => file.name !== imageFile.name
		);

		setData({ step: 3, data: { photos: updatedFileState } });

		onChange(updatedFileState);
	};

	return (
		<ul
			className={cn(
				"mt-@1.3 custom-scrollbar relative max-h-[14rem] divide-y divide-gray-600 overflow-y-auto overscroll-y-contain rounded-md border border-gray-600",
				imageFiles.length === 0 && "hidden"
			)}
		>
			<ImagePreviewList
				each={imageFiles}
				render={(file, index) => {
					const isCoverImage = index === 0;

					return (
						<li
							key={file.name}
							className="px-@1 py-@0.8 flex items-center justify-between text-xs"
						>
							<div className="gap-@0.8 flex min-w-0 items-center">
								<Image
									src={imageUrls[index]}
									className="size-[4rem] shrink-0 rounded-md object-cover"
									width={40}
									height={40}
									alt="thumbnail"
									onLoad={handleRevokeImageUrl(index)}
								/>

								{isCoverImage && (
									<span className="absolute left-[50%] top-0.5 block translate-x-[-50%] text-xs font-bold text-abeg-primary">
										*Cover image
									</span>
								)}
								<p className="truncate">{file.name}</p>
							</div>

							<button type="button" onClick={handleRemoveImage(file)}>
								<Trash2Icon
									size={20}
									className="text-red-500 active:scale-110"
								/>
							</button>
						</li>
					);
				}}
			/>
		</ul>
	);
}

export default ImagePreview;
