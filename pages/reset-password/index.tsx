import Input from "@/components/primitives/Form/Input";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  // const inputStyle =
  //   "border border-gray-300 rounded-md p-4 w-full mt-2 text-gray-500";

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    ////interact with the endpoint
    // const UploadResetPassword = async () => {
    //   try {
    //     const response = await fetch(
    //       "https://abeghelp-backend-staging.up.railway.app/api/v1/alive",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           password: values.password,
    //           confirmPassword: values.confirmPassword,
    //         }, as ResetPasswordRequest),
    //       },
    //     );

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }

    //     const Dataresponse  = await response.json();
    //     console.log(Dataresponse);
    //   } catch (error) {
    //     console.error("Error during fetch:", error);
    //   }
    // };
    // UploadResetPassword();
    router.push("reset-password/confirmation");
    console.log(values.password, values.confirmPassword);
  };

  return (
    <main className="md:grid md:grid-cols-2 md:gap-14 lg:gap-10 px-5 md:px-20 h-[100vh] flex justify-center items-center bg-white">
      <div className="hidden md:block">
        <Image
          src={"/abeg-plant.png"}
          alt="abeg-plant"
          width={500}
          height={500}
        />
      </div>
      <div>
        <form
          onSubmit={submitForm}
          className="flex flex-col gap-y-6 w-full md:w-[22rem] lg:w-[25rem] xl:w-[30rem]"
        >
          <h1 className="text-3xl font-medium text-gray-900 ">
            Reset Password
          </h1>
          <p className="text-gray-500 text-xl">
            Kindly choose a new password for your account
          </p>

          <div>
            <label htmlFor="email" className="font-medium text-gray-900">
              Password
            </label>
            <div className="relative">
              <Input
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    password: e.target.value,
                  }))
                }
                placeholder="Enter your new password"
                type="password"
              />
            </div>
          </div>

          <div className="relative">
            <Input
              onChange={(e) =>
                setValues((prevValues) => ({
                  ...prevValues,
                  password: e.target.value,
                }))
              }
              placeholder="Confirm your new password"
              type="password"
            />
          </div>

          <button
            type="submit"
            className="bg-abeg-green-50 hover:bg-abeg-green-60 transition duration-300 px-5 py-2 text-white font-medium rounded-md"
          >
            Reset Password
          </button>

          <button
            onClick={() => {
              router.push("/register");
            }}
            type="button"
            className="border border-abeg-green-50 px-5 py-2 text-abeg-green-50 font-medium rounded-md"
          >
            Back to Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
