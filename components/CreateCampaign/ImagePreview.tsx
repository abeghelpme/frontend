import { useElementList } from "@/lib/hooks/useElementList";
import { cn } from "@/lib/utils";
import { useFormStore } from "@/store/formStore";
import FsLightbox from "fslightbox-react";
import { EyeIcon, ImageIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

type ImagePreviewProps = {
  value: File[];
  onChange: (files: File[]) => void;
};

function ImagePreview({ value: imageFiles, onChange }: ImagePreviewProps) {
  const setData = useFormStore((state) => state.setData);

  const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));

  useEffect(
    () => () => imageUrls.forEach((url) => URL.revokeObjectURL(url)),
    [imageUrls],
  );

  const [lightBoxControls, setLightBoxControls] = useState({
    isOpen: false,
    slide: 1,
  });

  const { For: ImagePreviewList } = useElementList();

  const handleLightBoxControls = (index: number) => () => {
    setLightBoxControls({
      isOpen: !lightBoxControls.isOpen,
      slide: index + 1,
    });
  };

  const handleRemoveImage = (imageFile: File) => () => {
    const updatedFileState = imageFiles.filter(
      (file) => file.name !== imageFile.name,
    );

    setData({ step: 3, data: { campaignImageFiles: updatedFileState } });

    onChange?.(updatedFileState);
  };

  return (
    <>
      <ul
        className={cn(
          "mt-[1.3rem] divide-y divide-gray-600 rounded-[6px] border border-gray-600",
          imageFiles.length === 0 && "hidden",
        )}
      >
        <ImagePreviewList
          each={imageFiles}
          render={(file, index) => (
            <li
              key={file.name}
              className="flex items-center justify-between p-[1.2rem]"
            >
              <div className="flex w-full items-center gap-[0.8rem]">
                <ImageIcon size={20} className="shrink-0 text-gray-700" />
                <p className="w-0 flex-grow basis-full truncate">{file.name}</p>
              </div>

              <div className="flex items-center gap-[0.8rem]">
                <button type="button" onClick={handleLightBoxControls(index)}>
                  <EyeIcon size={20} className="text-gray-700" />
                </button>

                <button type="button" onClick={handleRemoveImage(file)}>
                  <Trash2Icon size={20} className="text-red-500" />
                </button>
              </div>
            </li>
          )}
        />
      </ul>

      <FsLightbox
        key={imageUrls.length}
        toggler={lightBoxControls.isOpen}
        sources={imageUrls}
        slide={lightBoxControls.slide}
      />
    </>
  );
}

export default ImagePreview;
