import DialogComponent from "@/components/Shared/Dialog";
import OtpInputDisplay from "@/components/Shared/OtpInputDisplay";
import Button from "@/components/primitives/Button/button";
import { useToast } from "@/components/ui/use-toast";
import type { ApiResponse, User } from "@/interfaces/apiResponses";
import callApi from "@/lib/api/callApi";
import authBgContours from "@/public/assets/images/shared/bg-contours.png";
import { useSession } from "@/store/useSession";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const TwoFa = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState("app");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const { user } = useSession((state) => state);
  const castedUser = user as User;

  const handleStep = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (selectedOption === "app") {
      void router.push("/2fa/app");
    } else {
      setLoading(true);
      e.preventDefault();
      const { data, error } = await callApi<ApiResponse>("/auth/2fa/setup", {
        twoFactorType: "EMAIL",
      });

      if (data) {
        toast({
          title: "Success",
          description: data.message,
          duration: 3000,
        });
        setOpenModal(true);
        setLoading(false);
      }
      if (error) {
        setLoading(false);
        toast({
          title: "Error",
          description: error.message,
          duration: 3000,
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (otp.length < 6) {
      setLoading(false);
      return toast({
        title: "Error",
        description: "Please enter a valid code",
        duration: 1500,
      });
    }
    const { data, error } = await callApi<ApiResponse>("/auth/2fa/complete", {
      token: String(otp),
      twoFactorType: "EMAIL",
    });
    if (error) {
      setLoading(false);
      return toast({
        title: error.status as string,
        description: error.message,
        duration: 3000,
      });
    } else {
      setLoading(false);
      toast({
        title: "Success",
        description: (data as { message: string }).message,
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-between relative">
      <Image
        src={authBgContours}
        alt=""
        role="presentation"
        priority
        className="absolute inset-0 -z-[1] object-cover object-[75%] h-full w-full"
      />
      <div className="w-full mx-auto px-[5%] md:px-[10%] max-w-7xl">
        <h1 className="mt-[3.5rem] font-semibold text-2xl">
          Set up two-factor authentication
        </h1>
        <p className="mt-6 text-text">
          Add an extra layer of security to your account
        </p>
        <p className="mt-4">
          Two-factor authentication protects your account by requiring an
          additional code when you log in on a device that we don&apos;t
          recognise.
        </p>
        <h2 className="mt-[3rem] font-semibold text-xl">
          Choose how you want to receive verification code
        </h2>

        <div>
          <h3 className="mt-10 font-semibold">Authentication app</h3>
          <div className="flex gap-2 items-center">
            <label htmlFor="app">
              <Link
                target="blank"
                href={
                  "https://play.google.com/store/apps/details?id=com.google.android.apps.app2&hl=en&gl=US"
                }
                className="text-abeg-teal"
              >
                Recommended
              </Link>
              .We recommend downloading the Google Authenticator app if you
              don&apos;t have one. It will generate a code that you&apos;ll
              enter when you log in.
            </label>
            <input
              type="radio"
              value={"app"}
              name="2fa"
              checked={selectedOption === "app"}
              onChange={() => setSelectedOption("app")}
              id="app"
              className="accent-abeg-teal ml-auto"
            />
          </div>
          <hr className="border-b my-4" />
          <h3 className=" font-semibold">Email Address</h3>
          <div className="flex gap-2 items-center ">
            <label htmlFor="email">
              We will send a code to your registered email address
            </label>
            <input
              type="radio"
              value={"email"}
              name="2fa"
              checked={selectedOption === "email"}
              onChange={() => setSelectedOption("email")}
              id="email"
              className="accent-abeg-teal ml-auto"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full px-[5%] md:px-[10%] py-6 md:py-7 max-w-7xl border-t border-t-formBtn">
        <DialogComponent
          openDialog={openModal}
          setOpen={() => {
            setOpenModal(false);
            setOtp("");
          }}
          trigger={
            <Button
              className="bg-abeg-button-10 w-fit py-3 px-6 font-medium"
              onClick={(e) => void handleStep(e)}
              loading={loading}
            >
              NEXT
            </Button>
          }
        >
          <OtpInputDisplay
            otp={otp}
            setOtp={setOtp}
            topSection={
              <>
                <p className="">{`Enter the 6 digits code we sent to ${castedUser?.email}`}</p>
              </>
            }
            bottomSection={
              <div className="flex flex-col gap-10 mt-6 w-full">
                <p className="text-center">
                  Didn&apos;t get a code? We can&nbsp;
                  <Button
                    type="submit"
                    disabled={loading}
                    onClick={(e) => void handleStep(e)}
                    className="text-abeg-teal font-medium p-0 text-base disabled:text-neutral-50"
                  >
                    resend it
                  </Button>
                </p>
                <Button
                  className={`${
                    otp === "" && "cursor-not-allowed"
                  } text-white block bg-formBtn font-semibold py-4 w-full rounded-md`}
                  fullWidth
                  type="submit"
                  onClick={(e) => otp !== "" && void handleSubmit(e)}
                  loading={loading}
                >
                  Complete
                </Button>
              </div>
            }
          />
        </DialogComponent>
      </div>
    </div>
  );
};

export default TwoFa;
