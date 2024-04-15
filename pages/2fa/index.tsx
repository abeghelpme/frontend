import { RecoveryCode } from "@/components/2fa";
import { CustomDialog, OtpInputDisplay } from "@/components/common";
import { Button } from "@/components/ui";
import type { ApiResponse, User } from "@/interfaces";
import { AuthenticatedUserLayout } from "@/layouts";
import { callApi } from "@/lib";
import { useSession } from "@/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "sonner";

const TwoFa = () => {
	const router = useRouter();
	const [selectedOption, setSelectedOption] = useState("app");
	const [step, setStep] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [loading, setLoading] = useState({
		resend: false,
		otp: false,
	});
	const [otp, setOtp] = useState("");
	const recoveryCodeRef = useRef<string | null>(null);
	const {
		user,
		actions: { clearSession },
	} = useSession((state) => state);
	const castedUser = user as User;

	const handleStep = async (e: React.FormEvent<HTMLButtonElement>) => {
		if (selectedOption === "app") {
			void router.push("/2fa/app");
		} else {
			setLoading({ ...loading, resend: true });
			e.preventDefault();
			setOpenModal(true);

			const { data, error } = await callApi<ApiResponse>("/auth/2fa/setup", {
				twoFactorType: "EMAIL",
			});

			if (data) {
				toast.success("Success", {
					description: data.message,
				});
				setLoading({ ...loading, resend: false });
			}
			if (error) {
				setLoading({ ...loading, resend: false });
				toast.error("Error", {
					description: error.message,
				});
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLoading({ ...loading, otp: true });
		if (otp.length < 6) {
			setLoading({ ...loading, otp: false });
			return toast.error("Error", {
				description: "Please enter a valid code",
				duration: 1500,
			});
		}
		const { data, error } = await callApi<ApiResponse>("/auth/2fa/complete", {
			token: String(otp),
			twoFactorType: "EMAIL",
		});

		if (error) {
			setLoading({ ...loading, otp: false });
			toast.error(error.status, {
				description: error.message,
				duration: 3000,
			});
		} else {
			setOpenModal(false);
			setOpenModal(false);
			setLoading({ ...loading, otp: false });
			toast.success("Success", {
				description: (data as { message: string }).message,
				duration: 1500,
			});
			recoveryCodeRef.current = data?.data?.recoveryCode as string;
			setTimeout(() => {
				setStep(2);
			}, 700);
		}
	};

	return (
		<AuthenticatedUserLayout
			footer={
				<div className="mx-auto flex w-full justify-end">
					{step === 1 ? (
						<CustomDialog
							isOpen={openModal}
							setIsOpen={() => {
								setOpenModal(false);
								setOtp("");
							}}
							trigger={
								<Button
									variant="primary"
									className="w-fit !px-6"
									onClick={(e) => void handleStep(e)}
									loading={loading.otp}
								>
									NEXT
								</Button>
							}
						>
							<OtpInputDisplay
								otp={otp}
								setOtp={setOtp}
								topSection={
									<p>{`Enter the 6 digits code we sent to ${castedUser?.email}`}</p>
								}
								bottomSection={
									<div className="mt-8 flex w-full flex-col gap-12 lg:gap-14">
										<p className="text-center">
											Didn&apos;t get a code? We can&nbsp;
											<Button
												type="submit"
												disabled={loading.resend}
												onClick={(e) => otp === "" && void handleStep(e)}
												className="!p-0 !text-sm md:!text-base font-medium text-abeg-primary disabled:text-gray-500 disabled:!bg-transparent disabled:cursor-not-allowed inline"
											>
												resend it
											</Button>
										</p>
										<Button
											className={`${
												otp === "" && "cursor-not-allowed"
											} block w-full rounded-md bg-abeg-primary py-4 font-semibold text-white`}
											fullWidth
											type="submit"
											onClick={(e) => void handleSubmit(e)}
											loading={loading.otp}
										>
											Complete
										</Button>
									</div>
								}
							/>
						</CustomDialog>
					) : (
						<Button
							variant="primary"
							className="w-fit !px-6"
							size="sm"
							onClick={() => {
								void router.push("/c");
							}}
						>
							Got it!
						</Button>
					)}
				</div>
			}
		>
			<div className="relative flex min-h-full flex-col justify-between">
				{step === 1 ? (
					<>
						<div className="mx-auto mt-8 lg:mt-10 w-full">
							<h1 className="text-2xl font-semibold">
								Set up two-factor authentication
							</h1>
							<p className="text-formLabel mt-6">
								Add an extra layer of security to your account
							</p>
							<p className="mt-4">
								Two&#8209;factor authentication protects your account by
								requiring an additional code when you log in on a device that we
								don&apos;t recognize.
							</p>
							<div className="mt-[3rem] space-y-8">
								<h2 className="text-xl font-semibold">
									Choose how you want to receive verification code
								</h2>
								<div>
									<label
										htmlFor="app"
										aria-label="Set up with Authenticator app"
										className="space-y-2"
									>
										<h3 className="font-semibold">Authentication app</h3>
										<div className="flex items-center gap-8">
											<p className="balancedText md:text-lg">
												We recommend downloading the{" "}
												<Link
													target="_blank"
													href={
														"https://support.google.com/accounts/answer/1066447?hl=en&co=GENIE.Platform%3DiOS&oco=0"
													}
													className="text-abeg-green-50 font-medium"
												>
													Google Authenticator
												</Link>{" "}
												app if you don&apos;t have one. It will generate a code
												that you&apos;ll enter when you log in.
											</p>
											<input
												type="radio"
												value={"app"}
												name="2fa-app"
												checked={selectedOption === "app"}
												onChange={() => setSelectedOption("app")}
												id="app"
												className="ml-auto accent-abeg-primary"
											/>
										</div>
									</label>
									<hr className="my-4 border-b" />
									<label
										htmlFor="email"
										aria-label="Set up with email"
										className="space-y-2"
									>
										<h3 className=" font-semibold">Email Address</h3>
										<div className="flex items-center gap-2 ">
											<p className="balancedText md:text-lg">
												We will send a code to your registered email address
											</p>
											<input
												type="radio"
												value={"email"}
												name="2fa-email"
												checked={selectedOption === "email"}
												onChange={() => setSelectedOption("email")}
												id="email"
												className="ml-auto accent-abeg-primary"
											/>
										</div>
									</label>
								</div>
							</div>
						</div>
					</>
				) : (
					<RecoveryCode recoveryCode={recoveryCodeRef.current} />
				)}
			</div>
		</AuthenticatedUserLayout>
	);
};

export default TwoFa;
TwoFa.protect = true;
