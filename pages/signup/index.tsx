import { setTimeout } from "timers";
import { CloudFlareTurnStile } from "@/components/Shared";
import { Button, Input, ProgressBar, useToast } from "@/components/ui";
import type { ApiResponse } from "@/interfaces";
import { AuthLayout } from "@/layouts";
import {
	type SignUpType,
	callApi,
	checkPasswordStrength,
	zodValidator,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

const SignUp = () => {
	const [botStatus, setBotStatus] = useState<"success" | "error" | "idle">(
		"idle"
	);
	const cfTurnStile = useRef<TurnstileInstance>(null);
	const { toast } = useToast();
	const showModal = useRef(false);
	const [message, setMessage] = useState<ApiResponse>({
		status: "",
		message: "",
		error: undefined,
		data: undefined,
	});

	const handleBotStatus = (status: "success" | "error" | "idle") =>
		setBotStatus(status);

	useEffect(() => {
		const checkLS = () => {
			if (!showModal.current) {
				localStorage.setItem("skip-2Fa", "true");
			}
		};
		checkLS();
	}, []);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<SignUpType>({
		resolver: zodResolver(zodValidator("signup")!),
		mode: "onChange",
		reValidateMode: "onChange",
	});

	const password = watch("password", "");

	const [result, setResult] = useState<number>(0);
	const deferredPassword = useDeferredValue(password);
	useEffect(() => {
		const genStrength = async () => {
			const passwordStrength = await checkPasswordStrength(deferredPassword);
			setResult(passwordStrength);
		};
		genStrength().catch((e) => {
			console.log(e);
		});
	}, [deferredPassword]);

	const onSubmit: SubmitHandler<SignUpType> = async (data: SignUpType) => {
		const { data: responseData, error } = await callApi<ApiResponse>(
			"/auth/signup",
			{
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				password: data.password,
				confirmPassword: data.confirmPassword,
				isTermAndConditionAccepted: data.terms,
			}
		);

		if (error) {
			const castedError = error as ApiResponse;
			setMessage(castedError);
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth",
			});

			toast({
				title: castedError.status,
				description: castedError.message,
				duration: 2000,
			});
			return;
		} else {
			toast({
				title: "Success",
				description: responseData?.message,
				duration: 2000,
			});
			reset();
			setTimeout(() => {
				void router.push({
					pathname: "/signup/verification",
					query: { signup: true, email: data.email.toLowerCase() },
				});
			}, 1500);
		}
	};
	// if (user !== null) {
	//   // // setTimeout(() => {}, 1000);
	//   void router.back();
	//   return (
	//     <LoadingComp message={`You are already signed in. Redirecting back`} />
	//   );
	// }

	return (
		<AuthLayout
			formType="signup"
			heading="Welcome!"
			greeting="Create your account"
			contentClass="md:w-[85%] lg:w-[65%] xl:w-[52%] 2xl:w-[45%] 3xl:w-[29%]"
			withHeader
			hasSuccess={false}
		>
			<form
				onSubmit={(event) => {
					event.preventDefault();

					if (botStatus !== "success") {
						toast({
							title: "Error",
							description: "Please complete the bot verification",
							duration: 3000,
						});
						return;
					}

					void handleSubmit(onSubmit)(event);
				}}
				action=""
				className="flex flex-col gap-3"
			>
				{message.message !== "" && !message.error ? (
					<p
						className={`rounded-md bg-abeg-error-40 p-4 text-sm font-medium text-abeg-error-20`}
					>
						{message.message}
					</p>
				) : (
					message.error &&
					typeof message.error === "object" && (
						<ul className="list-inside list-disc space-y-1 rounded-md bg-abeg-error-40 p-4 text-xs font-medium text-abeg-error-20">
							{Object.keys(message.error).length > 0 &&
								Object.keys(message.error).map((key) => (
									<li key={key} className={``}>
										{(message.error as { [key: string]: string[] })[key]}
									</li>
								))}
						</ul>
					)
				)}
				<div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
					<div className="space-y-1">
						<label htmlFor="firstName" className="text-sm font-medium">
							First Name
						</label>
						<Input
							autoFocus
							{...register("firstName")}
							type="text"
							id="firstName"
							placeholder="Enter your first name"
							className={`min-h-[45px]`}
							errorField={errors.firstName}
						/>
						{errors.firstName && (
							<p className="mt-2 text-sm text-abeg-teal">
								{errors.firstName.message}
							</p>
						)}
					</div>
					<div className="space-y-1">
						<label htmlFor="lastName" className="text-sm font-medium">
							Last Name
						</label>
						<Input
							{...register("lastName")}
							type="text"
							id="lastName"
							placeholder="Enter your last name"
							className={`min-h-[45px]`}
							errorField={errors.lastName}
						/>
						{errors.lastName && (
							<p className="mt-2 text-sm text-abeg-teal">
								{errors.lastName.message}
							</p>
						)}
					</div>
				</div>

				<div className="space-y-1">
					<label htmlFor="email" className="text-sm font-medium">
						Email
					</label>
					<Input
						type="email"
						id="email"
						placeholder="Enter your valid email"
						className={`min-h-[45px]`}
						{...register("email")}
						errorField={errors.email}
					/>
					{errors.email && (
						<p className="mt-2 text-sm text-abeg-teal">
							{errors.email.message}
						</p>
					)}
				</div>

				<div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
					<div className="space-y-1">
						<label htmlFor="password" className="mb-1 text-sm font-medium">
							Password
						</label>
						<Input
							type="password"
							{...register("password")}
							id="password"
							placeholder="Create a secure password"
							className={`min-h-[45px]`}
							errorField={errors.password}
						/>
						{password.length > 0 && (
							<div>
								<ProgressBar
									value={result * 25}
									className={`${
										result < 2
											? "progress-filled:bg-red-500"
											: result === 2
											  ? "progress-filled:bg-yellow-500"
											  : "progress-filled:bg-green-500"
									}`}
								/>
								<p
									className={`${
										result < 2
											? "text-text-red"
											: result === 2
											  ? "text-yellow-500"
											  : "text-green-500"
									} text-sm`}
								>
									<span className="text-black">Password strength:</span>
									&nbsp;
									{result < 2 ? "Weak" : result === 2 ? "Medium" : "Strong"}
								</p>
							</div>
						)}
						{errors.password && (
							<p className="mt-2 text-sm text-abeg-teal">
								{errors.password.message}
							</p>
						)}
					</div>
					<div className="space-y-1">
						<label
							htmlFor="confirmPassword"
							className="mb-1 text-sm font-medium"
						>
							Confirm Password
						</label>
						<Input
							type="password"
							{...register("confirmPassword")}
							id="confirmPassword"
							placeholder="Confirm your password"
							className={`min-h-[45px]`}
							errorField={errors.confirmPassword}
						/>
						{errors.confirmPassword && (
							<p className="text-sm text-abeg-teal">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>
				</div>
				<div className="mt-2 flex flex-col">
					<div className="flex w-full gap-2">
						<Input
							type="checkbox"
							id="terms"
							className="mt-1 h-[1.125rem] w-4 accent-abeg-teal md:w-5"
							{...register("terms")}
						/>
						<label htmlFor="terms" className="text-sm md:text-base">
							I agree to AbegHelp.me&apos;s{" "}
							<Link href="" className="text-abeg-teal">
								terms of service
							</Link>{" "}
							and{" "}
							<Link href="" className="text-abeg-teal">
								privacy notice
							</Link>
							.
						</label>
					</div>
					{errors.terms && (
						<p className="mt-2 text-sm text-abeg-teal">
							{errors.terms.message}
						</p>
					)}
				</div>
				<CloudFlareTurnStile
					onStatusChange={handleBotStatus}
					ref={cfTurnStile}
				/>
				<div className="flex flex-col items-center space-y-5">
					<Button
						disabled={isSubmitting}
						className="mt-6 bg-abeg-teal py-4 text-white md:w-[60%] lg:w-[55%] xl:w-[52%]"
						fullWidth
						loading={isSubmitting}
					>
						Sign up
					</Button>
					<p className="text-center text-sm">
						Already have an account?&nbsp;
						<Link href="/signin" className="font-medium text-abeg-teal">
							Login
						</Link>
					</p>
				</div>
			</form>
		</AuthLayout>
	);
};

export default SignUp;

SignUp.protect = true;
