import { ClipboardIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Button from "../primitives/Button/button";
import { useToast } from "../ui/use-toast";

const ShowRecoveryCode = ({
  recoveryCode,
}: {
  recoveryCode: string | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(recoveryCode as string).then(() => {
        toast({
          title: "Success",
          description: "Key copied to clipboard",
          duration: 3000,
        });
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not copy",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-1 flex-col ">
      <div className="mx-auto my-4 flex w-full max-w-7xl flex-col gap-4 px-4 md:px-16">
        <h1 className=" mt-8 text-lg font-semibold md:text-2xl">
          Two-factor authentication is enabled
        </h1>
        <p>
          We’ll now ask for a login code whenever you log in on a device that we
          don’t recognise.
        </p>
        <p>
          Make sure to secure your recovery key in safe place . Without these,
          you may not be able to disable 2FA your account if you lose access to
          your phone or can’t log in using your security method.
        </p>
        <div>
          <h4 className="text-center text-sm">Recovery Key</h4>
          <div className="flex flex-col items-center">
            <p className="text-center font-bold">{recoveryCode}</p>
            <Button
              className="mt-2 flex items-center justify-center  text-abeg-teal"
              onClick={() => void handleCopy()}
            >
              <ClipboardIcon aria-hidden="true" />
              <span>Copy Key</span>
            </Button>
          </div>
        </div>
        <p>
          Keep your recovery key in a secure place as it is the only code that
          can be used to disable your 2FA
        </p>
      </div>
      <hr className="mt-auto" />
      <div className="mx-auto my-4 flex w-full max-w-7xl justify-end px-4 md:px-16">
        <Button
          className="w-fit bg-abeg-button-10 "
          size="sm"
          onClick={() => void router.push("/create-campaign")}
        >
          Got it!
        </Button>
      </div>
    </div>
  );
};

export default ShowRecoveryCode;
