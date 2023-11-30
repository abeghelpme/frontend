import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Confirmation() {
  return (
    <main className="flex md:gap-10 lg:gap-10 xl:gap-0 px-5 md:px-20 h-[100dvh] w-full justify-center items-center bg-white">
      <div className="hidden md:block md:w-3/5 lg:w-1/2">
        <Image
          src={"/abeg-plant.png"}
          alt="abeg-plant"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2 lg:pr-10 xl:pr-32">
        <div className="flex justify-center items-center mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
          >
            <path
              d="M80.625 48.75L53.1094 75L39.375 61.875"
              stroke="#007004"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M60 105C84.8528 105 105 84.8528 105 60C105 35.1472 84.8528 15 60 15C35.1472 15 15 35.1472 15 60C15 84.8528 35.1472 105 60 105Z"
              stroke="#007004"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex justify-center font-semibold text-black mb-5">
          Password reset successful
        </div>
        <Link
          href={"signIn"}
          className="bg-abeg-green-50 hover:bg-abeg-green-60 transition duration-300 text-center px-5 py-3 text-white font-medium rounded-md w-full"
        >
          <button type="button">Sign in</button>
        </Link>
      </div>
    </main>
  );
}
