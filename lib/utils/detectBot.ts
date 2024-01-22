import { toast } from "@/components/ui/use-toast";
import type { FormEvent } from "react";

export const detectBot = (event: FormEvent) => {
  const formData = new FormData(event.target as HTMLFormElement);
  const turnstileResponse = formData.get("cf-turnstile-response");

  if (turnstileResponse === "") {
    toast({
      title: "CAPTCHA Failed",
      description: "We cannot verify you are a human!",
      duration: 2000,
    });

    return;
  }
  return true;
};
