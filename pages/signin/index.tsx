import DialogComponent from "@/components/Shared/Dialog";
import Button from "@/components/primitives/Button/button";
import Input from "@/components/primitives/Form/Input";
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from "@/layouts/authLayout";
import { callApi } from "@/lib/utils/callApi";
import {
  zodValidator,
  type LoginType,
} from "@/lib/utils/validation/validateWithZod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

const Login = () => {
  const showModal = useRef(false);
  const router = useRouter();
  const { toast } = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [choose2FA, setChoose2FA] = useState("true");
  useEffect(() => {
    const checkLS = () => {
      if (!showModal.current) {
        const modal = localStorage.getItem("show-modal");
        if (modal !== null) {
          setChoose2FA(modal);
        }
        showModal.current = true;
      } else {
        localStorage.setItem("show-modal", choose2FA);
      }
    };
    checkLS();
  }, [choose2FA]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(zodValidator("login")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleOption = () => {
    setChoose2FA("false");
    setOpenModal(false);
  };

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    const { data: responseData, error } = await callApi("/auth/signin", {
      email: data.email,
      password: data.password,
    });

    if (error) {
      return toast({
        title: error.status,
        description: error.message,
        duration: 3000,
      });
    } else {
      choose2FA === "true" && setOpenModal(true);
      toast({
        title: "Success",
        description: responseData.message,
        duration: 3000,
      });
      reset();
      setTimeout(() => {
        void router.push("/create-campaign");
      }, 2000);
    }
    return;
  };

  return (
    <AuthLayout
      formType="other"
      heading="Welcome back!"
      greeting="Sign in to continue"
      withHeader
      bannerTextColor
      hasSuccess={false}
    >
      <form
        className=""
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
            <p className="text-abeg-teal text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1 mt-4">
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
            <p className="text-abeg-teal text-sm">{errors.password.message}</p>
          )}
        </div>
        <Link
          href="/forgot-password"
          className="text-formBtn text-sm font-semibold inline-flex w-full justify-end mt-2 hover:underline"
        >
          Forgot Password?
        </Link>
       <div className="flex flex-col gap-3">
          <DialogComponent
            openDialog={openModal}
            setOpen={() => setOpenModal(false)}
            trigger={
              <Button
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                className="text-white bg-formBtn py-4 mt-6 disabled:bg-gray-500 "
                fullWidth
              >
                Sign in
              </Button>
            }
          >
            <div className="text-center">
              <h2 className="font-semibold text-2xl">
                Keep your account safe!
              </h2>
              <div className="space-y-2 mt-4">
                <p className="">Your safety is our number one priority</p>
                <p className="">
                  Activate two-factor authentication and add an extra layer of
                  security to your account
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href={"#"}
                  className="text-white block bg-formBtn text-sm font-semibold py-4 w-full rounded-md"
                >
                  Activate
                </Link>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleOption}
                  className="text-abeg-teal border-formBtn border py-4 mt-4 disabled:bg-gray-500 disabled:text-white"
                  fullWidth
                >
                  Skip
                </Button>
              </div>
            </div>
          </DialogComponent>
          <p className="text-center text-sm">
            Don&apos;t have an account?&nbsp;
            <Link href="/signup" className="text-abeg-teal font-medium">
              Register
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
