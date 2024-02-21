import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { type MutableRefObject, forwardRef, useEffect, useState } from "react";

const SITEKEY = process.env.NEXT_PUBLIC_CF_TURNSTILE_SITEKEY as string;

type ForwardedRefType<TComponent extends React.ElementType> =
	React.ForwardedRef<React.ElementRef<TComponent>>;

type ValidRefType<TRef> = Extract<
	TRef,
	MutableRefObject<TurnstileInstance | null | undefined>
>;

interface TurnstileProps {
	onStatusChange: (status: "success" | "idle" | "error") => void;
}

const CloudFlareTurnStileComp = (
	{ onStatusChange }: TurnstileProps,
	ref: ForwardedRefType<typeof Turnstile>
) => {
	const [status, setStatus] = useState<"success" | "idle" | "error">("idle");

	useEffect(() => onStatusChange(status), [status]);

	if (!SITEKEY) {
		throw new Error(
			"Please add the NEXT_PUBLIC_CF_TURNSTILE_SITEKEY variable to your .env file"
		);
	}

	return (
		<Turnstile
			rel="prefetch"
			as="div"
			ref={ref}
			scriptOptions={{ defer: true }}
			siteKey={SITEKEY}
			className="mx-auto mt-3"
			onError={() => setStatus("error")}
			onExpire={() => {
				if (ref) {
					(ref as NonNullable<ValidRefType<typeof ref>>).current?.reset();
				}
			}}
			onSuccess={() => setStatus("success")}
		/>
	);
};

export default forwardRef(CloudFlareTurnStileComp);
