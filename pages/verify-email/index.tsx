import Button from "@/components/primitives/Button/button";
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from "@/layouts/authLayout";
import { callApi } from "@/lib/utils/callApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VerificationPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [token, setToken] = useState("");
   const [loading, setLoading] = useState(false)

  useEffect(() => {
    setToken(router.query.token as string);
  }, [router]);

  const verifyEmail = async () => {
    setLoading(true);
    if (!token)
      return toast({
        title: "Request Failed",
        description: "No data provided",
        duration: 3000,
      });
    const { data, error } = await callApi("/auth/verify-email", {
      token,
    });

    if (error) {
      setLoading(false);
      return toast({
        title: error.status,
        description: error.message,
        duration: 3000,
      });
    } else {
      setLoading(false);
      toast({
        title: "Success",
        description: data.message,
        duration: 3000,
      });
      setTimeout(() => {
        void router.push("/verify-email/success");
      }, 2000);
    }
  };

  return (
    <AuthLayout
      bannerTextColor
      withHeader={false}
      hasSuccess={false}
      formType="signup"
      contentClass="md:w-[55%] lg:w-[50%] xl:w-[35%] 2xl:w-[30%]"
    >
      {" "}
      <div className="text-center space-y-2">
        <h1 className="text-xl font-medium">Verify your email</h1>
        <div className="">
          <p className="">
            Please click on the button below to verify your email.
          </p>
          <Button
            className="bg-formBtn py-3 !mt-6"
            onClick={() => void verifyEmail()}
            fullWidth
          >
            Verify
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};
export default VerificationPage;
