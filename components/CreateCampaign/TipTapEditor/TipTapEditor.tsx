import { getEditorExtensions } from "@/lib/helpers/campaign";
import type { StepThreeData } from "@/store/formStore";
import { EditorContent, useEditor } from "@tiptap/react";
import DOMPurify from "isomorphic-dompurify";
import type { UseFormSetValue } from "react-hook-form";
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
					"focus-visible:outline-none disabled:cursor-not-allowed min-h-24",
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
		<div className="focus-within:outline-@2 flex min-h-44 flex-col justify-between gap-@0.8 rounded-md border border-unfocused p-@1.6 focus-within:outline-formBtn">
			<EditorContent
				editor={editor}
				className="text-xs lg:text-base [&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:absolute [&_p.is-editor-empty:first-child]:before:left-0 [&_p.is-editor-empty:first-child]:before:text-placeholder [&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]"
			/>

			<div className="flex flex-col gap-@0.8 lg:flex-row lg:items-center lg:justify-between lg:gap-@4.8">
				<TipTapToolBar editor={editor} />

				<p className="text-xs opacity-70 lg:text-base">
					Add images/videos to make your story more compelling
				</p>
			</div>
		</div>
	);
}

export default TiptapEditor;
