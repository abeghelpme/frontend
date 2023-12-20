import { callApi } from "@/lib/utils/callApi";
import {
  zodValidator,
  type LoginType,
} from "@/lib/utils/validation/validateWithZod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";

import Button from "@/components/primitives/Button/button";
import Input from "@/components/primitives/Form/Input";

import AuthLayout from "@/layouts/authLayout";
import google from "@/public/assets/icons/shared/google.png";

// import Link from "next/link";

const Login = () => {
  const {
    register,
    handleSubmit,
    // reset,
    // control,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(zodValidator("login")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    const { data: responseData, error } = await callApi("/auth/signin", {
      email: data.email,
      password: data.password,
    });
    console.log(responseData);

    console.log(error);
  };

  return (
    <AuthLayout
      formType="signup"
      greeting="Welcome!"
      heading="Create your account"
      withHeader
      hasSuccess={false}
    >
      <div className="flex flex-col w-full">
        <h2 className="text-center font-semibold text-xl">Welcome back!</h2>
        <p className="text-center text-lg">Sign in to continue</p>

        <form
          className="mt-4"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit(onSubmit)(event);
          }}
        >
          <div className="space-y-1">
            <label htmlFor="email" className="font-medium text-sm">
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
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="font-medium text-sm">
              Password
            </label>
            <Input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Enter password"
              className={`min-h-[45px] ${
                errors.password &&
                "ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <Link
            href={"#"}
            className="text-formBtn text-sm font-semibold inline-flex w-full justify-end mt-2 hover:underline"
          >
            Forgot Password?
          </Link>
          <Button
            disabled={isSubmitting}
            className="text-white bg-formBtn py-4 mt-6 disabled:bg-gray-500 "
            fullWidth
          >
            Sign in
          </Button>
        </form>
        <div className="flex items-center gap-2 my-6">
          <span className="bg-[#F0F2F5] h-[2px] flex-1" />
          <span className="text-gray-500 pb-1 text-sm">or signup with</span>
          <span className="bg-[#F0F2F5] h-[2px] flex-1" />
        </div>
        <Button
          className="flex items-center gap-4 text-black justify-center border border-border"
          fullWidth
        >
          <Image src={google} alt="" className="" />
          <span className="">Continue with Google</span>
        </Button>
        <p className="text-center text-sm mt-6">
          Dont&apos;t have an account?&nbsp;
          <Link href="/signup" className="text-formBtn font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
