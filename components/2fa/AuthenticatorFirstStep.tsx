import React, { useState } from "react";
import Loader from "./Loader";
import QRCode from "@/public/assets/images/shared/QR-code.png";
import Image from "next/image";

const AuthenticatorFirstStep = () => {
  const [loading] = useState(false);
  return (
    <section className="flex-1 flex flex-col px-4 max-w-7xl md:px-16 my-4">
      <h1 className="mt-[3rem] font-semibold px-4 md:px-[6.25rem] text-lg md:text-2xl">
        Setting up your two-factor authentication
      </h1>
      <ol className=" mt-6 list-inside list-decimal px-4 md:px-[6.25rem] flex flex-col gap-3">
        <li className="font-semibold">Download an authentication app</li>
        <p>
          We recommend downloading Google Authenticator app if you don’t have
          one installed yet.
        </p>
        <li className="font-semibold">Scan this QR code or copy the key.</li>
        <p>
          Scan this QR code in the authentication app or copy key and paste it
          in the authentication app to generate your verification code
        </p>
        <div className="min-h-[12rem] flex items-center">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex flex-col gap-y-2 md:flex-row items-center justify-around w-full">
              <div className="relative">
                <Image
                  className="w-[150px] md:w-[150px] lg:w-[150px] lg:aspect-square"
                  src={QRCode}
                  priority
                  alt=""
                />
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="border-b-2 w-10" />
                <p>or</p>
                <span className="border-b-2 w-10" />
              </div>

              <div>
                <p className="text-bold text-xl">
                  FHS DSBS 42H3 WB4F <br /> SAIS HFFS ADFV HGT3
                </p>
              </div>
            </div>
          )}
        </div>
        <li className="font-semibold">Copy and enter 6-digit code</li>
        <p>
          After the barcode/QR code has been scanned or the key has been
          entered, your authentication app will generate a 6-digit code. Copy
          the code and then come back to enter it.
        </p>
      </ol>
    </section>
  );
};

export default AuthenticatorFirstStep;
