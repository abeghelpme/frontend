import type { FormEvent } from "react";

export const detectBot = (event: FormEvent) => {
  const formData = new FormData(event.target as HTMLFormElement);

  return formData.get("cf-turnstile-response");
};
