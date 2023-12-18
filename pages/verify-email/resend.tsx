import Button from "@/components/primitives/Button/button";
import Input from "@/components/primitives/Form/Input";
import { callApi } from "@/lib/utils/callApi";
import {
  zodValidator,
  type ForgotPasswordType,
} from "@/lib/utils/validation/validateWithZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";

const Resend = () => {
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
      void router.push("/verify-email/check-email");
    }

    console.log(responseData);
    console.log(error);
  };

  return (
    <div>
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit(onSubmit)(event);
          }}
          action=""
        >
          <div className="space-y-1 mt-4 flex flex-col">
            <label htmlFor="email" className="font-medium text-sm text-left">
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
              <p className="text-red-500 text-sm">{errors.email.message}</p>
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
    </div>
  );
};

export default Resend;
