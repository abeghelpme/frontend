import React, { useState } from "react";
import { callApi } from "@/lib/utils/callApi";
import authBgContours from "@/public/assets/images/shared/bg-contours.png";
import Image from "next/image";
import { ChevronLeftIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import OTPInput from "react-otp-input";
import Button from "@/components/primitives/Button/button";
import Link from "next/link";

const Email = () => {
  const [otpCode, setOtpCode] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [whichAuthenticationMode, setWhichAuthenticationMode] =
    useState<string>("");
  console.log(whichAuthenticationMode);

  const codes: string[] = [
    "123 123",
    "123 123",
    "123 123",
    "123 123",
    "123 123",
    "123 133",
  ];

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    try {
      e.preventDefault();
      const otpCodeInputed: string = otpCode;
      if (otpCodeInputed.length < 6) {
        throw new Error("Otp code incomplete");
      }
      console.log(otpCodeInputed, typeof otpCodeInputed);
      setPage(1);
      const { data } = await callApi(
        "/2fa/time/verify",
        // {
        //   email: "test@gmail.com",
        //   token: otpCodeInputed,
        //   twoFactorVerificationType: "EMAIL_CODE",
        // }
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-full relative gap-14">
      <Image
        src={authBgContours}
        alt=""
        priority
        className="absolute inset-0 -z-[1] object-cover object-[75%] h-full w-full"
      />
      {page === 0 && (
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
                className="w-5 h-5 md:w-8 md:h-8 bg-formBtn checked:bg-formBtn"
                type="radio"
                name="authentication"
                value="authentication app"
                onChange={(e) => setWhichAuthenticationMode(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1 flex flex-col gap-8">
                <p className="font-semibold">Email Address</p>
                <p>We will send a code to your registered email address</p>
              </div>
              <input
                className="w-5 h-5 md:w-8 md:h-8 bg-formBtn checked:bg-formBtn"
                type="radio"
                name="authentication"
                value="email"
                onChange={(e) => setWhichAuthenticationMode(e.target.value)}
              />
            </div>
          </div>
          <div className="fixed inset-0 bg-[#48484880] bg-opacity-50 flex justify-center items-center px-8">
            <div className="bg-white px-8 py-16 flex flex-col gap-2 md:gap-4 rounded-[10px] w-[100%] md:w-[80%] lg:w-[50%] max-w-[700px]">
              <div className="md:flex justify-between gap-4 mb-2 md:mb-4 hidden">
                <Link href="/2fa">
                  <ChevronLeftIcon className="w-8 h-8" />
                </Link>
                <Link href="/2fa">
                  <CrossCircledIcon className="w-8 h-8" />
                </Link>
              </div>
              <div className="px-8 text-center flex flex-col gap-8">
                <p className="text-base md:text-2xl font-semibold">
                  Enter verification code
                </p>
                <p className="text-sm md:text-base ">
                  Enter the 6-digit code we sent to user.email
                </p>
                <OTPInput
                  value={otpCode}
                  onChange={setOtpCode}
                  numInputs={6}
                  shouldAutoFocus
                  inputType="tel"
                  renderInput={(props) => <input {...props} />}
                  containerStyle="flex justify-center items-center space-x-2 lg:space-x-4"
                  inputStyle="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl md:text-2xl border-gray-700 focus:border-formBtn focus:border-gray-700 focus:text-formBtn text-gray-400  shadow-lg transition-all duration-500"
                  skipDefaultStyles
                />
                <p className="text-sm md:text-base">
                  It may take up to a minute for you to receive this code.
                  <span className="text-formBtn"> Resend Code.</span>
                </p>
                <Button
                  className="mt-4 md:mt-8 bg-formBtn py-4 rounded-md"
                  fullWidth
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={handleSubmit}
                >
                  Complete
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      {page === 1 && (
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
            {codes.map((singleCode, id) => {
              return (
                <p key={id} className="text-2xl md:text-4xl">
                  {singleCode}
                </p>
              );
            })}
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
