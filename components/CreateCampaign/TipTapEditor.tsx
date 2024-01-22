import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapToolBar from "./TipTapToolBar";
import { validateFiles } from "./campaign-utils/validateFiles";

type EditorProps = {
  placeholder?: string;
  editorContent?: string;
  onChange?: (content: string) => void;
};

export const getExtensions = (placeholder = "") => [
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

    dropcursor: {
      class: "text-pink-600",
    },
  }),

  Placeholder.configure({ placeholder }),

  Image.configure({
    allowBase64: true,
    HTMLAttributes: {
      class:
        "mx-auto my-[1rem] object-cover aspect-[1/0.6] w-full rounded-[5px]",
    },
  }),
];

function TiptapEditor({ placeholder, editorContent, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: getExtensions(placeholder),

    editorProps: {
      attributes: {
        class:
          "focus-visible:outline-none disabled:cursor-not-allowed min-h-[10rem]",
      },

      handleDrop: (view, event, slice, moved) => {
        const fileList = event.dataTransfer?.files;

        if (!editor || !fileList || moved) {
          return false;
        }

        const { 0: validatedFile } = validateFiles(fileList);

        if (validatedFile == null) return;

        const image = new window.Image();

        const fileReader = new FileReader();

        fileReader.readAsDataURL(validatedFile);

        fileReader.addEventListener("load", () => {
          const imageUrl = fileReader.result as string;

          image.src = imageUrl;

          const onImageLoad = () => {
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });

            if (coordinates === null) return;

            const imageNode = view.state.schema.nodes.image.create({
              src: imageUrl,
            }); // creates the image element

            const transaction = view.state.tr.insert(
              coordinates.pos,
              imageNode,
            ); // places it in the correct position

            return view.dispatch(transaction);
          };

          image.addEventListener("load", onImageLoad);
        });

        return true;
      },
    },

    content: editorContent,

    onUpdate: ({ editor }) => onChange?.(editor.getText()),
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex min-h-[17.8rem] flex-col justify-between gap-[0.8rem] rounded-[6px] border border-unfocused p-[1.6rem] focus-within:[outline:2px_solid_theme(colors.formBtn)]">
      <EditorContent
        editor={editor}
        className="text-[1.2rem] lg:text-[1.6rem] [&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:absolute [&_p.is-editor-empty:first-child]:before:left-0 [&_p.is-editor-empty:first-child]:before:text-placeholder [&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]"
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
