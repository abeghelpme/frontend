import Image from "next/image";
import React from "react";

const ServerError: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative flex h-[15rem] w-full items-center justify-center md:h-[30rem]">
        <Image
          src="/500.svg"
          alt=""
          sizes="(min-width: 808px) 50vw, 100vw"
          priority
          fill
          className="h-auto w-full"
        />
      </div>
      <p className="text-lg font-semibold text-abeg-green">
        Server error, please try again after some time
      </p>
    </main>
  );
};

export default ServerError;
