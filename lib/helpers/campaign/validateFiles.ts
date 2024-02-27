import { toast } from "sonner";
import {
	MAX_FILE_QUANTITY,
	MAX_FILE_SIZE,
	acceptedFilesString,
	allowedFileTypes,
} from "./constants";

const validateFiles = (
	newFileList: FileList,
	exisitingFileArray: File[] = []
) => {
	const validFilesArray: File[] = [];

	const isFileUnique = (file: File) => {
		return exisitingFileArray.every((fileItem) => fileItem.name !== file.name);
	};

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

		if (!isFileUnique(file)) {
			toast.error("Error", {
				description: `File: "${file.name}" has already been selected`,
			});

			continue;
		}

		const isMaxFileQuantityReached =
			validFilesArray.length === MAX_FILE_QUANTITY ||
			exisitingFileArray.length + validFilesArray.length === MAX_FILE_QUANTITY;

		if (isMaxFileQuantityReached) {
			toast.error("Error", {
				description: `Cannot upload more than ${MAX_FILE_QUANTITY} files`,
			});

			return validFilesArray;
		}

		validFilesArray.push(file);
	}

	return validFilesArray;
};

export { validateFiles };
