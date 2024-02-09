import { RecoveryCode } from "@/components/2fa";
import { CustomDialog, OtpInputDisplay } from "@/components/Shared";
import { Button, useToast } from "@/components/ui";
import type { ApiResponse, User } from "@/interfaces";
import { callApi } from "@/lib";

import authBgContours from "@/public/assets/images/shared/bg-contours.png";
import { useSession } from "@/store";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const TwoFa = () => {
	const router = useRouter();
	const { toast } = useToast();
	const [selectedOption, setSelectedOption] = useState("app");
	const [step, setStep] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [otp, setOtp] = useState("");
	const recoveryCodeRef = useRef<string | null>(null);
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
				duration: 1500,
			});
			recoveryCodeRef.current = data?.data?.recoveryCode as string;

			setTimeout(() => {
				setStep(2);
			}, 1000);
		}
	};

	return (
		<div className="relative flex min-h-full flex-col justify-between">
			<Image
				src={authBgContours}
				alt=""
				role="presentation"
				priority
				className="absolute inset-0 -z-[1] h-full w-full object-cover object-[75%]"
			/>
			{step === 1 ? (
				<>
					<div className="md:px-[10% mx-auto mt-[3.5rem] w-full px-[5%] md:w-[80%] md:px-0 lg:max-w-[1000px]">
						<h1 className="text-2xl font-semibold">
							Set up two-factor authentication
						</h1>
						<p className="mt-6 text-text">
							Add an extra layer of security to your account
						</p>
						<p className="mt-4">
							Two&#8209;factor authentication protects your account by requiring
							an additional code when you log in on a device that we don&apos;t
							recognize.
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
												className="font-medium text-abeg-green-50"
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
											className="ml-auto accent-abeg-teal"
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
											className="ml-auto accent-abeg-teal"
										/>
									</div>
								</label>
							</div>
						</div>
					</div>
					<div className="border-t border-t-formBtn">
						<div className="mx-auto flex w-full justify-end px-[5%] py-6 md:w-[80%] md:px-0 md:py-7 lg:max-w-[1000px]">
							<CustomDialog
								openDialog={openModal}
								setOpen={() => {
									setOpenModal(false);
									setOtp("");
								}}
								trigger={
									<Button
										className="w-fit bg-abeg-button-10 px-6 py-3 font-medium"
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
										<div className="mt-6 flex w-full flex-col gap-10">
											<p className="text-center">
												Didn&apos;t get a code? We can&nbsp;
												<Button
													type="submit"
													disabled={loading}
													onClick={(e) => void handleStep(e)}
													className="p-0 text-base font-medium text-abeg-teal disabled:text-neutral-50"
												>
													resend it
												</Button>
											</p>
											<Button
												className={`${
													otp === "" && "cursor-not-allowed"
												} block w-full rounded-md bg-formBtn py-4 font-semibold text-white`}
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
							</CustomDialog>
						</div>
					</div>
				</>
			) : (
				<RecoveryCode recoveryCode={recoveryCodeRef.current} />
			)}
		</div>
	);
};

export default TwoFa;
TwoFa.protect = true;
