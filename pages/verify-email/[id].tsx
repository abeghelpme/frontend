import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { callApi } from "@/lib/utils/callApi";

import Button from "@/components/primitives/Button/button";
import Input from "@/components/primitives/Form/Input";
import LogoBanner from "@/layouts/logoBanner";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  zodValidator,
  type ForgotPasswordType,
} from "@/lib/utils/validation/validateWithZod";

const CheckEmail = () => {
  return (
    <div className="w-[90%] sm:w-[50%] md:max-w-[397px] mx-auto flex-1">
      <div className="flex flex-col justify-center h-full">
        <div className="bg-white shadow-auth-layout-shadow text-center space-y-2 p-4 sm:p-6 rounded-md ">
          <h1 className="text-xl font-medium">Email Verification</h1>
          <p className="">
            Please check your email for the verification link sent to you. Click
            the link to verify your email
          </p>
          <p className="text-center text-sm mt-6">
            Dont&apos;t have an account?&nbsp;
            <Link
              href="/signup"
              className="text-formBtn font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const VerificationPage = () => {
  const { id: userId, token } = useRouter().query;
  const [tokenStatus, setTokenStatus] = useState({
    expired: false,
    invalid: false,
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(zodValidator("forgotPassword")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const verifyEmail = async () => {
    const { data, error } = await callApi("/auth/verify-email", {
      userId,
      token,
    });

    if (error?.message === "Invalid/expired token") {
      setTokenStatus({ ...tokenStatus, expired: true });
    }
    if (error?.message === "Invalid token") {
      setTokenStatus({ ...tokenStatus, invalid: true });
    }
    if (data) {
      void router.replace("/signup/success");
    }

    console.log(data);
    console.log(error);
  };

  const onSubmit: SubmitHandler<ForgotPasswordType> = async (
    data: ForgotPasswordType,
  ) => {
    const { data: responseData, error } = await callApi(
      "/auth/resend-verification",
      {
        email: data.email,
      },
    );
    if (responseData) {
      void router.replace("/verify-email/email-sent");
    }

    console.log(responseData);
    console.log(error);
  };

  return (
    <div className="h-full flex flex-col items-center justify-cente pt-[3.25rem] md:pt-[4.5rem]">
      <LogoBanner textColor="formTemp" />
      {token === undefined ? (
        <CheckEmail />
      ) : (
        <div className="w-[90%]  sm:w-[50%] md:max-w-[397px] mx-auto flex-1">
          <div className="flex flex-col justify-center h-full">
            <div className="bg-white shadow-auth-layout-shadow text-center space-y-2 p-4 sm:p-6 rounded-md ">
              <h1 className="text-xl font-medium">Verify your email</h1>

              {!tokenStatus.expired && !tokenStatus.invalid ? (
                <div>
                  <p className="">
                    Please click on the button below to verify your email
                  </p>
                  <Button
                    className="bg-formBtn py-3 mt-2"
                    onClick={() => void verifyEmail()}
                    fullWidth
                  >
                    Verify
                  </Button>
                </div>
              ) : (
                <div>
                  {/* if token is invalid */}
                  {tokenStatus.invalid && (
                    <p className=" text-abeg-error-20">Invalid token</p>
                  )}

                  {/* token has expired */}
                  {tokenStatus.expired && (
                    <div>
                      <p className=" text-abeg-error-20">Token has Expired</p>

                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          void handleSubmit(onSubmit)(event);
                        }}
                        action=""
                      >
                        <div className="space-y-1 mt-4 flex flex-col">
                          <label
                            htmlFor="email"
                            className="font-medium text-sm text-left"
                          >
                            Email Address
                          </label>
                          <Input
                            {...register("email")}
                            autoFocus
                            type="email"
                            id="email"
                            placeholder="Enter your email address"
                            className={`min-h-[45px]`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <Button
                          className="bg-formBtn py-3 mt-2"
                          fullWidth
                          disabled={isSubmitting}
                        >
                          Resend link
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
