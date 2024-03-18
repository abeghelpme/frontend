import { useCopyToClipboard } from "@/lib/hooks";
import { ClipboardIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { Button } from "../ui";

const RecoveryCode = ({ recoveryCode }: { recoveryCode: string | null }) => {
	const { copyToClipboard } = useCopyToClipboard();

	const handleCopy = () => {
		copyToClipboard(recoveryCode as string);

		toast.success("Success", {
			description: "Key copied to clipboard",
		});
	};

	return (
		<div className="mx-auto mt-8 flex w-full flex-col gap-8">
			<h1 className="balancedText text-lg font-semibold md:text-2xl">
				Two-factor authentication is enabled
			</h1>
			<p>
				We’ll now ask for a login code whenever you want to log in so that
				we&apos;re sure it&apos;s you
			</p>
			<p className="balancedText">
				Make sure to secure your recovery key in safe place . Without these, you
				may not be able to disable 2FA your account if you lose access to your
				phone or can’t log in using your security method.
			</p>
			<div className="mt-4 space-y-12">
				<div>
					<h4 className="text-center font-medium">Recovery Key</h4>
					<div className="flex flex-col items-center">
						<span className="text-center font-semibold">{recoveryCode}</span>
						<Button
							className="mt-2 flex items-center justify-center gap-1 text-abeg-primary"
							onClick={handleCopy}
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
		</div>
	);
};

export default RecoveryCode;
