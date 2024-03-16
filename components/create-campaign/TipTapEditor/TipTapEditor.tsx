import { getEditorExtensions } from "@/lib/helpers/campaign";
import type { FormStore } from "@/store";
import { EditorContent, useEditor } from "@tiptap/react";
import { sanitize } from "isomorphic-dompurify";
import { useEffect } from "react";
import type { UseFormSetValue } from "react-hook-form";
import TipTapToolBar from "./TipTapToolBar";

type EditorProps = {
	placeholder?: string;
	editorContent: string;
	setFormValue: UseFormSetValue<FormStore["formStepData"]>;
	onChange: (content: string) => void;
};

function TiptapEditor(props: EditorProps) {
	const { placeholder, editorContent, setFormValue, onChange } = props;

	const editor = useEditor({
		extensions: getEditorExtensions(placeholder),

		parseOptions: {
			preserveWhitespace: "full",
		},

		editorProps: {
			attributes: {
				class:
					"focus-visible:outline-none disabled:cursor-not-allowed min-h-24",
			},
		},

		content: editorContent,

		onUpdate: (options) => {
			const purifiedHTML = sanitize(options.editor.getHTML()).replaceAll(
				"<p></p>",
				`<br>`
			);

			onChange(purifiedHTML);

			setFormValue("story", options.editor.getText());
		},
	});

	useEffect(() => {
		editor?.isEmpty && editor.commands.setContent(editorContent);
	}, [editorContent]);

	if (!editor) {
		return null;
	}

	return (
		<div className="focus-within:outline-5 focus-within:outlineabeg-primary flex min-h-44 flex-col justify-between gap-2 rounded-md border border-unfocused p-4 lg:min-h-48">
			<EditorContent
				editor={editor}
				className="text-xs lg:text-base [&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:absolute [&_p.is-editor-empty:first-child]:before:left-0 [&_p.is-editor-empty:first-child]:before:text-placeholder [&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]"
			/>

			<div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
				<TipTapToolBar editor={editor} />

				<p className="text-xs opacity-70 lg:text-base">
					Add images/videos to make your story more compelling
				</p>
			</div>
		</div>
	);
}

export default TiptapEditor;
