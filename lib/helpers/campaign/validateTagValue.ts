import { toast } from "sonner";

const validateTagValue = (tagsArray: string[], newTag: string | undefined) => {
	if (!newTag) return;

	if (newTag.length < 3) {
		toast.error("Error", {
			description: "Tag must be at least 3 characters long",
		});

		return;
	}

	if (tagsArray.length >= 5) {
		toast.error("Error", {
			description: "Cannot add more than 5 tags",
		});
		return;
	}

	return newTag;
};

export { validateTagValue };
