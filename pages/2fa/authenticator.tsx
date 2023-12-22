import React, { useState } from "react";
import Image from "next/image";

import AuthenticatorFirstStep from "@/components/2fa/AuthenticatorFirstStep";
import authBgContours from "@/public/assets/images/shared/bg-contours.png";
import AuthenticatorSecondStep from "@/components/2fa/AuthenticatorSecondStep";

const Authenticator = () => {
  const [step, setStep] = useState(1);
  return (
    <main className="min-h-screen  flex flex-col flex-1 relative">
      <Image
        src={authBgContours}
        alt=""
        role="presentation"
        priority
        className="absolute inset-0 -z-[1] object-cover object-[75%] h-full w-full"
      />
      {step === 1 ? (
        <AuthenticatorFirstStep setStep={setStep} />
      ) : (
        <AuthenticatorSecondStep />
      )}
    </main>
  );
};

export default Authenticator;
