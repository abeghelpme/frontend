import { toast } from "@/components/ui/use-toast";
import {
	FILE_SIZE_LIMIT,
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

		if (file.size > FILE_SIZE_LIMIT) {
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

	return validFilesArray;
}

export { validateFiles };
