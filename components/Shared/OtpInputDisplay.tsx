import React from "react";
// import Button from '../primitives/Button/button';
import authPadlock from "@/public/assets/icons/auth/auth-padlock.svg";
import Image from "next/image";
import OTPInput from "react-otp-input";

type OtpProps = {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  topSection?: React.ReactNode;
  bottomSection?: React.ReactNode;
};
const OtpInputDisplay = ({
  otp,
  setOtp,
  topSection,
  bottomSection,
}: OtpProps) => {
  return (
    <div className="flex flex-col items-center text-sm md:text-base max-w-[467px]">
      <div className="text-center">
        <Image
          src={authPadlock as string}
          alt=""
          className="w-[80px] aspect-square mx-auto"
        />
        <h1 className="font-medium md:text-2xl mt-6 mb-4">
          Enter your verification code
        </h1>
        {topSection}
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          containerStyle="flex justify-between gap-1"
          inputStyle="!w-[15%] aspect-square border-[0.25px] border-[#0068FF]/10 focus:border-abeg-teal focus:border rounded-[3px] mt-6"
          inputType="number"
          renderInput={(props) => <input {...props} />}
        />
      </div>
      {bottomSection}
      {/* <Button
        type="submit"
        disabled={loading}
        loading={loading}
        onClick={(e) => void handleSubmit(e)}
        className="text-white block bg-formBtn font-semibold py-4 w-full rounded-md my-8"
        fullWidth
      >
        Confirm
      </Button> */}
      {/* <div className="space-y-3">
        <p className="text-center">
          Didn&apos;t get a code? We can&nbsp;
          <button
            type="submit"
            // disabled={isSubmitting}
            // onClick={handleOption}
            className="text-abeg-teal font-medium"
          >
            resend it
          </button>
        </p>
        <p className="text-center text-sm">
          If you’re unable to receive a security code, use one of your backup
          codes.
        </p>
      </div> */}
    </div>
  );
};

export default OtpInputDisplay;
