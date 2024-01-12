const detectBot = (event: React.FormEvent) => {
if (!event) {
  alert("pass a form event") //using an alert to make errors visible
}

  const formData = new FormData(event.target as HTMLFormElement);
  return formData.get("cf-turnstile-response");
};

export { detectBot };
