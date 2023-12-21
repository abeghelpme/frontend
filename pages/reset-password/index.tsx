import Button from "@/components/primitives/Button/button";
import Input from "@/components/primitives/Form/Input";
import ProgressBar from "@/components/primitives/ProgressBar/progress-bar";
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from "@/layouts/authLayout";
import { callApi } from "@/lib/utils/callApi";
import {
  checkPasswordStrength,
  zodValidator,
  type ResetPasswordType,
} from "@/lib/utils/validation/validateWithZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useDeferredValue, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(router.query.token as string);
  }, [router]);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(zodValidator("resetPassword")!),
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

  const onSubmit = async (data: ResetPasswordType) => {
    if (!token)
      return toast({
        title: "Request Failed",
        description: "Incomplete data provided",
        duration: 3000,
      });
    const { data: responseData, error } = await callApi(
      "/auth/password/reset",
      {
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    );

    if (error) {
      return toast({
        title: error.status,
        description: error.message,
        duration: 3000,
      });
    } else {
      toast({
        title: "Success",
        description: responseData.message,
        duration: 3000,
      });
      setTimeout(() => {
        void router.push("/reset-password/success");
      }, 2000);
    }
  };

  return (
    <AuthLayout
      formType="other"
      bannerTextColor
      withHeader={false}
      hasSuccess={false}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
        className="flex flex-col"
      >
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold text-center">Reset Password</h1>
          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  {...register("password")}
                  className={`min-h-[45px] ${
                    errors.password &&
                    "ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
                  }`}
                  placeholder="Create a new password"
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
                <div className="text-abeg-teal text-sm mt-2">
                  <h1>{errors.password.message}</h1>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="font-medium">
                Confirm password
              </label>
              <div className="relative">
                <Input
                  {...register("confirmPassword")}
                  className={`min-h-[45px] ${
                    errors.confirmPassword &&
                    "ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
                  }`}
                  placeholder="Re-enter password"
                  type="password"
                />
              </div>
              {errors.confirmPassword && (
                <div className="text-abeg-teal text-sm mt-2">
                  <h1>{errors.confirmPassword.message}</h1>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          disabled={isSubmitting}
          loading={isSubmitting}
          className="bg-abeg-button-10 font-medium text-md px-10 py-3 mt-6"
        >
          Submit
        </Button>
      </form>
    </AuthLayout>
  );
};
export default ResetPassword;
