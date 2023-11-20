import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Confirmation() {
  return (
    <main className="md:grid md:grid-cols-2 md:gap-10 px-5 md:px-20 h-[100vh] flex justify-center items-center bg-white">
      <div className="hidden md:block">
        <Image
          src={"/abeg-plant.png"}
          alt="abeg-plant"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col w-full md:w-[20rem] lg:w-[30rem]">
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
        <div className="flex justify-center font-bold text-black mb-5">
          Password reset successful
        </div>
        <button
          type="submit"
          className="bg-abeg-green-50 hover:bg-abeg-green-60 transition duration-300 px-5 py-4 text-white font-medium rounded-md"
        >
          <Link href={"register"}>Register</Link>
        </button>
      </div>
    </main>
  );
}
