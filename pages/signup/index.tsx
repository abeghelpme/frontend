import Button from "@/components/primitives/Button/button";
import Input from "@/components/primitives/Form/Input";
import google from "@/public/assets/icons/shared/google.png";
import twitter from "@/public/assets/icons/shared/twitter.png";
import sideImg from "@/public/assets/images/auth/shared/auth-side-img.png";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import ProgressBar from "@/components/primitives/ProgressBar/progress-bar";
import {
  checkPasswordStrength,
  signupSchema,
  type SignUpType,
} from "@/lib/utils/validation/validateWithZod";
import { callApi } from "@/lib/utils/callApi";
// import { callApi } from "@/lib/utils/callApi";

// const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

const SignUp = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState<string | undefined>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    // reset,
    // control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignUpType>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const password: string = watch("password", "");

  const [result, setResult] = useState<number>(0);
  const deferredPassword = useDeferredValue(password);
  useEffect(() => {
    const genStrength = async () => {
      const passwordStrength = await checkPasswordStrength(deferredPassword);
      setResult(passwordStrength);
    };
    genStrength().catch((e) => {
      console.log(e);
    });
  }, [deferredPassword]);

  const onSubmit: SubmitHandler<SignUpType> = async (data: SignUpType) => {
    const response = await callApi("/auth/signup", {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    });
    console.log(response);
    //   // const response = await fetch(`${BASE_URL}/auth/signup`, {
    //   //   method: "POST",
    //   //   credentials: "include",
    //   //   body: JSON.stringify({
    //   //     email: data.email,
    //   //     firstName: data.firstName,
    //   //     lastName: data.lastName,
    //   //     phoneNumber: data.phoneNumber,
    //   //     password: data.password,
    //   //     gender: data.gender,
    //   //   }),
    //   //   headers: {
    //   //     "Content-Type": "application/json",
    //   //   },
    //   // }).then<ApiResponse<unknown>>((res) => res.json());

    //   // if (response.status !== "success") {
    //   //   setMessage(response?.message);
    //   //   setError(true);
    //   //   return;
    //   // }

    console.log(data);
  };

  return (
    <div
      role=""
      className="w-[90%] mx-auto py-12 flex items-center justify-center md:w-[65%] lg:w-[90%] lg:gap-10 xl:w-[70%]"
    >
      <div className="hidden lg:block h-full">
        <Image src={sideImg} alt="" className="object-cover h-full" />
      </div>
      <section className="lg:w-[60%] xl:w-[57%]">
        <div className="space-y-2">
          <h1 className="font-semibold text-3xl text-abeg-neutral-10 md:text-4xl">
            Create an account
          </h1>
          <p className="text-gray-500 md:text-xl">
            Already have an account?
            <Link href="" className="text-primary-100 ml-1">
              Sign in
            </Link>
          </p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit(onSubmit)(event);
          }}
          action=""
          className="mt-8 flex flex-col gap-4"
        >
          {message !== "" && (
            <p
              className={`p-2 py-4  rounded-md text-sm ${
                !error
                  ? "bg-abeg-green-40 text-abeg-green-20"
                  : "bg-abeg-error-40 text-abeg-error-20"
              }`}
            >
              {message}
            </p>
          )}
          <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
            <div className="space-y-1">
              <label htmlFor="firstName" className="font-medium">
                First Name
              </label>
              <Input
                autoFocus
                {...register("firstName")}
                type="text"
                id="firstName"
                className="min-h-[45px]"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="lastName" className="font-medium">
                Last Name
              </label>
              <Input
                {...register("lastName")}
                type="text"
                id="lastName"
                className="min-h-[45px]"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
            <div className="space-y-1">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <Input
                type="email"
                id="email"
                className="min-h-[45px]"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
            <div className="">
              <label htmlFor="password" className="text-sm mb-1 font-medium">
                Password
              </label>
              <Input
                type="password"
                {...register("password")}
                id="password"
                className="min-h-[45px] mb-3"
              />

              {password.length > 0 && (
                <div>
                  <ProgressBar
                    value={result * 25}
                    className={`${
                      result <= 2
                        ? "progress-filled:bg-red-500"
                        : result === 3
                          ? "progress-filled:bg-yellow-500"
                          : "progress-filled:bg-green-500"
                    }`}
                  />
                  <p
                    className={`${
                      result <= 2
                        ? "text-red-500"
                        : result === 3
                          ? "text-yellow-500"
                          : "text-green-500"
                    } text-sm`}
                  >
                    <span className="text-black">Password strength:</span>&nbsp;
                    {result <= 2 ? "Weak" : result === 3 ? "Medium" : "Strong"}
                  </p>
                </div>
              )}

              {errors.password && (
                <p className="bg-abeg-green-40 p-4 md:p-5 rounded-lg mt-2 select-none text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <Input
                type="checkbox"
                id="terms"
                className="w-5 h-[1.125rem] mt-1"
                {...register("terms")}
              />
              <label htmlFor="terms" className="text-sm md:text-base">
                By continuing, you agree to AbegHelp{" "}
                <Link href="" className="text-primary-100">
                  terms of service
                </Link>
                &nbsp;and&nbsp;
                <Link href="" className="text-primary-100">
                  privacy notice
                </Link>
                .
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}
          </div>
          <Button
            disabled={isSubmitting}
            className="text-white bg-primary-100 py-4 mt-6 disabled:bg-gray-500"
            fullWidth
          >
            Sign up
          </Button>
        </form>
        <div className="flex items-center gap-2 my-6">
          <span className="bg-[#F0F2F5] h-[2px] flex-1" />
          <span className="text-gray-500 pb-1 font-medium">or</span>
          <span className="bg-[#F0F2F5] h-[2px] flex-1" />
        </div>

        <div className="flex flex-col gap-3">
          <Button
            className="flex items-center gap-4 text-black justify-center border border-border py-4"
            fullWidth
          >
            <Image src={google} alt="" className="" />
            <span className="">Google</span>
          </Button>
          <Button
            className="flex items-center gap-4 text-black justify-center border border-border py-4"
            fullWidth
          >
            <Image src={twitter} alt="" className="" />
            <span className="">Twitter</span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
