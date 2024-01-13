const CloudFlareTensileBot = () => {
  console.log(process.env.NEXT_CLOUDFLARE_TURNSTILE_SITE_KEY);
  return (
    <div
      className="cf-turnstile"
      data-sitekey="0x4AAAAAAAP7NAeapaNnyT3z"
      // data-sitekey={process.env.NEXT_CLOUDFLARE_TURNSTILE_SITE_KEY}
    ></div>
  );
};

export default CloudFlareTensileBot;
