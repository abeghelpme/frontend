import { useToast } from "@/components/ui/use-toast";
import { AuthPagesLayout } from "@/layouts";
import { callApi } from "@/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VerificationPage = () => {
	const router = useRouter();
	const { toast } = useToast();
	const [queryParam, setQueryParam] = useState("");
	useEffect(() => {
		setQueryParam(router.query.email as string);
		console.log(queryParam, router);
	}, [router]);

	const handleResendEmail = async () => {
		if (!queryParam)
			return toast({
				title: "Request Failed",
				description: "No email provided",
			});
		const { data, error } = await callApi("/auth/resend-verification", {
			email: queryParam,
		});

		if (error) {
			return toast({
				title: error.status as string,
				description: error.message,
				duration: 3000,
			});
		} else {
			toast({
				title: "Success",
				description: (data as { message: string }).message,
				duration: 3000,
			});
		}
	};

	return (
		<AuthPagesLayout
			title="Verify your email"
			content="Verify your account to complete your registration process, check your email to complete this process!"
			contentClass="md:w-[55%] max-w-wAuthFlow"
			withHeader={false}
			hasSuccess={false}
		>
			<div className="text-center">
				<div className="mb-4 space-y-4">
					<h1 className="text-xl font-semibold text-abeg-neutral-10 md:text-2xl">
						Email Verification
					</h1>
					<p className="">
						Please check your email for the verification link sent to you. Click
						the link to verify your email
					</p>
				</div>
				<div className="!mt-2 flex flex-col gap-2">
					<p className="text-center text-sm md:text-base">
						Didn&apos;t get the email?{" "}
						<span
							onClick={() => void handleResendEmail()}
							className="text-abeg-primary cursor-pointer underline"
						>
							Resend
						</span>
					</p>
					<Link
						href="/signin"
						className="bg-abeg-primary py-4 text-white rounded-md mt-2"
					>
						Back to Sign in{" "}
					</Link>
				</div>
			</div>
		</AuthPagesLayout>
	);
};

export default VerificationPage;

VerificationPage.protect = true;
