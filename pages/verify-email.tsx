import LogoBanner from "@/layouts/logoBanner";

const VerificationPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-cente pt-[3.25rem] md:pt-[4.5rem]">
      <LogoBanner textColor="formTemp" />

      <div className="w-[90%] sm:w-[50%] md:max-w-[397px] mx-auto flex-1">
        <div className="flex flex-col justify-center h-full">
          <div className="bg-white text-center space-y-2 p-4 sm:p-6 rounded-md ">
            <h1 className="text-xl font-medium">Email Verification</h1>
            <p className="">
              Please check your email for the verification link sent to you.
              Click the link to verify your email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
