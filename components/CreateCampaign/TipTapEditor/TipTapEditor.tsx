import type { StepThreeData } from "@/store/formStore";
import { EditorContent, useEditor } from "@tiptap/react";
import DOMPurify from "isomorphic-dompurify";
import type { UseFormSetValue } from "react-hook-form";
import { getEditorExtensions } from "../campaign-utils";
import TipTapToolBar from "./TipTapToolBar";

type EditorProps = {
	placeholder?: string;
	editorContent: string;
	setFormValue: UseFormSetValue<StepThreeData>;
	onChange: (content: string) => void;
};

function TiptapEditor(props: EditorProps) {
	const { placeholder, editorContent, setFormValue, onChange } = props;

	const editor = useEditor({
		extensions: getEditorExtensions(placeholder),

		editorProps: {
			attributes: {
				class:
					"focus-visible:outline-none disabled:cursor-not-allowed min-h-[10rem]",
			},
		},

		content: editorContent,

		onUpdate: (options) => {
			const purifiedContent = DOMPurify.sanitize(options.editor.getHTML());
			onChange(purifiedContent);

			setFormValue("story", options.editor.getText());
		},
	});

	if (!editor) {
		return null;
	}

	return (
		<div className="gap-0.8 rounded-6 border-unfocused p-1.6 focus-within:outline-formBtn flex min-h-[17.8rem] flex-col justify-between border focus-within:outline-2">
			<EditorContent
				editor={editor}
				className="text-1.2 lg:text-1.6 [&_p.is-editor-empty:first-child]:before:text-placeholder [&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:absolute [&_p.is-editor-empty:first-child]:before:left-0 [&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]"
			/>

			<div className="gap-0.8 lg:gap-4.8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
				<TipTapToolBar editor={editor} />

				<p className="text-1.2 lg:text-1.6 opacity-70">
					Add images/videos to make your story more compelling
				</p>
			</div>
		</div>
	);
}

export default TiptapEditor;
