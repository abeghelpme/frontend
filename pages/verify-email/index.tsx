import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { callApi } from "@/lib/utils/callApi";

import Button from "@/components/primitives/Button/button";
import LogoBanner from "@/layouts/logoBanner";
import Link from "next/link";

const VerificationPage = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [token, setToken] = useState<string | undefined>();

  // add a loading state

  const verifyEmail = async () => {
    if (token === undefined) return setErrorMessage("Invalid token");

    const { error } = await callApi("/auth/verify-email", {
      token,
    });
    // handle loading state
    // handle toast state before redirect

    if (error && error.message) {
      setErrorMessage(error.message);
    }

    void router.push("/verify-email/success");
  };

  useEffect(() => {
    setToken(router.query.token as string);
  }, [router]);

  return (
    <div className="h-full flex flex-col items-center justify-center pt-[3.25rem] md:pt-[4.5rem]">
      <LogoBanner textColor="formTemp" />
      {!errorMessage ? (
        <div className="w-[90%]  sm:w-[50%] md:max-w-[397px] mx-auto flex-1">
          <div className="flex flex-col justify-center h-full">
            <div className="bg-white shadow-auth-layout-shadow text-center space-y-2 p-4 sm:p-6 rounded-md ">
              <h1 className="text-xl font-medium">Verify your email</h1>
              <div>
                <p className="">
                  Please click on the button below to verify your email
                </p>
                <Button
                  className="bg-formBtn py-3 mt-2"
                  onClick={() => void verifyEmail()}
                  fullWidth
                >
                  Verify
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {errorMessage && <p>{errorMessage}</p>}
          <p>
            Something went wrong. Please try again or contact support if the
            problem persists
          </p>
          <Link href="/verify-email/resend">Resend email </Link>
        </div>
      )}
    </div>
  );
};
export default VerificationPage;
