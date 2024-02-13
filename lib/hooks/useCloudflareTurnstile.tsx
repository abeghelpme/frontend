import { useToast } from "@/components/ui";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { useMemo, useRef, useState } from "react";

const useCloudflareTurnstile = () => {
	const { toast } = useToast();
	const [botStatus, setBotStatus] = useState<"success" | "error" | "idle">(
		"idle"
	);
	const cfTurnStile = useRef<TurnstileInstance>(null);

	const handleBotStatus = (status: "success" | "error" | "idle") =>
		setBotStatus(status);

	const checkBotStatus = () => {
		if (botStatus !== "success") {
			toast({
				title: "Error",
				description: "Please complete the bot verification",
				duration: 3000,
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
export default useCloudflareTurnstile;
