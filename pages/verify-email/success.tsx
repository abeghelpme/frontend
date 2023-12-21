import Success from "@/components/Shared/Success";
import AuthLayout from "@/layouts/authLayout";
import Link from "next/link";

const VerifyEmailSuccessPage = () => {
  return (
    <AuthLayout withHeader={false} hasSuccess contentClass="" formType="signup">
      {" "}
      <Success textContent="Your email has been verified">
        <Link
          href="/signin"
          className="block text-center mt-6 p-3 text-white bg-formBtn w-full rounded-md md:rounded-lg text-sm md:text-base font-semibold"
        >
          Back to sign in
        </Link>
      </Success>
    </AuthLayout>
  );
};

export default VerifyEmailSuccessPage;
