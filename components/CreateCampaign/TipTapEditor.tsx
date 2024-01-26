import type { StepThreeData } from "@/store/useformStore";
import { EditorContent, useEditor } from "@tiptap/react";
import type { UseFormSetValue } from "react-hook-form";
import TipTapToolBar from "./TipTapToolBar";
import { getEditorExtensions, getPurifiedHTML } from "./campaign-utils";

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

    onUpdate: ({ editor }) => {
      const purifiedContent = getPurifiedHTML(editor.getHTML());

      onChange(purifiedContent);
      setFormValue("campaignStoryText", editor.getText());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex min-h-[17.8rem] flex-col justify-between gap-0.8 rounded-6 border border-unfocused p-1.6 focus-within:[outline:2px_solid_theme(colors.formBtn)]">
      <EditorContent
        editor={editor}
        className="text-1.2 lg:text-1.6 [&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:absolute [&_p.is-editor-empty:first-child]:before:left-0 [&_p.is-editor-empty:first-child]:before:text-placeholder [&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]"
      />

      <div className="flex flex-col gap-0.8">
        <TipTapToolBar editor={editor} />

        <p className="text-1.2 opacity-70">
          Add images/videos to make your story more compelling
        </p>
      </div>
    </div>
  );
}

export default TiptapEditor;
