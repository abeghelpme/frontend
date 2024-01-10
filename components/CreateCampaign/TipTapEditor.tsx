import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function TiptapEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
  });

  return <EditorContent editor={editor} />;
}

export default TiptapEditor;
