import Button from "@/components/primitives/Button/button";
import Input from "@/components/primitives/Form/Input";
import ProgressBar from "@/components/primitives/ProgressBar/progress-bar";
import { useToast } from "@/components/ui/use-toast";
import type { ApiResponse } from "@/interfaces/formInputs";
import AuthLayout from "@/layouts/authLayout";
import callApi from "@/lib/api/callApi";
import {
  checkPasswordStrength,
  zodValidator,
  type SignUpType,
} from "@/lib/utils/validation/validateWithZod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

const SignUp = () => {
  const { toast } = useToast();
  const showModal = useRef(false);
  const [message, setMessage] = useState<ApiResponse>({
    status: "",
    message: "",
    error: undefined,
    data: undefined,
  });

  useEffect(() => {
    const checkLS = () => {
      if (!showModal.current) {
        localStorage.setItem("show-modal", "true");
      }
    };
    checkLS();
  }, []);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
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
    const { data: responseData, error } = await callApi<ApiResponse>(
      "/auth/signup",
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        confirmPassword: data.confirmPassword,
        isTermAndConditionAccepted: data.terms,
      },
    );

    if (error) {
      const castedError = error as ApiResponse;
      setMessage(castedError);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      toast({
        title: castedError.status,
        description: castedError.message,
        duration: 2000,
      });
      return;
    } else {
      toast({
        title: "Success",
        description: responseData?.message,
        duration: 2000,
      });
      reset();
      setTimeout(() => {
        void router.push({
          pathname: "/signup/verification",
          query: { signup: true, email: data.email.toLowerCase() },
        });
      }, 1000);
    }
  };

  return (
    <AuthLayout
      formType="signup"
      heading="Welcome!"
      greeting="Create your account"
      contentClass="md:w-[85%] lg:w-[65%] xl:w-[52%] 2xl:w-[45%] 3xl:w-[29%]"
      bannerTextColor={false}
      withHeader
      hasSuccess={false}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
        action=""
        className="flex flex-col gap-4"
      >
        {message.message !== "" && !message.error ? (
          <p
            className={`rounded-md p-4 text-sm font-medium bg-abeg-error-40 text-abeg-error-20`}
          >
            {message.message}
          </p>
        ) : (
          message.error && (
            <ul className="rounded-md p-4 text-xs font-medium space-y-1 bg-abeg-error-40 text-abeg-error-20 list-disc list-inside">
              {Object.keys(message.error).length > 0 &&
                Object.keys(message.error).map((key) => (
                  <li key={key} className={``}>
                    {message.error![key]}
                  </li>
                ))}
            </ul>
          )
        )}
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
              className={`min-h-[45px]`}
              errorField={errors.firstName}
            />
            {errors.firstName && (
              <p className="text-abeg-teal text-sm mt-2">
                {errors.firstName.message}
              </p>
            )}
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
              className={`min-h-[45px]`}
              errorField={errors.lastName}
            />
            {errors.lastName && (
              <p className="text-abeg-teal text-sm mt-2">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="font-medium text-sm">
            Email
          </label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your valid email"
            className={`min-h-[45px]`}
            {...register("email")}
            errorField={errors.email}
          />
          {errors.email && (
            <p className="text-abeg-teal text-sm mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

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
                      ? "text-text-red"
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
              <p className="text-abeg-teal text-sm mt-2">
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
              <p className="text-abeg-teal text-sm">
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
              className="w-4 md:w-5 h-[1.125rem] mt-1 accent-abeg-teal"
              {...register("terms")}
            />
            <label htmlFor="terms" className="text-sm md:text-base">
              I agree to AbegHelp.me&apos;s{" "}
              <Link href="" className="text-abeg-teal">
                terms of service
              </Link>{" "}
              and{" "}
              <Link href="" className="text-abeg-teal">
                privacy notice
              </Link>
              .
            </label>
          </div>
          {errors.terms && (
            <p className="text-abeg-teal text-sm mt-2">
              {errors.terms.message}
            </p>
          )}
        </div>
        <div className="space-y-5 flex flex-col items-center">
          <Button
            disabled={isSubmitting}
            className="text-white bg-abeg-teal py-4 mt-6 md:w-[60%] lg:w-[55%] xl:w-[52%]"
            fullWidth
            loading={isSubmitting}
          >
            Sign up
          </Button>
          <p className="text-center text-sm">
            Already have an account?&nbsp;
            <Link href="/signin" className="text-abeg-teal font-medium">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
