import React from "react";
import Link from "next/link";
import { AbegHelpMe } from "@/components/primitives/abeg-help.me/abeg-help-me-svg";

export default function Confirmation() {
  return (
    <main className="px-5 h-[100dvh] w-full">
      <div className="pt-10 flex justify-center mb-40">
        <AbegHelpMe />
      </div>
      <div className="mx-auto w-full bg-white p-6 rounded-md justify-center items-center md:w-1/2 lg:w-4/12 space-y-10">
        <div>
          <div className="flex justify-center items-center mb-8">
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
          <div className="flex justify-center">
            <h1 className="text-2xl font-semibold text-gray-900">Success!</h1>
          </div>
          <div className="flex justify-center font-semibold text-black mb-5">
            Reset password done successfully
          </div>
        </div>
        <div>
          <Link
            href={"signin"}
            className="bg-abeg-button-10 hover:bg-abeg-button-20 transition duration-300 text-center py-3 text-white font-medium rounded-md w-full"
          >
            <button className="w-full" type="button">
              Return to sign in page
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
