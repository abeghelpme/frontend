import type { Editor } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  Trash2Icon,
} from "lucide-react";
import Toggle from "../primitives/Toggle";

type ToolBarProps = {
  editor: Editor;
};

function TipTapToolBar({ editor }: ToolBarProps) {
  return (
    <div className="flex items-center gap-0.8 text-successText/85">
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

      <button
        type="button"
        className="flex  active:scale-110"
        onClick={() => editor.commands.deleteSelection()}
      >
        <Trash2Icon size={20} />
      </button>
    </div>
  );
}

export default TipTapToolBar;
