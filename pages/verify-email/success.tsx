import Success from "@/components/Shared/Success";
import AuthLayout from "@/layouts/authLayout";
import Link from "next/link";

const VerifyEmailSuccessPage = () => {
  return (
    <AuthLayout withHeader={false} hasSuccess contentClass="" formType="signup">
      {" "}
      <Success textContent="Your email has been verified">
        <Link
          href="/login"
          className="block text-center mt-6 p-3 text-white bg-formBtn w-full rounded-md md:rounded-lg text-sm md:text-base font-semibold"
        >
          Proceed
        </Link>
      </Success>
      {/* <div className="">
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
      </div> */}
    </AuthLayout>
  );
};

export default VerifyEmailSuccessPage;
