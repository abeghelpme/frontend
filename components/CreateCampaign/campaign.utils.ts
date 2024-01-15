import { toast } from "@/components/ui/use-toast";
import {
  FILE_SIZE_LIMIT,
  acceptedFilesString,
  allowedFileTypes,
} from "./campaign.constants";

export const validateTagValue = (
  tagArray: string[],
  tagInputRef: React.RefObject<HTMLInputElement>,
) => {
  if (!tagInputRef.current) {
    return "";
  }

  if (tagInputRef.current.value.length < 3) {
    return "";
  } //TODO - show error

  if (tagArray.includes(tagInputRef.current.value)) {
    return "";
  } //TODO - show error

  if (tagArray.length >= 5) {
    return "";
  } //TODO - show error

  return tagInputRef.current.value;
};

export const validateFiles = (imageFiles: File[], fileList: FileList) => {
  const validatedFileList = [];

  for (const imageFile of fileList) {
    if (!allowedFileTypes.includes(imageFile.type)) {
      toast({
        title: "Error",
        description: `File type must be of ${acceptedFilesString}`,
        duration: 3000,
        variant: "destructive",
      });

      continue;
    }

    if (imageFile.size > FILE_SIZE_LIMIT) {
      toast({
        title: "Error",
        description: "Cannot upload a file larger than 5mb",
        duration: 3000,
        variant: "destructive",
      });

      continue;
    }

    // prettier-ignore
    const isFileUnique = imageFiles.every((file) => file.name !== imageFile.name);

    if (!isFileUnique) continue;

    validatedFileList.push(imageFile);
  }

  return validatedFileList;
};
