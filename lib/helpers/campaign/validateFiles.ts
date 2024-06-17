import { toast } from "sonner";

export const handleFileValidation = (
	newFileList: FileList,

	existingFileArray?: File[],

	validationRules?: {
		fileLimit?: number;
		maxFileSize?: number;
		allowedFileTypes?: string[];
		disallowDuplicates?: boolean;
	}
) => {
	const { fileLimit, maxFileSize, allowedFileTypes, disallowDuplicates } = validationRules ?? {};

	const validFilesArray: File[] = [];

	const isFileUnique = (file: File) => {
		return (existingFileArray ?? []).every((fileItem) => fileItem.name !== file.name);
	};

	const isFileLimitReached = (limit: number) => {
		return (existingFileArray ?? []).length === limit || validFilesArray.length === limit;
	};

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const fileSizeToMb = (size: number) => size * 1024 * 1024;

	//	== Loop through fileList and validate each file
	for (const file of newFileList) {
		if (fileLimit && isFileLimitReached(fileLimit)) {
			toast.error("Error", {
				description: `Cannot upload more than ${fileLimit} files`,
			});

			break;
		}

		if (allowedFileTypes && !allowedFileTypes.includes(file.type)) {
			const acceptedFilesString = allowedFileTypes.join(" | ");

			toast.error("Error", {
				description: `File type must be of: ${acceptedFilesString}`,
			});

			continue;
		}

		if (maxFileSize && file.size > fileSizeToMb(maxFileSize)) {
			toast.error("Error", {
				description: `Cannot upload a file larger than ${maxFileSize}mb`,
			});

			continue;
		}

		if (disallowDuplicates && !isFileUnique(file)) {
			toast.error("Error", {
				description: `File: "${file.name}" has already been selected`,
			});

			continue;
		}

		validFilesArray.push(file);
	}

	return validFilesArray;
};

export const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

export const validateFiles = (
	newFileList: FileList,

	existingFileArray?: File[]
) => {
	const validFilesArray = handleFileValidation(newFileList, existingFileArray, {
		fileLimit: 5,
		maxFileSize: 5 * 1024 * 1024,
		allowedFileTypes,
		disallowDuplicates: true,
	});

	return validFilesArray;
};
