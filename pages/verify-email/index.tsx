import { Button, useToast } from "@/components/ui";
import { AuthLayout } from "@/layouts";
import { callApi } from "@/lib";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VerificationPage = () => {
	const router = useRouter();
	const { toast } = useToast();
	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setToken(router.query.token as string);
	}, [router]);

	const verifyEmail = async () => {
		setLoading(true);
		if (!token) {
			setLoading(false);
			return toast({
				title: "Request Failed",
				description: "No data provided",
				duration: 3000,
			});
		}
		const { data, error } = await callApi("/auth/verify-email", {
			token,
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
				duration: 3000,
			});
			setTimeout(() => {
				void router.push("/verify-email/success");
			}, 1000);
		}
	};

	return (
		<AuthLayout
			title="Verify your email"
			content="Verify your account to complete your registration process, check your email to complete this process!"
			withHeader={false}
			hasSuccess={false}
			formType="signup"
			contentClass="md:max-w-[400px]  lg:w-[50%] xl:w-[35%] 2xl:w-[30%]"
		>
			{" "}
			<div className="space-y-2 text-center">
				<h1 className="text-xl font-medium">Verify your email</h1>
				<div className="">
					<p className="">
						Please click on the button below to verify your email.
					</p>
					<Button
						className="bg-abeg-primary !mt-6 py-3"
						onClick={() => void verifyEmail()}
						fullWidth
						loading={loading}
					>
						Verify
					</Button>
				</div>
			</div>
		</AuthLayout>
	);
};
export default VerificationPage;

VerificationPage.protect = true;
