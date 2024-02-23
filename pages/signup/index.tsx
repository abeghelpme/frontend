import { CloudFlareTurnStile, FormErrorMessage } from "@/components/common";
import { Button, Input } from "@/components/ui";
import type { ApiResponse } from "@/interfaces";
import { AuthPagesLayout } from "@/layouts";
import {
	type SignUpType,
	callApi,
	checkPasswordStrength,
	zodValidator,
} from "@/lib";
import { useCloudflareTurnstile } from "@/lib/hooks";
import useWatchInput from "@/lib/hooks/useWatchInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDeferredValue, useEffect, useRef, useState } from "react";
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
	const passwordRef = useRef<HTMLInputElement | null>(null!);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isSubmitting },
	} = useForm<SignUpType>({
		resolver: zodResolver(zodValidator("signup")!),
		mode: "onChange",
		reValidateMode: "onChange",
	});
	const password = useWatchInput({ control, inputType: "password" });
	const [result, setResult] = useState<number>(0);
	const deferredPassword = useDeferredValue(password);
	const genStrength = async () => {
		const passwordStrength = await checkPasswordStrength(
			deferredPassword as string
		);
		setResult(passwordStrength);
	};
	useEffect(() => {
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
		<AuthPagesLayout
			title="Create an Account!"
			content="Create an Abeg Help account to start crowdfunding!"
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
				className="flex flex-col gap-2 sm:gap-4 lg:gap-6"
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
				<div className="space-y-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:gap-6">
					<div className="space-y-1">
						<label htmlFor="firstName" className="lg:text-lg font-medium">
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
						<FormErrorMessage
							errorMsg={errors.firstName?.message!}
							error={errors.firstName!}
						/>
					</div>
					<div className="space-y-1">
						<label htmlFor="lastName" className="lg:text-lg font-medium">
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
						<FormErrorMessage
							errorMsg={errors.lastName?.message!}
							error={errors.lastName!}
						/>
					</div>
				</div>

				<div className="space-y-1">
					<label htmlFor="email" className="lg:text-lg font-medium">
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
					<FormErrorMessage
						errorMsg={errors.email?.message!}
						error={errors.email!}
					/>
				</div>

				<div className="space-y-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:gap-6">
					<div className="space-y-1">
						<label htmlFor="password" className="mb-1 lg:text-lg font-medium">
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
						{(password as string).length > 0 && (
							<FormErrorMessage isForPasswordStrength result={result} />
						)}
						<FormErrorMessage
							errorMsg={errors.password?.message!}
							error={errors.password!}
						/>
					</div>
					<div className="space-y-1">
						<label
							htmlFor="confirmPassword"
							className="mb-1 lg:text-lg font-medium"
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
						<FormErrorMessage
							errorMsg={errors.confirmPassword?.message!}
							error={errors.confirmPassword!}
						/>
					</div>
				</div>
				<div className="flex flex-col justify-center">
					<div className="flex w-full gap-2">
						<Input
							type="checkbox"
							id="terms"
							className="md:h-6 md:w-6 bg-transparent rounded-lg"
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
					<FormErrorMessage
						errorMsg={errors.terms?.message!}
						error={errors.terms!}
					/>
				</div>
				<CloudFlareTurnStile
					onStatusChange={handleBotStatus}
					ref={cfTurnStile}
				/>
				<div className="flex flex-col items-center space-y-6 text-sm md:text-base">
					<Button
						disabled={isSubmitting}
						className=""
						variant="primary"
						fullWidth
						loading={isSubmitting}
					>
						Sign up
					</Button>
					<p className="text-center text-sm md:text-base">
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
		</AuthPagesLayout>
	);
};

export default SignUp;

SignUp.protect = true;
