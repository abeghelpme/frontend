import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

const getEditorExtensions = (placeholder = "") => [
	StarterKit.configure({
		bulletList: {
			HTMLAttributes: {
				class: "list-disc px-4",
			},
		},

		orderedList: {
			HTMLAttributes: {
				class: "list-decimal marker:font-semibold px-3.5",
			},
		},

		dropcursor: {
			class: "text-pink-600",
		},
	}),

	Placeholder.configure({ placeholder }),
];

export { getEditorExtensions };
