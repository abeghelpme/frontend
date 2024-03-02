import type { ForwardedRefType } from "@/lib/type-helpers";
import { assertENV } from "@/lib/type-helpers/assert";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { type MutableRefObject, forwardRef, useEffect, useState } from "react";

type ValidRefType<TRef> = Extract<
	TRef,
	MutableRefObject<TurnstileInstance | null | undefined>
>;

type TurnstileProps = {
	onStatusChange: (status: "success" | "idle" | "error") => void;
};

function CloudFlareTurnStileComp(
	props: TurnstileProps,
	ref: ForwardedRefType<typeof Turnstile>
) {
	const { onStatusChange } = props;
	const [status, setStatus] = useState<"success" | "idle" | "error">("idle");

	const SITEKEY = assertENV(process.env.NEXT_PUBLIC_CF_TURNSTILE_SITEKEY, {
		message:
			"Please add the NEXT_PUBLIC_CF_TURNSTILE_SITEKEY variable to your .env file",
	});

	useEffect(() => {
		onStatusChange(status);
	}, [status]);

	return (
		<Turnstile
			rel="prefetch"
			as="div"
			ref={ref}
			className="mx-auto mt-3"
			scriptOptions={{ defer: true }}
			siteKey={SITEKEY}
			onError={() => setStatus("error")}
			onSuccess={() => setStatus("success")}
			onExpire={() => ref && (ref as ValidRefType<typeof ref>).current?.reset()}
		/>
	);
}

export default forwardRef(CloudFlareTurnStileComp);
