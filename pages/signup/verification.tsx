import AuthLayout from "@/layouts/authLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "@/components/primitives/Button/button";
import { useToast } from "@/components/ui/use-toast";
import { callApi } from "@/lib/utils/callApi";

const VerificationPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [queryParam, setQueryParam] = useState("");

  useEffect(() => {
    setQueryParam(router.query.email as string);
  }, [router]);

  const handleResendEmail = async () => {
    if (!queryParam)
      return toast({
        title: "Request Failed",
        description: "No email provided",
      });
    const { data, error } = await callApi("/auth/resend-verification", {
      email: queryParam,
    });

    if (error) {
      return toast({
        title: error.status,
        description: error.message,
        duration: 3000,
      });
    } else {
      toast({
        title: "Success",
        description: data.message,
        duration: 3000,
      });
    }
  };

  return (
    <AuthLayout
      contentClass="md:w-[55%] lg:w-[50%] xl:w-[35%] 2xl:w-[30%]"
      formType="signup"
      withHeader={false}
      hasSuccess={false}
    >
      <div className="space-y-2 text-center">
        <h1 className="font-semibold text-abeg-neutral-10 text-xl md:text-2xl">
          Email Verification
        </h1>
        <p className="">
          Please check your email for the verification link sent to you. Click
          the link to verify your email
        </p>
        <div className="flex flex-col gap-2 !mt-6">
          <p className="text-center text-sm">Didn&apos;t get the email?</p>
          <Button
            className="bg-abeg-teal py-4"
            onClick={() => void handleResendEmail()}
          >
            Click here to resend
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerificationPage;
