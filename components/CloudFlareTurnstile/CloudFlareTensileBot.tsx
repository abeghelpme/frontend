const CloudFlareTensileBot = () => {
  return (
    <div
      className="cf-turnstile"
      data-sitekey={process.env.NEXT_CLOUDFLARE_TURNSTILE_SITE_KEY}
    ></div>
  );
};

export default CloudFlareTensileBot;
