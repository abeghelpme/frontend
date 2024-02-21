import { toast } from "sonner";
import {
	MAX_FILES_QUANTITY,
	MAX_FILE_SIZE,
	acceptedFilesString,
	allowedFileTypes,
} from "./constants";

const isFileUnique = (fileArray: File[], file: File) => {
	return fileArray.every((fileItem) => fileItem.name !== file.name);
};

const validateFiles = (newFileList: FileList, exisitingFileArray?: File[]) => {
	const validFilesArray: File[] = [];

	for (const file of newFileList) {
		if (!allowedFileTypes.includes(file.type)) {
			toast.error("Error", {
				description: `File type must be of: ${acceptedFilesString}`,
			});

			continue;
		}

		if (file.size > MAX_FILE_SIZE) {
			toast.error("Error", {
				description: "Cannot upload a file larger than 5mb",
			});

			continue;
		}

		if (!exisitingFileArray) {
			validFilesArray.push(file);
			continue;
		}

		if (!isFileUnique(exisitingFileArray, file)) continue;

		validFilesArray.push(file);
	}

	if (validFilesArray.length > MAX_FILES_QUANTITY) {
		toast.error("Error", {
			description: `Cannot upload more than ${MAX_FILES_QUANTITY} files`,
		});

		return validFilesArray.slice(0, MAX_FILES_QUANTITY);
	}

	return validFilesArray;
};

export { validateFiles };
