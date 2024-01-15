import { toast } from "@/components/ui/use-toast";

const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

export const acceptedFilesString = allowedFileTypes.join(", ");

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

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

    const isFileUnique = imageFiles?.every(
      (file) => file.name !== imageFile.name,
    );

    if (!isFileUnique) continue;

    validatedFileList.push(imageFile);
  }

  return validatedFileList;
};
