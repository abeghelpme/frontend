import React, { useState } from "react";
import authBgContours from "@/public/assets/images/shared/bg-contours.png";
import Image from "next/image";
import { ChevronLeftIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import OTPInput from "react-otp-input";
import Button from "@/components/primitives/Button/button";
import Link from "next/link";
import callApi from "@/lib/api/callApi";
import { useToast } from "@/components/ui/use-toast";

type ApiResponse = {
  data: {
    recoveryCode: string;
  };
  message: string;
  status: "success";
};

const Email = () => {
  const { toast } = useToast();
  const [otpCode, setOtpCode] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [whichAuthenticationMode, setWhichAuthenticationMode] =
    useState("email");
  const [recoveryCode, setRecoveryCode] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    const { data, error } = await callApi<ApiResponse>("/auth/2fa/complete", {
      token: otpCode,
      twoFactorType: "EMAIL",
    });
    if (data) {
      toast({
        title: "Success",
        description: `${data.message}`,
        duration: 3000,
      });
      setRecoveryCode(data.data.recoveryCode);
    }
    if (error) {
      toast({
        title: "Error",
        description: `${error.message}`,
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      setPage(2);
      setIsLoading(false);
    }, 3000);
  };

  const resendCode = async () => {
    const { data, error } = await callApi<ApiResponse>("/auth/2fa/code/email");
    if (data) {
      toast({
        title: "Success",
        description: `${data.message}`,
        duration: 3000,
      });
    }
    if (error) {
      toast({
        title: "Error",
        description: `${error.message}`,
        duration: 3000,
      });
      return;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[100vh] relative gap-14">
      <Image
        src={authBgContours}
        alt=""
        priority
        className="absolute inset-0 -z-[1] object-cover object-[75%] h-full w-full"
      />
      {page === 1 && (
        <>
          <div className="flex flex-col gap-8 text-base md:text-2xl max-w-7xl px-8 md:px-16 lg:px-8 flex-grow justify-center mt-14">
            <p className="text-xl md:text-3xl font-semibold">
              Set up two-factor authentication
            </p>
            <p>Add an extra layer of security to your account</p>
            <p>
              Two-factor authentication protects your account by requiring an
              additional code when you log in on a device that we don’t
              recognise.
            </p>
            <p className="font-semibold">
              Choose how you want to receive verification code
            </p>
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1 flex flex-col gap-8">
                <p className="font-semibold">Authentication app</p>
                <p>
                  <span className="text-formBtn">Recommended.</span> We
                  recommend downloading the Google Authenticator app if you
                  don’t have one. It will generate a code that you’ll enter when
                  you log in.
                </p>
              </div>
              <input
                className="w-5 h-5 md:w-8 md:h-8 accent-abeg-teal"
                type="radio"
                name="authentication"
                value="authentication app"
                checked={whichAuthenticationMode === "authentication app"}
                onChange={(e) => setWhichAuthenticationMode(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1 flex flex-col gap-8">
                <p className="font-semibold">Email Address</p>
                <p>We will send a code to your registered email address</p>
              </div>
              <input
                className="w-5 h-5 md:w-8 md:h-8 accent-abeg-teal"
                type="radio"
                name="authentication"
                value="email"
                checked={whichAuthenticationMode === "email"}
                onChange={(e) => setWhichAuthenticationMode(e.target.value)}
              />
            </div>
          </div>
          <div className="fixed inset-0 bg-[#48484880] bg-opacity-50 flex justify-center items-center px-8">
            <div className="bg-white px-4 md:px-8 py-8 md:py-12 flex flex-col gap-2 md:gap-4 rounded-[10px] w-[100%] md:w-[80%] lg:w-[50%] max-w-[700px]">
              <div className="md:flex justify-between gap-4 mb-2 md:mb-4 hidden">
                <Link href="/2fa">
                  <ChevronLeftIcon className="w-8 h-8" />
                </Link>
                <Link href="/2fa">
                  <CrossCircledIcon className="w-8 h-8" />
                </Link>
              </div>
              <div className="px-2 md:px-4 text-center flex flex-col gap-6 md:gap-8">
                <p className="text-base md:text-2xl font-semibold">
                  Enter verification code
                </p>
                <p className="text-sm md:text-base ">
                  Enter the 6-digit code we sent to your email
                </p>
                <OTPInput
                  value={otpCode}
                  onChange={setOtpCode}
                  numInputs={6}
                  shouldAutoFocus
                  inputType="number"
                  renderInput={(props) => <input {...props} />}
                  containerStyle="flex justify-center items-center space-x-2 lg:space-x-4"
                  inputStyle="flex-1 w-full aspect-square border-2 rounded bg-transparent outline-none text-center font-semibold text-xl md:text-2xl border-gray-700 focus:border-formBtn focus:text-formBtn text-gray-400  shadow-lg transition-all duration-500"
                  // skipDefaultStyles
                />
                <p className="text-sm md:text-base">
                  It may take up to a minute for you to receive this code.
                  <Button
                    className="text-formBtn px-1"
                    onClick={() => void resendCode()}
                  >
                    Resend Code.
                  </Button>
                </p>
                <Button
                  className="mt-4 md:mt-8 bg-formBtn py-4 rounded-md"
                  fullWidth
                  disabled={otpCode.length < 6}
                  onClick={() => void handleSubmit()}
                  loading={isLoading}
                >
                  Complete
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      {page === 2 && (
        <div className="flex flex-col gap-8 text-base md:text-2xl max-w-7xl px-8 md:px-16 lg:px-8 flex-grow justify-center mt-14">
          <p className="text-xl md:text-3xl font-semibold">
            Two-factor authentication is enabled
          </p>
          <p>
            We’ll now ask for a login code whenever you log in on a device that
            we don’t recognize.
          </p>
          <p>
            You can use your backup codes and make sure to secure your backup
            codes in safe place . Without these, you may not e able to log in to
            your account if you lose access to your phone or can’t log in using
            your security method.
          </p>
          <div className="flex flex-col gap-4 font-semibold justify-center items-center py-4 ">
            <p className="text-2xl md:text-4xl">{recoveryCode}</p>
          </div>
          <p>
            You can use each backup code once. You can also get new codes if
            this set is no longer secure or if you’ve already used most of them.
          </p>
        </div>
      )}

      <div className="bg-white border-t-2 border-formBtn py-4 w-full flex justify-center mt-auto">
        <div className="items-end max-w-7xl px-8 md:px-16 lg:px-8 flex w-full mt-auto justify-end">
          <Button className="bg-formBtn rounded-md px-16 py-4">
            {page === 0 ? "Next" : "Got it!"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Email;
