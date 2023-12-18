import Button from "@/components/primitives/Button/button";
import Input from "@/components/primitives/Form/Input";
import ProgressBar from "@/components/primitives/ProgressBar/progress-bar";
import LogoBanner from "@/layouts/logoBanner";
import {
  checkPasswordStrength,
  zodValidator,
  type ResetPasswordType,
} from "@/lib/utils/validation/validateWithZod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NextRouter } from "next/router";
import { useRouter } from "next/router";
import React, { useDeferredValue, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodError } from "zod";
// import *  from "../../public/abeg-auth-bg.png"

// Define custom API error type
type ApiErrorResponse = {
  status: "Error";
  message: string;
};

type formData = {
  password: string;
  confirmPassword: string;
};

type QueryParams = {
  token?: string;
};

// Define Zod schema for password and confirmPassword validation
// const passwordSchema: ZodType<formData> = z
//   .object({
//     password: z
//       .string()
//       .min(6, { message: "Password must be at least 6 characters" })
//       .max(50)
//       .regex(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
//         {
//           message:
//             "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
//         },
//       ),
//     // .refine(
//     //   async (value) => {
//     //     const result = await checkPasswordStrength(value);
//     //     return typeof result === "number" && result < 3 ? false : true;
//     //   },
//     //   {
//     //     message: "Password is too weak!!",
//     //   },
//     // ),
//     confirmPassword: z.string().min(6, { message: "Passwords must match" }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

const ResetPassword: React.FC = () => {
  const router: NextRouter = useRouter();
  const [serverError, setServerError] = useState("");
  // const password: string = watch("password", "");
  const { token }: QueryParams = router.query as QueryParams;
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    setError,
    clearErrors,
    watch,
  } = useForm<ResetPasswordType>({
    //import and use resetPassword type here
    resolver: zodResolver(zodValidator("resetPassword")!), //import and use resolver: zodResolver(zodValidator("resetPassword")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const password: string = watch("password", "");
  const [result, setResult] = useState<number>(0);
  const deferredPassword = useDeferredValue(password);

  useEffect(() => {
    const genStrength = async () => {
      const passwordStrength = await checkPasswordStrength(deferredPassword); //import and use checkPasswordStrength here
      setResult(passwordStrength);
    };
    genStrength().catch((e) => {
      console.log(e);
    });
  }, [deferredPassword]);

  const onSubmit = async (data: formData) => {
    try {
      const response = await fetch(
        "https://abeghelp-backend-staging.up.railway.app/api/v1/auth/password/reset",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            token,
            password: data.password,
            confirmPassword: data.confirmPassword,
          }),
        },
      );

      if (response.ok) {
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));
        await router.push("/reset-password/confirmation");
      } else {
        const responseData = (await response.json()) as ApiErrorResponse;
        setServerError(responseData.message);
        // Redirect to another page after 2 seconds
        await new Promise<void>((resolve) => setTimeout(resolve, 2000));
        await router.push("/signin");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setError("root.serverCaughtError", {
          type: error.name,
          message: error.message,
        });
      }
    }
  };

  // Clear errors after a timeout
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (formErrors.password || formErrors.confirmPassword || serverError) {
      timeoutId = setTimeout(() => {
        clearErrors();
        setServerError("");
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    formErrors.password,
    formErrors.confirmPassword,
    serverError,
    clearErrors,
  ]);

  return (
    <div
      role=""
      className="mx-auto w-full bg-white p-6 rounded-md justify-center items-center md:w-1/2 lg:w-4/12"
    >
      <LogoBanner textColor="formTemp" />
      <div className="space-y-6 w-full h-full lg:space-y-0 mt-40">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit(onSubmit)(event);
          }}
          className="flex flex-col"
        >
          <div className="space-y-6">
            {serverError && (
              <div className="border border-red-500 rounded-lg">
                <div className="p-10 text-red-500 flex justify-center">
                  {serverError}
                </div>
              </div>
            )}
            <div className="flex justify-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900">
                Reset Password
              </h1>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="font-medium text-gray-900">
                  Password
                </label>
                <div className="relative">
                  <Input
                    {...register("password")}
                    className="py-3"
                    placeholder="Create a password"
                    type="password"
                  />
                </div>
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
                {formErrors.password && (
                  <div className="text-red-500">
                    <h1>{formErrors.password.message}</h1>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="font-medium text-gray-900">
                  Confirm password
                </label>
                <div className="relative">
                  <Input
                    {...register("confirmPassword")}
                    className="py-3"
                    placeholder="Re-enter password"
                    type="password"
                  />
                </div>
                {formErrors.confirmPassword && (
                  <div className="text-red-500">
                    <h1>{formErrors.confirmPassword.message}</h1>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button className="bg-abeg-button-10 hover:bg-abeg-button-20 transition duration-300 font-medium text-md px-10 py-3 mt-6">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
