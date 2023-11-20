import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

//input field types
// interface ResetPasswordInput {
//   password: string;
//   confirmPassword: string;
// }

//api request types
// interface ApiResponse {
//   status: string;
//   message: string;
// }

export default function ResetPassword() {
  const [isVisible, setIsVisible] = useState(false);
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const inputType = isVisible ? "text" : "password";
  const inputStyle =
    "border border-gray-300 rounded-md p-4 w-full mt-2 text-gray-500";

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
          className="flex flex-col gap-y-6  w-full md:w-[22rem] lg:w-[25rem] xl:w-[30rem]"
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
              <input
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    password: e.target.value,
                  }))
                }
                type={inputType}
                id="email"
                placeholder="Enter your new password"
                className={inputStyle}
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                onClick={() => setIsVisible(!isVisible)}
              >
                <path
                  d="M17.2564 2.74408C17.5818 3.06951 17.5818 3.59715 17.2564 3.92259L3.92304 17.2559C3.5976 17.5814 3.06996 17.5814 2.74453 17.2559C2.41909 16.9305 2.41909 16.4028 2.74453 16.0774L16.0779 2.74408C16.4033 2.41864 16.9309 2.41864 17.2564 2.74408Z"
                  fill="#667185"
                />
                <path
                  d="M13.1667 4.4767C12.2281 4.03469 11.1698 3.75 10.0004 3.75C7.54702 3.75 5.58275 5.00308 4.18677 6.33307C2.78759 7.66611 1.8797 9.14973 1.52031 9.7915C1.2848 10.2121 1.25674 10.7143 1.45007 11.1603C1.58508 11.4718 1.81468 11.9544 2.1531 12.5143C2.39114 12.9082 2.90343 13.0346 3.29732 12.7965C3.69122 12.5585 3.81756 12.0462 3.57952 11.6523C3.30733 11.2019 3.11846 10.8124 3.00389 10.5537C3.34202 9.95778 4.14282 8.67693 5.33642 7.53975C6.56932 6.36513 8.14214 5.41667 10.0004 5.41667C10.6688 5.41667 11.3003 5.53937 11.8923 5.75116L13.1667 4.4767Z"
                  fill="#667185"
                />
                <path
                  d="M14.7425 7.61491C15.893 8.73288 16.6663 9.97087 16.997 10.5537C16.8824 10.8124 16.6935 11.2019 16.4213 11.6523C16.1833 12.0462 16.3096 12.5585 16.7035 12.7965C17.0974 13.0346 17.6097 12.9082 17.8478 12.5143C18.1862 11.9544 18.4158 11.4718 18.5508 11.1603C18.7441 10.7143 18.7161 10.2121 18.4806 9.7915C18.1304 9.16625 17.2597 7.74193 15.9212 6.43629L14.7425 7.61491Z"
                  fill="#667185"
                />
                <path
                  d="M10.0004 6.66667C10.3033 6.66667 10.5986 6.69898 10.8831 6.76034L9.16823 8.47519C8.45699 8.7262 7.89331 9.28987 7.64231 10.0011L5.92745 11.716C5.86609 11.4315 5.83378 11.1362 5.83378 10.8333C5.83378 8.53215 7.69926 6.66667 10.0004 6.66667Z"
                  fill="#667185"
                />
                <path
                  d="M10.0004 13.3333C9.70805 13.3333 9.42738 13.2831 9.16658 13.1909L7.91571 14.4418C8.52889 14.7968 9.24094 15 10.0004 15C12.3016 15 14.1671 13.1345 14.1671 10.8333C14.1671 10.0738 13.9639 9.36177 13.6089 8.74859L12.358 9.99947C12.4503 10.2603 12.5004 10.5409 12.5004 10.8333C12.5004 12.214 11.3812 13.3333 10.0004 13.3333Z"
                  fill="#667185"
                />
              </svg>
            </div>
          </div>

          <div className="relative">
            <input
              onChange={(e) =>
                setValues((prevValues) => ({
                  ...prevValues,
                  confirmPassword: e.target.value,
                }))
              }
              type={inputType}
              id="password"
              placeholder="Confirm your new password"
              className={inputStyle}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              onClick={() => setIsVisible(!isVisible)}
            >
              <path
                d="M17.2564 2.74408C17.5818 3.06951 17.5818 3.59715 17.2564 3.92259L3.92304 17.2559C3.5976 17.5814 3.06996 17.5814 2.74453 17.2559C2.41909 16.9305 2.41909 16.4028 2.74453 16.0774L16.0779 2.74408C16.4033 2.41864 16.9309 2.41864 17.2564 2.74408Z"
                fill="#667185"
              />
              <path
                d="M13.1667 4.4767C12.2281 4.03469 11.1698 3.75 10.0004 3.75C7.54702 3.75 5.58275 5.00308 4.18677 6.33307C2.78759 7.66611 1.8797 9.14973 1.52031 9.7915C1.2848 10.2121 1.25674 10.7143 1.45007 11.1603C1.58508 11.4718 1.81468 11.9544 2.1531 12.5143C2.39114 12.9082 2.90343 13.0346 3.29732 12.7965C3.69122 12.5585 3.81756 12.0462 3.57952 11.6523C3.30733 11.2019 3.11846 10.8124 3.00389 10.5537C3.34202 9.95778 4.14282 8.67693 5.33642 7.53975C6.56932 6.36513 8.14214 5.41667 10.0004 5.41667C10.6688 5.41667 11.3003 5.53937 11.8923 5.75116L13.1667 4.4767Z"
                fill="#667185"
              />
              <path
                d="M14.7425 7.61491C15.893 8.73288 16.6663 9.97087 16.997 10.5537C16.8824 10.8124 16.6935 11.2019 16.4213 11.6523C16.1833 12.0462 16.3096 12.5585 16.7035 12.7965C17.0974 13.0346 17.6097 12.9082 17.8478 12.5143C18.1862 11.9544 18.4158 11.4718 18.5508 11.1603C18.7441 10.7143 18.7161 10.2121 18.4806 9.7915C18.1304 9.16625 17.2597 7.74193 15.9212 6.43629L14.7425 7.61491Z"
                fill="#667185"
              />
              <path
                d="M10.0004 6.66667C10.3033 6.66667 10.5986 6.69898 10.8831 6.76034L9.16823 8.47519C8.45699 8.7262 7.89331 9.28987 7.64231 10.0011L5.92745 11.716C5.86609 11.4315 5.83378 11.1362 5.83378 10.8333C5.83378 8.53215 7.69926 6.66667 10.0004 6.66667Z"
                fill="#667185"
              />
              <path
                d="M10.0004 13.3333C9.70805 13.3333 9.42738 13.2831 9.16658 13.1909L7.91571 14.4418C8.52889 14.7968 9.24094 15 10.0004 15C12.3016 15 14.1671 13.1345 14.1671 10.8333C14.1671 10.0738 13.9639 9.36177 13.6089 8.74859L12.358 9.99947C12.4503 10.2603 12.5004 10.5409 12.5004 10.8333C12.5004 12.214 11.3812 13.3333 10.0004 13.3333Z"
                fill="#667185"
              />
            </svg>
          </div>

          <button
            type="submit"
            className="bg-abeg-green-50 hover:bg-abeg-green-60 transition duration-300 px-5 py-4 text-white font-medium rounded-md"
          >
            Reset Password
          </button>

          <button
            type="submit"
            className="border border-abeg-green-50 px-5 py-4 text-abeg-green-50 font-medium rounded-md"
          >
            <Link href={"register"}>Back to Sign in</Link>
          </button>
        </form>
      </div>
    </main>
  );
}
