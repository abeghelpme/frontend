import { toast } from "@/components/ui";
import {
	MAX_FILES_QUANTITY,
	MAX_FILE_SIZE,
	acceptedFilesString,
	allowedFileTypes,
} from "./constants";

const validateFiles = (newFileList: FileList, exisitingImageArray?: File[]) => {
	const validFilesArray: File[] = [];

	for (const file of newFileList) {
		if (!allowedFileTypes.includes(file.type)) {
			toast({
				title: "Error",
				description: `File type must be of ${acceptedFilesString}`,
				duration: 3000,
				variant: "destructive",
			});

			continue;
		}

		if (file.size > MAX_FILE_SIZE) {
			toast({
				title: "Error",
				description: "Cannot upload a file larger than 5mb",
				duration: 3000,
				variant: "destructive",
			});

			continue;
		}

		if (!exisitingImageArray) {
			validFilesArray.push(file);
			continue;
		}

		const isFileUnique = exisitingImageArray.every(
			(imageFile) => imageFile.name !== file.name
		);

		if (!isFileUnique) continue;

		validFilesArray.push(file);
	}

	if (validFilesArray.length > MAX_FILES_QUANTITY) {
		toast({
			title: "Error",
			description: `Cannot upload more than ${MAX_FILES_QUANTITY} files`,
			duration: 3000,
		});

		return validFilesArray.slice(0, MAX_FILES_QUANTITY);
	}

	return validFilesArray;
};

export { validateFiles };
