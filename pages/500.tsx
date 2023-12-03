import Image from "next/image";
import React from "react";

const ServerError: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center flex-col justify-center">
      <div className="relative flex items-center justify-center h-[15rem] md:h-[30rem] w-full">
        <Image
          src="/500.svg"
          alt=""
          sizes="(min-width: 808px) 50vw, 100vw"
          priority
          fill
          className="w-full h-auto"
        />
      </div>
      <p className="text-lg text-abeg-green font-semibold">
        Server error, please try again after some time
      </p>
    </main>
  );
};

export default ServerError;
