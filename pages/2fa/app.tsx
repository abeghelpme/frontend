import React, { useRef, useState } from "react";
import Image from "next/image";

import AppFirstStep from "@/components/2fa/AppFirstStep";
import authBgContours from "@/public/assets/images/shared/bg-contours.png";
import AppSecondStep from "@/components/2fa/AppSecondStep";

const Authenticator = () => {
  const [step, setStep] = useState(2);
  const recoveryCode = useRef<string | null>(null);
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
        <AppFirstStep setStep={setStep} recoveryCode={recoveryCode} />
      ) : (
        <AppSecondStep recoveryCode={recoveryCode.current} />
      )}
    </main>
  );
};

export default Authenticator;
