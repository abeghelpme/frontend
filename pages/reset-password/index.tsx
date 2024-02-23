import { CloudFlareTurnStile } from "@/components/common";
import FormErrorMessage from "@/components/common/FormErrorMessage";
import { Button, Input, useToast } from "@/components/ui";
import { AuthPagesLayout } from "@/layouts";
import {
	type ResetPasswordType,
	callApi,
	checkPasswordStrength,
	zodValidator,
} from "@/lib";
import { useCloudflareTurnstile } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useDeferredValue, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
	const router = useRouter();
	const { toast } = useToast();
	const { cfTurnStile, checkBotStatus, handleBotStatus } =
		useCloudflareTurnstile();

	const [token, setToken] = useState("");
	useEffect(() => {
		setToken(router.query.token as string);
	}, [router]);
	const {
		handleSubmit,
		control,
		register,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<ResetPasswordType>({
		resolver: zodResolver(zodValidator("resetPassword")!),
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

	const onSubmit = async (data: ResetPasswordType) => {
		if (!token)
			return toast({
				title: "Request Failed",
				description: "Incomplete data provided",
				duration: 3000,
			});
		const { data: responseData, error } = await callApi(
			"/auth/password/reset",
			{
				token,
				password: data.password,
				confirmPassword: data.confirmPassword,
			}
		);

		if (error) {
			return toast({
				title: error.status as string,
				description: error.message,
				duration: 3000,
			});
		} else {
			toast({
				title: "Success",
				description: (responseData as { message: string }).message,
				duration: 3000,
			});
			setTimeout(() => {
				void router.push("/reset-password/success");
			}, 2000);
		}
	};

	return (
		<AuthPagesLayout
			title="Reset Password"
			heading="Reset Password"
			content="Reset your Password! Follow the instructions on this page to reset your password!"
			withHeader
			hasSuccess={false}
		>
			<form
				onSubmit={(event) => {
					event.preventDefault();

					const response = checkBotStatus();
					response && void handleSubmit(onSubmit)(event);
				}}
				className="flex flex-col"
			>
				<div className="space-y-6">
					<div className="space-y-4">
						<div className="space-y-1">
							<label htmlFor="password" className="font-medium">
								Password
							</label>
							<div className="relative">
								<Input
									{...register("password")}
									className={`min-h-[45px] ${
										errors.password &&
										"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
									}`}
									placeholder="Create a new password"
									type="password"
								/>
							</div>
							{password.length > 0 && (
								<FormErrorMessage isForPasswordStrength result={result} />
							)}
							<FormErrorMessage
								error={errors}
								errorMsg={errors.password?.message!}
							/>
						</div>

						<div className="space-y-1">
							<label htmlFor="confirmPassword" className="font-medium">
								Confirm password
							</label>
							<div className="relative">
								<Input
									{...register("confirmPassword")}
									className={`min-h-[45px] ${
										errors.confirmPassword &&
										"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
									}`}
									placeholder="Re-enter password"
									type="password"
								/>
							</div>
							<FormErrorMessage
								error={errors}
								errorMsg={errors.confirmPassword?.message!}
							/>
						</div>
					</div>
				</div>
				<CloudFlareTurnStile
					ref={cfTurnStile}
					onStatusChange={handleBotStatus}
				/>
				<Button
					disabled={isSubmitting}
					loading={isSubmitting}
					className="text-md mt-6 bg-abeg-button-10 px-10 py-3 font-medium"
				>
					Submit
				</Button>
			</form>
		</AuthPagesLayout>
	);
};
export default ResetPassword;
