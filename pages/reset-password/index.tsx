import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextRouter } from "next/router";
import Input from "@/components/primitives/Form/Input";
import Button from "@/components/primitives/Button/button";
import { useForm } from "react-hook-form";
import { z, ZodError, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AbegHelpMe } from "@/components/primitives/abeg-help.me/abeg-help-me-svg";
// import *  from "../../public/abeg-auth-bg.png"

// Define custom API error type
type ApiErrorResponse = {
  status: "Error";
  message: string;
};

type FormValues = {
  password: string;
  confirmPassword: string;
};

type formData = {
  password: string;
  confirmPassword: string;
};

type QueryParams = {
  token?: string;
};

// Define Zod schema for password and confirmPassword validation
const passwordSchema: ZodType<formData> = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        {
          message:
            "Password must contain at least one special character, one digit, one lowercase letter, and one uppercase letter, and must not be less than 8 characters",
        },
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword: React.FC = () => {
  const router: NextRouter = useRouter();
  const [serverError, setServerError] = useState("");
  const { token }: QueryParams = router.query as QueryParams;
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    setError,
    clearErrors,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: FormValues) => {
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
        await router.push("signin");
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
    <main className="px-5 h-[100dvh] w-full">
      <div className="pt-10 flex justify-center mb-40">
        <AbegHelpMe />
      </div>
      <div className="mx-auto w-full bg-white p-6 rounded-md justify-center items-center md:w-1/2 lg:w-4/12">
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
    </main>
  );
};
export default ResetPassword;
