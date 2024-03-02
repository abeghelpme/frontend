import { Success } from "@/components/common";
import { AuthPagesLayout } from "@/layouts";
import Link from "next/link";

const VerifyEmailSuccessPage = () => {
	return (
		<AuthPagesLayout
			title="Email Verification Successful!"
			content="Your email was verified successfully! "
			withHeader={false}
			hasSuccess
		>
			<Success description="Your email has been verified">
				<Link
					href="/signin"
					className="mt-6 block w-full rounded-md bg-abeg-primary p-3 text-center text-sm font-semibold text-white md:rounded-lg md:text-base"
				>
					Back to sign in
				</Link>
			</Success>
		</AuthPagesLayout>
	);
};

export default VerifyEmailSuccessPage;

VerifyEmailSuccessPage.protect = true;
