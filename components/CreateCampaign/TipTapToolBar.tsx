import imageIcon from "@/public/assets/icons/campaign/gallery-icon.svg";
import videoIcon from "@/public/assets/icons/campaign/video-icon.svg";
import type { Editor } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import Toggle from "../primitives/Toggle";
import { toast } from "../ui/use-toast";
import { acceptedFilesString } from "./campaign.constants";
import { validateFiles } from "./campaign.utils";

type ToolBarProps = {
  editor: Editor;
};

const handleImageUpload =
  (editor: Editor) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList == null) {
      toast({
        title: "Error",
        description: "No file selected",
        duration: 3000,
        variant: "destructive",
      });

      return;
    }

    const validatedFileList = validateFiles(fileList);

    if (validatedFileList.length === 0) return;

    validatedFileList.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.addEventListener("load", () => {
        const url = fileReader.result as string;

        editor
          .chain()
          .focus()
          .setImage({ src: url })
          .createParagraphNear()
          .run();
      });
    });
  };

function TipTapToolBar({ editor }: ToolBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-[0.8rem] text-successText/85">
      <button type="button">
        <Image
          src={videoIcon as string}
          alt="video icon"
          width={20}
          height={20}
        />
      </button>

      <button
        type="button"
        className="relative active:scale-110"
        onClick={() => fileInputRef.current?.click()}
      >
        <Image
          src={imageIcon as string}
          alt="image icon"
          width={20}
          height={20}
        />

        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept={acceptedFilesString}
          onChange={handleImageUpload(editor)}
          multiple
        />
      </button>

      <button
        type="button"
        className="flex  active:scale-110"
        onClick={() => editor.commands.deleteSelection()}
      >
        <Trash2Icon size={20} />
      </button>

      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon size={20} />
      </Toggle>

      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon size={20} />
      </Toggle>

      <Toggle
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon size={20} />
      </Toggle>

      <Toggle
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon size={20} />
      </Toggle>
    </div>
  );
}

export default TipTapToolBar;
