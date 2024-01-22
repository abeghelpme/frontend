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
      <div className="cf-turnstile mt-2" data-sitekey={SITEKEY}></div>
    </div>
  );
};

export default CloudFlareTurnStile;
