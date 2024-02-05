import Script from "next/script";

const SITEKEY = process.env.NEXT_PUBLIC_CF_TURNSTILE_SITEKEY as string;
const CloudFlareTurnStile = () => {
  if (!SITEKEY) {
    throw new Error(
      "Please add the NEXT_PUBLIC_CF_TURNSTILE_SITEKEY variable to your .env file",
    );
  }
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <div
        data-size="compact"
        className="cf-turnstile [&_>_iframe]:!h-23 [&_>_iframe]:!w-56"
        data-sitekey="3x00000000000000000000FF"
        // data-sitekey={process.env.NEXT_PUBLIC_CF_TURNSTILE_SITEKEY} for production purposes only.
      ></div>
    </div>
  );
};

export default CloudFlareTurnStile;
