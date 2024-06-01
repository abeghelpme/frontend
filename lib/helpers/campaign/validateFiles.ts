import { toast } from "sonner";
import { MAX_FILE_QUANTITY, MAX_FILE_SIZE, acceptedFilesString, allowedFileTypes } from "./constants";

const validateFiles = (newFileList: FileList, existingFileArray: File[] = []) => {
	const validFilesArray: File[] = [];

	const isFileUnique = (file: File) => {
		return existingFileArray.every((fileItem) => fileItem.name !== file.name);
	};

	const isMaxFileQuantityReached = (maxQuantity: number) => {
		return existingFileArray.length === maxQuantity || validFilesArray.length === maxQuantity;
	};

	for (const file of newFileList) {
		if (isMaxFileQuantityReached(MAX_FILE_QUANTITY)) {
			toast.error("Error", {
				description: `Cannot upload more than ${MAX_FILE_QUANTITY} files`,
			});

			break;
		}

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

		if (!isFileUnique(file)) {
			toast.error("Error", {
				description: `File: "${file.name}" has already been selected`,
			});

			continue;
		}

		validFilesArray.push(file);
	}

	return validFilesArray;
};

export { validateFiles };
