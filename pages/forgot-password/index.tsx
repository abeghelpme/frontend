import Button from "@/components/primitives/Button/button";
import Input from "@/components/primitives/Form/Input";
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from "@/layouts/authLayout";
import callApi from "@/lib/api/callApi";
import {
  zodValidator,
  type ForgotPasswordType,
} from "@/lib/utils/validation/validateWithZod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(zodValidator("forgotPassword")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordType) => {
    const { data: responseData, error } = await callApi(
      "/auth/password/forgot",
      {
        email: data.email,
      },
    );

    if (error) {
      return toast({
        title: error.status.toString(),
        description: error.message,
        duration: 3000,
      });
    } else {
      toast({
        title: "Success",
        description: (responseData as { message: string }).message,
        duration: 3000,
      });
      reset();
      setTimeout(() => {
        void router.push("/signin");
      }, 2000);
    }
  };

  return (
    <AuthLayout formType="other" withHeader={false} hasSuccess={false}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
        className="flex flex-col gap-5"
      >
        <div className="space-y-2 text-center">
          {" "}
          <h1 className="text-xl font-semibold text-abeg-neutral-10 md:text-2xl">
            Forgot Password?
          </h1>
          <p className="md:text-lg">
            Enter your registered email to receive your password reset
            instruction
          </p>
        </div>
        <div className="mt-2 space-y-6">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              {...register("email")}
              autoFocus
              type="email"
              id="email"
              placeholder="Enter your email address"
              className={`min-h-[45px] ${
                errors.email &&
                "ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-abeg-teal">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 text-center">
          <Button
            disabled={isSubmitting}
            loading={isSubmitting}
            className="text-md bg-abeg-button-10 px-10 py-3 font-medium"
          >
            Submit
          </Button>
          <Link href="/signin" className="text-sm text-abeg-teal">
            Back to sign in page
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
export default ForgotPasswordPage;
