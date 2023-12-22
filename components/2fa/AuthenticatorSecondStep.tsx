import { ClipboardIcon } from "@radix-ui/react-icons";
import React from "react";
import Button from "../primitives/Button/button";

const AuthenticatorSecondStep = () => {
  return (
    <section className="flex-1 flex flex-col ">
      <div className="px-4 max-w-7xl md:px-16 my-4 flex flex-col gap-4">
        <h1 className=" font-semibold text-lg md:text-2xl mt-8">
          Two-factor authentication is enabled
        </h1>
        <p>
          We’ll now ask for a login code whenever you log in on a device that we
          don’t recognise.
        </p>
        <p>
          Make sure to secure your recovery key in safe place . Without these,
          you may not be able to disable 2FA your account if you lose access to
          your phone or can’t log in using your security method.
        </p>
        <div>
          <h4 className="text-center">Recovery Key</h4>
          <div className="flex flex-col items-center">
            <p className="font-bold text-center">
              FHS DSBS 42H3 WB4F SAIS HFFS ADFV HGT3
            </p>
            <Button className="flex text-abeg-teal mt-2 justify-center  items-center">
              <ClipboardIcon />
              <span>Copy Key</span>
            </Button>
          </div>
        </div>
        <p>
          Keep your recovery key in a secure place as it is the only code that
          can be used to disable your 2FA
        </p>
      </div>
      <hr className="mt-auto" />
      <div className="flex justify-end px-4 max-w-7xl md:px-16 my-4">
        <Button className="bg-abeg-button-10 w-fit " size="sm">
          Got it!
        </Button>
      </div>
    </section>
  );
};

export default AuthenticatorSecondStep;
