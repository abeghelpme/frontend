import Input from "@/components/primitives/Form/Input";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPassword() {
  const router = useRouter();
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router;
    values;
  };

  return (
    <main className="flex md:gap-10 lg:gap-10 xl:gap-0 px-5 md:px-20 h-[100dvh] w-full justify-center items-center bg-white">
      <div className="hidden md:block md:w-3/5 lg:w-1/2">
        <Image
          src={"/abeg-plant.png"}
          alt="abeg-plant"
          width={500}
          height={500}
        />
      </div>
      <div className="md:w-1/2 lg:pr-10 xl:pr-20">
        <form onSubmit={submitForm} className="flex flex-col">
          <div className="space-y-6 mb-14">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-gray-900 ">
                Reset Password
              </h1>
              <p className="text-gray-500">
                Kindly choose a new password for your account
              </p>
            </div>

            <div className="space-y-4">
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
                      confirmPassword: e.target.value,
                    }))
                  }
                  placeholder="Confirm your new password"
                  type="password"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-abeg-green-50 hover:bg-abeg-green-60 transition duration-300 px-5 py-3 mb-5 text-white font-medium rounded-md"
          >
            Reset Password
          </button>

          <Link
            href={"signIn"}
            className="border border-abeg-green-50 px-5 py-3 text-center text-abeg-green-50 font-medium rounded-md"
          >
            <button type="button">Back to Sign in</button>
          </Link>
        </form>
      </div>
    </main>
  );
}
