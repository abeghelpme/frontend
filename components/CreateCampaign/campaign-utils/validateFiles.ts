import { toast } from "@/components/ui/use-toast";
import {
	MAX_FILES_QUANTITY,
	MAX_FILE_SIZE,
	acceptedFilesString,
	allowedFileTypes,
} from "./constants";

type ValidateFilesParams =
	| [fileList: FileList]
	| [fileList: FileList, exisitingimageFiles: File[]];

function validateFiles(fileList: FileList): File[];
function validateFiles(fileList: FileList, exisitingimageFiles: File[]): File[];

function validateFiles(...params: ValidateFilesParams) {
	const [newFileList, exisitingImageArray] = params;

	const validFilesArray: File[] = [];

	Array.from(newFileList).forEach((file) => {
		if (!allowedFileTypes.includes(file.type)) {
			toast({
				title: "Error",
				description: `File type must be of ${acceptedFilesString}`,
				duration: 3000,
				variant: "destructive",
			});

			return;
		}

		if (file.size > MAX_FILE_SIZE) {
			toast({
				title: "Error",
				description: "Cannot upload a file larger than 5mb",
				duration: 3000,
				variant: "destructive",
			});

			return;
		}

		if (!exisitingImageArray) {
			validFilesArray.push(file);
			return;
		}

		const isFileUnique = exisitingImageArray.every(
			(imageFile) => imageFile.name !== file.name
		);

		if (!isFileUnique) return;

		validFilesArray.push(file);
	});

	if (validFilesArray.length > MAX_FILES_QUANTITY) {
		toast({
			title: "Error",
			description: `Cannot upload more than ${MAX_FILES_QUANTITY} files`,
			duration: 3000,
		});

		return validFilesArray.slice(0, MAX_FILES_QUANTITY);
	}

	return validFilesArray;
}

export { validateFiles };
