import LogoBanner from "@/layouts/logoBanner";
import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-10">
      <LogoBanner textColor="formTemp" />

      <div className="bg-white p-4 sm:p-6 w-[90%] sm:w-[50%] md:max-w-[397px] mx-auto rounded-md">
        <Player
          autoplay
          loop
          src="https://lottie.host/a60494de-7c09-4dbd-b016-97035289ba6a/4FRd7uct0G.json"
          style={{ height: "200px", width: "200px" }}
        />
        <div className="text-center">
          <h1 className="text-xl font-medium">Success!</h1>
          <p className="">Your email has been verified</p>
          <Link
            href="/login"
            className="block mt-6 p-3 text-white bg-formBtn w-full rounded-md md:rounded-lg text-sm md:text-base font-semibold"
          >
            Proceed
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
