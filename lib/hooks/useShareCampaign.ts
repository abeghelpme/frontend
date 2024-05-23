import { useCallback } from "react";
import { toast } from "sonner";
import { useCallbackRef } from "./useCallbackRef";
import { useCopyToClipboard } from "./useCopyToClipboard";

const useShareCampaign = () => {
	const { copyToClipboard } = useCopyToClipboard();

	const generateTweet = useCallback(
		(title: string, url: string, tags: string[]) => {
			const queryParams = new URLSearchParams({
				text: `Abeg help donate to my campaign:
	${title}
	${tags.length > 0 && tags.join(", ")}`,
				url,
				via: "abeghelpme",
			});

			return `https://twitter.com/intent/tweet?${queryParams.toString()}`;
		},
		[]
	);

	const generateWhatsAppMessage = useCallback((title: string, url: string) => {
		const queryParams = new URLSearchParams({
			text: `Abeg help donate to my campaign:\n${title}\n${url}`,
		});

		return `https://wa.me/?${queryParams.toString()}`;
	}, []);

	const handleShareLink = useCallbackRef((url: string) => () => {
		copyToClipboard(url);

		toast.success("Campaign link copied to clipboard!", {
			duration: 1500,
		});
	});

	return { generateTweet, generateWhatsAppMessage, handleShareLink };
};

export { useShareCampaign };
