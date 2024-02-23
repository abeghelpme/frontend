import { CloudFlareTurnStile, FormErrorMessage } from "@/components/common";
import { Button, Input, useToast } from "@/components/ui";
import { AuthPagesLayout } from "@/layouts";
import { type ForgotPasswordType, callApi, zodValidator } from "@/lib";
import { useCloudflareTurnstile } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const ForgotPasswordPage = () => {
	const router = useRouter();
	const { toast } = useToast();
	const { cfTurnStile, checkBotStatus, handleBotStatus } =
		useCloudflareTurnstile();

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordType>({
		resolver: zodResolver(zodValidator("forgotPassword")!),
		mode: "onChange",
		reValidateMode: "onChange",
	});

	const onSubmit = async (data: ForgotPasswordType) => {
		const { data: responseData, error } = await callApi(
			"/auth/password/forgot",
			{
				email: data.email,
			}
		);

		if (error) {
			return toast({
				title: error.status.toString(),
				description: error.message,
				duration: 3000,
			});
		} else {
			toast({
				title: "Success",
				description: (responseData as { message: string }).message,
				duration: 3000,
			});
			reset();
			setTimeout(() => {
				void router.push("/signin");
			}, 2000);
		}
	};

	return (
		<AuthPagesLayout
			heading="Forgot Password"
			greeting="Reset your password. Follow the instructions on this page to get your account back!"
			title="Forgot Password"
			content="Reset your password. Follow the instructions on this page to get your account back!"
			withHeader
			hasSuccess={false}
		>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					const response = checkBotStatus();

					response && void handleSubmit(onSubmit)(event);
				}}
				className="flex flex-col gap-4 md:gap-6"
			>
				<div className="mt-2">
					<div className="space-y-1">
						<label htmlFor="email" className="text-sm font-medium md:text-lg">
							Email Address
						</label>
						<Input
							{...register("email")}
							autoFocus
							type="email"
							id="email"
							placeholder="Enter your email address"
							className={`min-h-[45px] ${
								errors.email &&
								"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
							}`}
						/>
						<FormErrorMessage
							error={errors}
							errorMsg={errors.email?.message!}
						/>
					</div>
				</div>
				<CloudFlareTurnStile
					ref={cfTurnStile}
					onStatusChange={handleBotStatus}
				/>
				<div className="flex flex-col gap-4 text-center">
					<Button
						disabled={isSubmitting}
						loading={isSubmitting}
						className="md:text-lg"
						variant="primary"
					>
						Submit
					</Button>
					<Link
						href="/signin"
						className="text-sm text-abeg-primary underline font-semibold md:text-base"
					>
						Back to sign in page
					</Link>
				</div>
			</form>
		</AuthPagesLayout>
	);
};

export default ForgotPasswordPage;
