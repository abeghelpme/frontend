import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

import Button from "@/components/primitives/Button/button";
import authBgContours from "@/public/assets/images/shared/bg-contours.png";
import callApi from "@/lib/api/callApi";

type EmailResponse = {
  status: "string";
  data: null;
  message: string;
};

const TwoFa = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState("app");

  const handleNextButton = async () => {
    if (selectedOption === "app") {
      void router.push("/2fa/app");
    } else {
      const { data, error } = await callApi<EmailResponse>("/auth/2fa/setup", {
        twoFactorType: "EMAIL",
      });
      if (data) {
        toast({
          title: "Success",
          description: data.message,
          duration: 3000,
        });
        void router.push("/2fa/email");
      }
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          duration: 3000,
        });
      }
    }
  };

  return (
    <main className=" min-h-screen  flex flex-col flex-1 relative">
      <Image
        src={authBgContours}
        alt=""
        role="presentation"
        priority
        className="absolute inset-0 -z-[1] object-cover object-[75%] h-full w-full"
      />
      <div className="w-full px-4 mx-auto max-w-7xl md:px-16">
        <h1 className="mt-[3.5rem] font-semibold text-2xl">
          Set up two-factor authentication
        </h1>
        <p className="mt-6 text-text">
          Add an extra layer of security to your account
        </p>
        <p className="mt-4">
          Two-factor authentication protects your account by requiring an
          additional code when you log in on a device that we don&apos;t
          recognise.
        </p>
        <h2 className="mt-[3rem] font-semibold text-xl">
          Choose how you want to receive verification code
        </h2>

        <div>
          <h3 className="mt-10 font-semibold">Authentication app</h3>
          <div className="flex gap-2 items-center">
            <label htmlFor="app">
              <Link
                target="blank"
                href={
                  "https://play.google.com/store/apps/details?id=com.google.android.apps.app2&hl=en&gl=US"
                }
                className="text-abeg-teal"
              >
                Recommended
              </Link>
              .We recommend downloading the Google Authenticator app if you
              don&apos;t have one. It will generate a code that you&apos;ll
              enter when you log in.
            </label>
            <input
              type="radio"
              value={"app"}
              name="2fa"
              checked={selectedOption === "app"}
              onChange={() => setSelectedOption("app")}
              id="app"
              className="accent-abeg-teal ml-auto"
            />
          </div>
          <hr className="border-b my-4" />
          <h3 className=" font-semibold">Email Address</h3>
          <div className="flex gap-2 items-center ">
            <label htmlFor="email">
              We will send a code to your registered email address
            </label>
            <input
              type="radio"
              value={"email"}
              name="2fa"
              checked={selectedOption === "email"}
              onChange={() => setSelectedOption("email")}
              id="email"
              className="accent-abeg-teal ml-auto"
            />
          </div>
        </div>
      </div>
      <hr className="mt-auto" />
      <div className="flex justify-end w-full px-4 mx-auto max-w-7xl md:px-16 my-4">
        <Button
          className="bg-abeg-button-10 w-fit "
          size="sm"
          onClick={() => void handleNextButton()}
        >
          NEXT
        </Button>
      </div>
    </main>
  );
};

export default TwoFa;
