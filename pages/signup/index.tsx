import { setTimeout } from "timers";
import { CloudFlareTurnStile } from "@/components/common";
import { Button, Input, ProgressBar } from "@/components/ui";
import type { ApiResponse } from "@/interfaces";
import { AuthLayout } from "@/layouts";
import {
	type SignUpType,
	callApi,
	checkPasswordStrength,
	zodValidator,
} from "@/lib";
import { useCloudflareTurnstile } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDeferredValue, useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

let redirectTimeOut: NodeJS.Timeout;
const SignUp = () => {
	const { cfTurnStile, checkBotStatus, handleBotStatus } =
		useCloudflareTurnstile();
	const [message, setMessage] = useState<ApiResponse>({
		status: "",
		message: "",
		error: undefined,
		data: undefined,
	});

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

		return () => redirectTimeOut && clearTimeout(redirectTimeOut);
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
			// window.scrollTo({
			// 	top: 0,
			// 	left: 0,
			// 	behavior: 'smooth'
			// });

			toast(castedError.status, {
				description: castedError.message,
				duration: 2000,
			});
			return;
		} else {
			toast("Success", {
				description: responseData?.message,
				duration: 2000,
			});
			reset();
			redirectTimeOut = setTimeout(() => {
				void router.push({
					pathname: "/signup/verification",
					query: { signup: true, email: data.email.toLowerCase() },
				});
			}, 1500);
		}
	};

	return (
		<AuthLayout
			title="Create an Account!"
			content="Create an Abeg Help account to start your crowdfunding!"
			formType="signup"
			heading="Welcome!"
			greeting="Create your account"
			contentClass="md:w-[85%] md:max-w-wSignUpForm"
			withHeader
			hasSuccess={false}
		>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					const response = checkBotStatus();
					response && void handleSubmit(onSubmit)(event);
				}}
				action=""
				className="flex flex-col gap-4"
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
				<div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 lg:gap-6 sm:space-y-0">
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
							<p className="mt-2 text-sm text-abeg-primary">
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
							<p className="mt-2 text-sm text-abeg-primary">
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
						<p className="mt-2 text-sm text-abeg-primary">
							{errors.email.message}
						</p>
					)}
				</div>

				<div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 lg:gap-6 sm:space-y-0">
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
							<p className="mt-2 text-sm text-abeg-primary">
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
							<p className="text-sm text-abeg-primary">
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
							className="mt-1 h-[1.125rem] w-4 accent-abeg-primary md:w-5"
							{...register("terms")}
						/>
						<label htmlFor="terms" className="text-sm md:text-base">
							I agree to AbegHelp.me&apos;s{" "}
							<Link href="" className="text-abeg-primary">
								terms of service
							</Link>{" "}
							and{" "}
							<Link href="" className="text-abeg-primary">
								privacy notice
							</Link>
							.
						</label>
					</div>
					{errors.terms && (
						<p className="mt-2 text-sm text-abeg-primary">
							{errors.terms.message}
						</p>
					)}
				</div>
				<CloudFlareTurnStile
					onStatusChange={handleBotStatus}
					ref={cfTurnStile}
				/>
				<div className="flex flex-col items-center space-y-4 lg:space-y-6">
					<Button
						disabled={isSubmitting}
						className="mt-2"
						variant="primary"
						fullWidth
						loading={isSubmitting}
					>
						Sign up
					</Button>
					<p className="text-center text-sm">
						Already have an account?&nbsp;
						<Link
							href="/signin"
							className="font-medium text-abeg-primary underline"
						>
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
