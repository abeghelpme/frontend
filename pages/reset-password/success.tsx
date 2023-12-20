import React from "react";
import Link from "next/link";
import AuthLayout from "@/layouts/authLayout";
import Success from "@/components/Shared/Success";

const ResetPasswordSuccessPage = () => {
  return (
    <AuthLayout withHeader={false} hasSuccess contentClass="" formType="other">
      <Success textContent="Password Reset Successful">
        <Link
          href="/login"
          className="block text-center mt-6 p-3 text-white bg-formBtn w-full rounded-md md:rounded-lg text-sm md:text-base font-semibold"
        >
          Sign in to continue
        </Link>
      </Success>
    </AuthLayout>
  );
};

export default ResetPasswordSuccessPage;
