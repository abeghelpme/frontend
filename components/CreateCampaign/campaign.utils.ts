import { getExtensions } from "@/components/CreateCampaign/TipTapEditor";
import { toast } from "@/components/ui/use-toast";
import { parseJSON } from "@/lib/utils/parseJSON";
import { generateHTML } from "@tiptap/html";
import type { JSONContent } from "@tiptap/react";
import DOMPurify from "isomorphic-dompurify";
import {
  FILE_SIZE_LIMIT,
  acceptedFilesString,
  allowedFileTypes,
} from "./campaign.constants";

export const validateTagValue = (tagArray: string[], tagValue: string) => {
  if (tagValue.length < 3) {
    return;
  } //TODO - show error

  if (tagArray.includes(tagValue)) {
    return;
  } //TODO - show error

  if (tagArray.length >= 5) {
    return;
  } //TODO - show error

  return tagValue;
};

type ValidateFilesParams =
  | [fileList: FileList]
  | [fileList: FileList, exisitingimageFiles: File[]];

export function validateFiles(fileList: FileList): File[];

export function validateFiles(
  fileList: FileList,
  exisitingimageFiles: File[],
): File[];

export function validateFiles(...params: ValidateFilesParams) {
  const [fileList, exisitingimageFiles] = params;

  const validatedFileList = [];

  for (const file of fileList) {
    if (!allowedFileTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: `File type must be of ${acceptedFilesString}`,
        duration: 3000,
        variant: "destructive",
      });

      continue;
    }

    if (file.size > FILE_SIZE_LIMIT) {
      toast({
        title: "Error",
        description: "Cannot upload a file larger than 5mb",
        duration: 3000,
        variant: "destructive",
      });

      continue;
    }

    if (!exisitingimageFiles) {
      validatedFileList.push(file);

      continue;
    }

    // Check against duplicate files
    const isFileUnique = exisitingimageFiles.every(
      (imageFile) => imageFile.name !== file.name,
    );

    if (!isFileUnique) continue;

    validatedFileList.push(file);
  }

  return validatedFileList;
}

export const getPurifiedHtml = (JSONString: string | undefined) => {
  const JSONContent = parseJSON<JSONContent>(JSONString);

  if (JSONContent === null) {
    return "";
  }

  return DOMPurify.sanitize(generateHTML(JSONContent, getExtensions()));
};
