import type { JSONContent } from "@/store/formStore";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapToolBar from "./TipTapToolBar";

type EditorProps = {
  placeholder?: string;
  editorContent?: JSONContent;
  onChange?: (content: JSONContent) => void;
};

function TiptapEditor({ placeholder, editorContent, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc p-[0_1.6rem]",
          },
        },

        orderedList: {
          HTMLAttributes: {
            class: "list-decimal p-[0_1.6rem]",
          },
        },
      }),

      Placeholder.configure({ placeholder }),
    ],

    editorProps: {
      attributes: {
        class:
          "focus-visible:outline-none disabled:cursor-not-allowed min-h-[10rem]",
      },
    },

    content: editorContent,

    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
  });

  return (
    <div className="flex min-h-[17.8rem] flex-col justify-between rounded-[6px] border border-unfocused p-[1.6rem] focus-within:[outline:2px_solid_theme(colors.formBtn)]">
      <EditorContent
        editor={editor}
        className="text-[1.2rem] lg:text-[1.6rem] [&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:absolute [&_p.is-editor-empty:first-child]:before:left-0  [&_p.is-editor-empty:first-child]:before:text-placeholder [&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]"
      />

      <div className="flex flex-col gap-[0.8rem]">
        <TipTapToolBar editor={editor} />

        <p className="text-[1.2rem] opacity-70">
          Add images/videos to make your story more compelling
        </p>
      </div>
    </div>
  );
}

export default TiptapEditor;
