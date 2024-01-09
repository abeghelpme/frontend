import AppFirstStep from "@/components/2fa/AppFirstStep";
import ShowRecoveryCode from "@/components/2fa/RecoveryCode";
import authBgContours from "@/public/assets/images/shared/bg-contours.png";
import Image from "next/image";
import { useRef, useState } from "react";

const Authenticator = () => {
  const [step, setStep] = useState(2);
  const recoveryCode = useRef<string | null>(null);
  return (
    <main className="relative  flex min-h-screen flex-1 flex-col">
      <Image
        src={authBgContours}
        alt=""
        role="presentation"
        priority
        className="absolute inset-0 -z-[1] h-full w-full object-cover object-[75%]"
      />
      {step === 1 ? (
        <AppFirstStep setStep={setStep} recoveryCode={recoveryCode} />
      ) : (
        <ShowRecoveryCode recoveryCode={recoveryCode.current} />
      )}
    </main>
  );
};

export default Authenticator;
