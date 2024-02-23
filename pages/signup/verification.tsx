import { useToast } from "@/components/ui/use-toast";
import { AuthPagesLayout } from "@/layouts";
import { callApi } from "@/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VerificationPage = () => {
	const router = useRouter();
	const { toast } = useToast();
	const [queryParams, setQueryParams] = useState<null | Record<string, string>>(
		null
	);
	useEffect(() => {
		if (router) {
			setQueryParams(router.query as Record<string, string>);
		}
	}, [router]);

	const handleResendEmail = async () => {
		if (!queryParams?.endpoint || !queryParams?.email) {
			return toast({
				title: "Request Failed",
				description: "An error occurred! Please try again",
			});
		}

		const { data, error } = await callApi(`/auth/${queryParams.endpoint}`, {
			email: queryParams.email,
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
			heading={queryParams?.title}
			greeting={`Please click the ${queryParams?.type} link sent to your email to proceed`}
			content={queryParams?.title || "Verification"}
			contentClass="md:w-[55%] max-w-wAuthFlow"
			withHeader
			hasSuccess={false}
		>
			<div className="text-center">
				<p className="mb-4"></p>
				<div className="!mt-2 flex flex-col gap-2">
					<p className="text-center text-sm">
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
