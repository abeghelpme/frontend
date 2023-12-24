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
  const [selectedOption, setSelectedOption] = useState("authenticator");

  const handleNextButton = async () => {
    if (selectedOption === "authenticator") {
      void router.push("/2fa/authenticator");
    } else {
      if (router.query.email === undefined) {
        return toast({
          title: "Error",
          description: "Email not provided",
          duration: 3000,
        });
      }

      const { data, error } = await callApi<EmailResponse>(
        "/auth/2fa/code/email",
        { email: router.query.email },
      );
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
      <section className="px-4 max-w-7xl md:px-16">
        <h1 className="mt-[3.5rem] font-semibold text-2xl">
          Set up two-factor authentication
        </h1>
        <p className="mt-6 text-text">
          Add an extra layer of security to your account
        </p>
        <p className="mt-4">
          Two-factor authentication protects your account by requiring an
          additional code when you log in on a device that we don’t recognise.
        </p>
        <h2 className="mt-[3rem] font-semibold text-xl">
          Choose how you want to receive verification code
        </h2>

        <div>
          <h3 className="mt-10 font-semibold">Authenticator App</h3>
          <div className="flex gap-2 items-center">
            <p>
              <Link href={"#"} className="text-abeg-teal">
                Recommended
              </Link>
              . We recommend downloading the Google Authenticator app if you
              don’t have one. It will generate a code that you’ll enter when you
              log in.
            </p>
            <input
              type="radio"
              value={"authenticator"}
              checked={selectedOption === "authenticator"}
              onChange={() => setSelectedOption("authenticator")}
              id=""
              className="accent-abeg-teal ml-auto"
            />
          </div>
          <hr className="border-b my-4" />
          <h3 className=" font-semibold">Email Address</h3>
          <div className="flex gap-2 items-center ">
            <p>We will send a code to your registered email address</p>
            <input
              type="radio"
              value={"email"}
              checked={selectedOption === "email"}
              onChange={() => setSelectedOption("email")}
              id=""
              className="accent-abeg-teal ml-auto"
            />
          </div>
        </div>
      </section>
      <hr className="mt-auto" />
      <div className="flex justify-end px-4 max-w-7xl md:px-16 my-4">
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
