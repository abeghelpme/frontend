import { toast } from "@/components/ui/use-toast"
import {
	FILE_SIZE_LIMIT,
	acceptedFilesString,
	allowedFileTypes,
} from "./constants"

type ValidateFilesParams =
	| [fileList: FileList]
	| [fileList: FileList, exisitingimageFiles: File[]]

function validateFiles(fileList: FileList): File[]
function validateFiles(fileList: FileList, exisitingimageFiles: File[]): File[]

function validateFiles(...params: ValidateFilesParams) {
	const [fileList, exisitingimageFiles] = params

	const validatedFileList = []

	for (const file of fileList) {
		if (!allowedFileTypes.includes(file.type)) {
			toast({
				title: "Error",
				description: `File type must be of ${acceptedFilesString}`,
				duration: 3000,
				variant: "destructive",
			})

			continue
		}

		if (file.size > FILE_SIZE_LIMIT) {
			toast({
				title: "Error",
				description: "Cannot upload a file larger than 5mb",
				duration: 3000,
				variant: "destructive",
			})

			continue
		}

		if (!exisitingimageFiles) {
			validatedFileList.push(file)
			continue
		}

		const isFileUnique = exisitingimageFiles.every(
			(imageFile) => imageFile.name !== file.name
		)

		if (!isFileUnique) continue

		validatedFileList.push(file)
	}

	return validatedFileList
}

export { validateFiles }
