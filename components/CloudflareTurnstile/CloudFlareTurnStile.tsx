import Script from "next/script";

const CloudFlareTurnStile = () => {
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <div
        data-size="compact"
        className="cf-turnstile [&_>_iframe]:w-56"
        data-sitekey="3x00000000000000000000FF"
        // data-sitekey={process.env.NEXT_PUBLIC_CF_TURNSTILE_SITEKEY} for production purposes only.
      ></div>
    </>
  );
};

export default CloudFlareTurnStile;
