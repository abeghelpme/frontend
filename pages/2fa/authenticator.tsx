import React from "react";
import Image from "next/image";

import AuthenticatorFirstStep from "@/components/2fa/AuthenticatorFirstStep";
import authBgContours from "@/public/assets/images/shared/bg-contours.png";
import Button from "@/components/primitives/Button/button";

const authenticator = () => {
  return (
    <main className="min-h-screen  flex flex-col flex-1 relative">
      <Image
        src={authBgContours}
        alt=""
        role="presentation"
        priority
        className="absolute inset-0 -z-[1] object-cover object-[75%] h-full w-full"
      />
      <AuthenticatorFirstStep />
      <hr className="mt-auto" />
      <div className="flex justify-end px-4 max-w-7xl md:px-16 my-4">
        <Button className="bg-abeg-button-10 w-fit " size="sm">
          NEXT
        </Button>
      </div>
    </main>
  );
};

export default authenticator;
