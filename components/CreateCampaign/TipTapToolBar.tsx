import type { Editor } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  ImageIcon,
  FileVideo2Icon,
} from "lucide-react";
import Toggle from "../primitives/Toggle";

function TipTapToolBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-[0.8rem]">
      <Toggle>
        <FileVideo2Icon className="h-[2rem] w-[2rem]" />
      </Toggle>

      <Toggle>
        <ImageIcon className="h-[2rem] w-[2rem]" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className="h-[2rem] w-[2rem]" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="h-[2rem] w-[2rem]" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("listItem")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon className="h-[2rem] w-[2rem]" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("listItem")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon className="h-[2rem] w-[2rem]" />
      </Toggle>
    </div>
  );
}
export default TipTapToolBar;
