import { ClipboardIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { Button, useToast } from "../ui";

const RecoveryCode = ({ recoveryCode }: { recoveryCode: string | null }) => {
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
		<>
			<div className="mx-auto mt-[3.5rem] flex w-full flex-col gap-8 px-[5%] md:w-[80%] md:px-0 lg:max-w-[1000px]">
				<h1 className="balancedText text-lg font-semibold md:text-2xl">
					Two-factor authentication is enabled
				</h1>
				<p>
					We’ll now ask for a login code whenever you want to log in so that
					we&apos;re sure it&apos;s you
				</p>
				<p className="balancedText">
					Make sure to secure your recovery key in safe place . Without these,
					you may not be able to disable 2FA your account if you lose access to
					your phone or can’t log in using your security method.
				</p>
				<div className="mt-4 space-y-12">
					<div>
						<h4 className="text-center font-medium">Recovery Key</h4>
						<div className="flex flex-col items-center">
							<span className="text-center font-semibold">{recoveryCode}</span>
							<Button
								className="text-abeg-primary mt-2 flex items-center  justify-center"
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
			</div>
			<div className="border-tabeg-primary border-t">
				<div className="mx-auto flex w-full justify-end px-[5%] py-6 md:w-[80%] md:px-0 md:py-7 lg:max-w-[1000px]">
					<Button
						className="bg-abeg-button-10 w-fit "
						size="sm"
						onClick={() => void router.push("/create-campaign")}
					>
						Got it!
					</Button>
				</div>
			</div>
		</>
	);
};

export default RecoveryCode;
