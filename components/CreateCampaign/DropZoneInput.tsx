import { useToggle } from "@/lib/hooks/useToggle";
import { cn } from "@/lib/utils/cn";
import { useFormStore } from "@/store/useformStore";
import type { ChangeEvent, DragEvent } from "react";
import Button from "../primitives/Button/button";
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

  const setData = useFormStore((state) => state.setData);

  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>,
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

    const validatedFileList = validateFiles(fileList, imageFiles);

    if (validatedFileList.length === 0) return;

    const newFileState = [...imageFiles, ...validatedFileList];

    setData({ step: 3, data: { campaignImageFiles: newFileState } });

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
        "relative mt-1.6 flex min-h-[16.1rem] flex-col items-center justify-end rounded-[5px] border border-dashed border-formBtn py-1.5 text-1",
        isDragActive && "opacity-60",
      )}
    >
      <Button
        variant="primary"
        className=" bg-formBtn p-0.8 text-1.2 font-bold"
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

      <p className="mt-1.5 text-1.2 italic text-formBtn">
        Click to select files, or Drag {`'n'`} Drop
      </p>

      <p className="mt-0.3">Support files; PDF, JPG, CSV </p>

      <p className="text-abeg-green">Not more than 5mb</p>
    </div>
  );
}

export default DropZoneInput;
