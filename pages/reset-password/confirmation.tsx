import React from "react";
import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";
import LogoBanner from "@/layouts/logoBanner";

export default function Confirmation() {
  return (
    <main className="px-5 h-[100dvh] w-full">
      <LogoBanner textColor="formTemp" />
      <div className="mx-auto w-full bg-white p-6 rounded-md justify-center items-center md:w-1/2 lg:w-4/12 space-y-10">
        <div>
          <div className="flex justify-center items-center mb-8">
            <Player
              autoplay
              loop
              src="https://lottie.host/a60494de-7c09-4dbd-b016-97035289ba6a/4FRd7uct0G.json"
              style={{ height: "200px", width: "200px" }}
            />
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
            href={"/signin"}
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
