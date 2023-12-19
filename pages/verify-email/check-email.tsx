import Link from "next/link";

const CheckEmail = () => {
  return (
    <div className="w-[90%] sm:w-[50%] md:max-w-[397px] mx-auto flex-1">
      <div className="flex flex-col justify-center h-full">
        <div className="bg-white shadow-auth-layout-shadow text-center space-y-2 p-4 sm:p-6 rounded-md ">
          <h1 className="text-xl font-medium">Email Verification</h1>
          <p className="">
            Please check your email for the verification link sent to you. Click
            the link to verify your email
          </p>
          <p className="text-center text-sm mt-6">
            Didn&apos;t get the email?&nbsp;
            <Link
              href="/verify-email/resend"
              className="text-formBtn font-medium hover:underline"
            >
              Click here to resend
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
