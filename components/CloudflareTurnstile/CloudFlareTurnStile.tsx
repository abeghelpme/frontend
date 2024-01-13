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
        className="cf-turnstile"
        data-sitekey="1x00000000000000000000AA"
      ></div>
    </>
  );
};

export default CloudFlareTurnStile;
