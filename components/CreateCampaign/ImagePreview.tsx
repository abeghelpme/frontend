import { useElementList } from "@/lib/hooks/useElementList";
import { cn } from "@/lib/utils/cn";
import { useFormStore } from "@/store/useformStore";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

type ImagePreviewProps = {
  value: File[];
  onChange: (files: File[]) => void;
};

function ImagePreview(props: ImagePreviewProps) {
  const { value: imageFiles, onChange } = props;
  const setData = useFormStore((state) => state.setData);
  const { For: ImagePreviewList } = useElementList();

  const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));

  const handleRevokeImageUrl = (index: number) => () => {
    URL.revokeObjectURL(imageUrls[index]);
  };

  const handleRemoveImage = (imageFile: File) => () => {
    const updatedFileState = imageFiles.filter(
      (file) => file.name !== imageFile.name,
    );

    setData({ step: 3, data: { campaignImageFiles: updatedFileState } });

    onChange(updatedFileState);
  };

  return (
    <ul
      className={cn(
        "custom-scrollbar relative mt-1.3 max-h-[14rem] divide-y divide-gray-600 overflow-y-scroll rounded-6 border border-gray-600",
        imageFiles.length === 0 && "hidden",
      )}
    >
      <ImagePreviewList
        each={imageFiles}
        render={(file, index) => {
          const isCoverImage = index === 0;

          return (
            <li
              key={file.name}
              className="flex items-center justify-between p-1 text-1.2"
            >
              <div className="flex w-full items-center gap-0.8">
                <Image
                  src={imageUrls[index]}
                  className="size-[4rem] shrink-0 rounded-6 object-cover"
                  width={40}
                  height={40}
                  alt="thumbnail"
                  onLoad={handleRevokeImageUrl(index)}
                />

                {isCoverImage && (
                  <span className="absolute left-[50%] top-0 block translate-x-[-50%] text-1.2 font-bold text-formBtn">
                    *Cover image
                  </span>
                )}
                <p className="w-0 basis-full truncate">{file.name}</p>
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
