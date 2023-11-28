import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import Link from "next/link";
import Input from "@/components/primitives/Form/Input";
import Button from "@/components/primitives/Button/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, ZodError, ZodType } from "zod";

// Define custom API error type
type ApiErrorResponse = {
  status: "Error";
  message: string;
};

interface FormValues {
  password: string;
  confirmPassword: string;
}

type formData = {
  password: string;
  confirmPassword: string;
};

interface QueryParams {
  token?: string;
}

// Define Zod schema for password and confirmPassword validation
const passwordSchema: ZodType<formData> = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must must not be less than 8 characters",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Password must contain at least one special character",
      })
      .refine((value) => /\d/.test(value), {
        message: "Password must contain at least one digit",
      })
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      }),
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
  } = useForm<FormValues>({});

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // // Validate using Zod schema
      await passwordSchema.parseAsync({
        confirmPassword: data.confirmPassword,
        password: data.password,
      });

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
        // Redirect or handle success
        await new Promise<void>((resolve) => setTimeout(resolve, 2000));
        await router.push("/reset-password/confirmation");
      } else {
        // Handle API errors
        const responseData = (await response.json()) as ApiErrorResponse;
        setServerError(responseData.message);
        // Redirect to another page after 2 seconds
        await new Promise<void>((resolve) => setTimeout(resolve, 2000));
        await router.push("/signin");

        // setTimeout(() => {
        //   router.push("register");
        // }, 2000);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Extract error messages from ZodError
        const validationErrors = Object.fromEntries(
          error.errors.map((e) => [e.path.join("."), e.message]),
        );

        // Set errors for each field in the form
        Object.keys(validationErrors).forEach((field) => {
          // Ensure field is one of the allowed field names
          if (field === "password" || field === "confirmPassword") {
            setError(field as keyof FormValues, {
              type: "manual",
              message: validationErrors[field],
            });
          }
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
        <form onSubmit={void handleSubmit(onSubmit)} className="flex flex-col">
          <div className="space-y-6 mb-14">
            {serverError && (
              <div className="border border-red-500 rounded-lg">
                <div className="p-10 text-red-500 flex justify-center">
                  {serverError}
                </div>
              </div>
            )}
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
                    {...register("password")}
                    className="py-3"
                    placeholder="Enter your new password"
                    type="password"
                  />
                </div>
                {formErrors.password && (
                  <div className="text-red-500">
                    <h1>{formErrors.password.message}</h1>
                  </div>
                )}
              </div>

              <div className="relative">
                <Input
                  {...register("confirmPassword")}
                  className="py-3"
                  placeholder="Confirm your new password"
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

          <Button className="bg-abeg-green-50 hover:bg-abeg-green-60 transition duration-300 font-medium text-md px-10 py-3 mb-5">
            Reset Password
          </Button>

          <Link href={"signIn"}>
            <Button
              variant="secondary"
              className="py-3 text-md"
              fullWidth
              type="button"
            >
              Back to Sign in
            </Button>
          </Link>
        </form>
      </div>
    </main>
  );
};
export default ResetPassword;
