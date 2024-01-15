import { useToggle } from "@/lib/hooks/useToggle";
import { useFormStore } from "@/store/formStore";
import type { ChangeEvent, DragEvent } from "react";
import Button from "../primitives/Button/button";
import { toast } from "../ui/use-toast";
import { acceptedFilesString } from "./campaign.constants";
import { validateFiles } from "./campaign.utils";

type DropZoneInputProps = {
  value: File[];
  onChange: (files: File[]) => void;
};

function DropZoneInput(props: DropZoneInputProps) {
  const { value: imageFiles = [], onChange } = props;

  const setData = useFormStore((state) => state.setData);

  const [, toggleIsDragActive] = useToggle(false);

  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>,
  ) => {
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

    const validatedFileList = validateFiles(imageFiles, fileList);

    if (validatedFileList.length === 0) return;

    const newFileState = [...imageFiles, ...validatedFileList];

    setData({ step: 3, data: { campaignImageFiles: newFileState } });

    onChange?.(newFileState);
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
      className="relative mt-[1.6rem] flex min-h-[16.1rem] flex-col items-center justify-end rounded-[5px] border border-dashed border-formBtn py-[1.5rem] text-[1rem]"
    >
      <Button
        variant="primary"
        className=" bg-formBtn p-[0.8rem] text-[1.2rem] font-bold "
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

      <p className="mb-[0.3rem] mt-[1.5rem] text-[1.2rem] italic text-formBtn">
        Click to select files, or Drag {`'n'`} Drop
      </p>
      <p>Support files; PDF, JPG, CSV </p>
      <p className="text-abeg-green">Not more than 5mb</p>
    </div>
  );
}

export default DropZoneInput;
