import Button from "@/components/primitives/Button/button";
import AuthLayout from "@/layouts/authLayout";
import authPadlock from "@/public/assets/icons/auth/auth-padlock.svg";
import Image from "next/image";
import { useState } from "react";
import OtpInput from "react-otp-input";

const EmailAuth = () => {
  const [otp, setOtp] = useState("");

  console.log(otp);
  return (
    <div className="flex flex-col items-center text-sm md:text-base">
      <div className="text-center space-y-6">
        <Image
          src={authPadlock as string}
          alt=""
          className="w-[80px] aspect-square mx-auto"
        />
        <p className="">
          Enter the 6 digits code we sent to thelocsdesigner@gmail.com
        </p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          containerStyle="flex justify-between gap-1"
          inputStyle="!w-[39px] h-[38px] md:!w-[55px] md:!h-[55px] border-[0.25px] border-[#0068FF]/10 focus:border-abeg-teal focus:border rounded-[3px] shadow-[#565454]/[0.8]"
          inputType="number"
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <Button
        type="submit"
        // disabled={isSubmitting}
        // onClick={handleOption}
        className="text-white block bg-formBtn font-semibold py-4 w-full rounded-md my-8"
        fullWidth
      >
        Confirm
      </Button>
      <div className="space-y-3">
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
          If you’re unable to receive a security code, use one of your&nbsp;
          <button
            type="submit"
            // disabled={isSubmitting}
            // onClick={handleOption}
            className="text-abeg-teal font-medium"
          >
            backup codes.
          </button>
        </p>
      </div>
    </div>
  );
};
const AuthenticateUser = () => {
  return (
    <AuthLayout
      formType="other"
      withHeader={false}
      hasSuccess={false}
      bannerTextColor
    >
      <EmailAuth />
    </AuthLayout>
  );
};

export default AuthenticateUser;
