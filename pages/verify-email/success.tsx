import { Success } from "@/components/common";
import { AuthLayout } from "@/layouts";
import Link from "next/link";

const VerifyEmailSuccessPage = () => {
	return (
		<AuthLayout
			title="Email Verification Successful!"
			content="Your email was verified successfully! "
			withHeader={false}
			hasSuccess
			contentClass=""
			formType="signup"
		>
			{" "}
			<Success textContent="Your email has been verified">
				<Link
					href="/signin"
					className="mt-6 block w-full rounded-md bg-formBtn p-3 text-center text-sm font-semibold text-white md:rounded-lg md:text-base"
				>
					Back to sign in
				</Link>
			</Success>
		</AuthLayout>
	);
};

export default VerifyEmailSuccessPage;

VerifyEmailSuccessPage.protect = true;
