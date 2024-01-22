import { getExtensions } from "@/components/CreateCampaign/TipTapEditor";
import { parseJSON } from "@/lib/utils/parseJSON";
import { generateHTML } from "@tiptap/html";
import type { JSONContent } from "@tiptap/react";
import DOMPurify from "isomorphic-dompurify";

const getPurifiedHtml = (JSONString: string | undefined) => {
  const JSONContent = parseJSON<JSONContent>(JSONString);

  if (JSONContent === null) {
    return "";
  }

  return DOMPurify.sanitize(generateHTML(JSONContent, getExtensions()));
};

export { getPurifiedHtml };
