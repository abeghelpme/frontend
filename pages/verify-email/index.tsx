import { Button } from "@/components/index";
import { useToast } from "@/components/ui/use-toast";
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
				duration: 1200,
			});
		} else {
			setLoading(false);
			toast({
				title: "Success",
				description: (data as { message: string }).message,
				duration: 1200,
			});
			void router.push("/verify-email/success");
		}
	};

	return (
		<AuthLayout
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
						className="!mt-6 bg-formBtn py-3"
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
