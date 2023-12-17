import Button from "@/components/primitives/Button/button";
import Input from "@/components/primitives/Form/Input";
import ProgressBar from "@/components/primitives/ProgressBar/progress-bar";
import LogoBanner from "@/layouts/logoBanner";
import { callApi } from "@/lib/utils/callApi";
import {
  checkPasswordStrength,
  zodValidator,
  type SignUpType,
} from "@/lib/utils/validation/validateWithZod";
import google from "@/public/assets/icons/shared/google.png";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDeferredValue, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

const SignUp = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    isTermAndConditionAccepted: "",
    default: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignUpType>({
    resolver: zodResolver(zodValidator("signup")!),
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
    const { data: responseData, error } = await callApi("/auth/signup", {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      confirmPassword: data.confirmPassword,
      isTermAndConditionAccepted: data.terms,
    });

    type ErrorResponse = {
      status: string;
      message: string;
      error?: {
        [key: string]: string[];
      };
    };

    if (error) {
      const castedError = error as ErrorResponse;
      if (error?.message === "Validation failed") {
        setIsError(true);
        setMessage({
          ...message,
          firstName: castedError?.error?.firstName
            ? castedError?.error?.firstName[0]
            : "",
          lastName: castedError?.error?.lastName
            ? castedError?.error?.lastName[0]
            : "",
          password: castedError?.error?.password
            ? castedError?.error?.password[0]
            : "",
          confirmPassword: castedError?.error?.confirmPassword
            ? castedError?.error?.confirmPassword[0]
            : "",
          isTermAndConditionAccepted: castedError?.error
            ?.isTermAndConditionAccepted
            ? castedError?.error?.isTermAndConditionAccepted[0]
            : "",
        });
        return;
      } else if (error?.message === "User with email already exists") {
        setIsError(true);
        setMessage({
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          isTermAndConditionAccepted: "",
          default: "",
          email: error?.message,
        });
        return;
      } else {
        setIsError(true);
        setMessage({
          ...message,
          default: error?.message,
        });
        return;
      }
    }

    if (responseData.status === "success") {
      setMessage({ ...message, default: responseData.message });
      setTimeout(() => {
        void router.push("/verify-email");
      }, 1000);
    }
  };

  return (
    <div
      role=""
      className="w-[90%] mx-auto py-12 flex items-center justify-center md:w-[70%] lg:w-[65%] xl:w-[52%] 2xl:w-[45%] h-full"
    >
      <div className="space-y-6 w-full h-full lg:space-y-0">
        <LogoBanner textColor="formTemp" />
        <div className="rounded-lg md:rounded-none mx-auto bg-white px-4 py-10 lg:p-12">
          <div className="space-y-2 text-center font-medium">
            <p className="text-lg md:text-xl">Welcome</p>
            <h1 className="font-semibold text-abeg-neutral-10 md:text-2xl">
              Create your account
            </h1>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleSubmit(onSubmit)(event);
            }}
            action=""
            className="mt-8 flex flex-col gap-4"
          >
            {message.default === "" && (
              <p
                className={`rounded-md p-4 text-sm font-medium ${
                  !isError
                    ? "bg-abeg-green-40 text-abeg-green-20"
                    : "bg-abeg-error-40 text-abeg-error-20"
                }`}
              >
                {message.default}
              </p>
            )}
            {/* Firstname and LastName */}
            <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
              <div className="space-y-1">
                <label htmlFor="firstName" className="font-medium text-sm">
                  First Name
                </label>
                <Input
                  autoFocus
                  {...register("firstName")}
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className={`min-h-[45px] ${
                    message.firstName &&
                    "ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
                  }`}
                  errorField={errors.firstName}
                />
                {isError ? (
                  <p className="text-red-500 text-sm">{message.firstName}</p>
                ) : null}
              </div>
              <div className="space-y-1">
                <label htmlFor="lastName" className="font-medium text-sm">
                  Last Name
                </label>
                <Input
                  {...register("lastName")}
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className={`min-h-[45px] ${
                    message.lastName &&
                    "ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
                  }`}
                  errorField={errors.lastName}
                />
                {isError ? (
                  <p className="text-red-500 text-sm">{message.lastName}</p>
                ) : null}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="font-medium text-sm">
                Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your valid email"
                className={`min-h-[45px] ${
                  message.email &&
                  "ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
                }`}
                {...register("email")}
                errorField={errors.email}
              />
              {isError && (
                <p className="text-red-500 text-sm">{message.email}</p>
              )}
            </div>

            {/* Password and confirm Password */}
            <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
              <div className="space-y-1">
                <label htmlFor="password" className="text-sm mb-1 font-medium">
                  Password
                </label>
                <Input
                  type="password"
                  {...register("password")}
                  id="password"
                  placeholder="Create a secure password"
                  className={`min-h-[45px]`}
                  errorField={errors.password}
                />
                {password.length > 0 && (
                  <div>
                    <ProgressBar
                      value={result * 25}
                      className={`${
                        result < 2
                          ? "progress-filled:bg-red-500"
                          : result >= 2 && result <= 3
                            ? "progress-filled:bg-yellow-500"
                            : "progress-filled:bg-green-500"
                      }`}
                    />
                    <p
                      className={`${
                        result <= 2
                          ? "text-red-500"
                          : result >= 2 && result <= 3
                            ? "text-yellow-500"
                            : "text-green-500"
                      } text-sm`}
                    >
                      <span className="text-black">Password strength:</span>
                      &nbsp;
                      {result < 2
                        ? "Weak"
                        : result >= 2 && result <= 3
                          ? "Medium"
                          : "Strong"}
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="bg-abeg-green-40 p-4 rounded-lg select-none text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm mb-1 font-medium"
                >
                  Confirm Password
                </label>
                <Input
                  type="password"
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className={`min-h-[45px]`}
                  errorField={errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <div className="flex gap-2 w-full">
                <Input
                  type="checkbox"
                  id="terms"
                  className="w-4 md:w-5 h-[1.125rem] mt-1"
                  {...register("terms")}
                />
                <label htmlFor="terms" className="text-sm md:text-base">
                  I agree to AbegHelp.me&apos;s{" "}
                  <Link href="" className="text-[#268384]">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="" className="text-[#268384]">
                    privacy notice
                  </Link>
                  .
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.terms.message}
                </p>
              )}
            </div>
            <div className="space-y-5 md:space-y-8 flex flex-col items-center">
              <Button
                disabled={isSubmitting}
                className="text-white bg-formBtn py-4 mt-6 disabled:bg-gray-500 md:w-[60%] lg:w-[55%] xl:w-[52%]"
                fullWidth
              >
                Sign up
              </Button>
              <p className="text-center text-sm">
                Already have an account?&nbsp;
                <Link href="/login" className="text-formBtn font-medium">
                  Login
                </Link>
              </p>
            </div>
          </form>
          <div className="flex items-center gap-2 my-6">
            <span className="bg-[#F0F2F5] h-[2px] flex-1" />
            <span className="text-gray-500 pb-1">or signup with</span>
            <span className="bg-[#F0F2F5] h-[2px] flex-1" />
          </div>
          <Button
            className="flex items-center gap-4 text-black justify-center border border-border py-4"
            fullWidth
          >
            <Image src={google} alt="" className="" />
            <span className="">Continue with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
