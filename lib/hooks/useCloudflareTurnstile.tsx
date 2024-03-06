import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";
import { toast } from "sonner";

const useCloudflareTurnstile = () => {
	const [botStatus, setBotStatus] = useState<"success" | "error" | "idle">(
		"idle"
	);
	const cfTurnStile = useRef<TurnstileInstance>(null);

	const handleBotStatus = (status: "success" | "error" | "idle") =>
		setBotStatus(status);

	const checkBotStatus = () => {
		if (botStatus !== "success") {
			toast.error("Error", {
				description: "Please complete the bot verification",
			});
			return;
		}
		return "success";
	};

	return {
		botStatus,
		cfTurnStile,
		handleBotStatus,
		checkBotStatus,
	};
};
export { useCloudflareTurnstile };
