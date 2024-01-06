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
          className="mt-6 block w-full rounded-md bg-formBtn p-3 text-center text-sm font-semibold text-white md:rounded-lg md:text-base"
        >
          Back to sign in
        </Link>
      </Success>
    </AuthLayout>
  );
};

export default VerifyEmailSuccessPage;
