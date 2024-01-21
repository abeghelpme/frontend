import type { FormEvent } from "react";
import { toast } from "@/components/ui/use-toast";

export const detectBot = (event: FormEvent) => {
  const formData = new FormData(event.target as HTMLFormElement);
  const turnstileResponse = formData.get("cf-turnstile-response");

  if (turnstileResponse === "") {
    console.log("failed");
    toast({
      title: "Bot Detection Error",
      description: "Bot Detection Error Failed.",
      duration: 2000,
    });

    return;
  }
  console.log("passed");

  return true;
};
