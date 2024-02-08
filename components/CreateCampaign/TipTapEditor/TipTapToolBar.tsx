import { Toggle } from "@/components";
import type { Editor } from "@tiptap/react";
import {
	BoldIcon,
	ItalicIcon,
	ListIcon,
	ListOrderedIcon,
	Trash2Icon,
} from "lucide-react";

type ToolBarProps = { editor: Editor };

function TipTapToolBar({ editor }: ToolBarProps) {
	return (
		<div className="flex items-center gap-0.8 text-successText/85">
			<Toggle
				pressed={editor.isActive("bold")}
				onPressedChange={() => editor.chain().focus().toggleBold().run()}
			>
				<BoldIcon className="size-2 lg:size-2.4" />
			</Toggle>

			<Toggle
				pressed={editor.isActive("italic")}
				onPressedChange={() => editor.chain().focus().toggleItalic().run()}
			>
				<ItalicIcon className="size-2 lg:size-2.4" />
			</Toggle>

			<Toggle
				pressed={editor.isActive("bulletList")}
				onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
			>
				<ListIcon className="size-2 lg:size-2.4" />
			</Toggle>

			<Toggle
				pressed={editor.isActive("orderedList")}
				onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<ListOrderedIcon className="size-2 lg:size-2.4" />
			</Toggle>

			<button
				type="button"
				className="flex  active:scale-110"
				onClick={() => editor.commands.deleteSelection()}
			>
				<Trash2Icon className="size-2 lg:size-2.4" />
			</button>
		</div>
	);
}

export default TipTapToolBar;
