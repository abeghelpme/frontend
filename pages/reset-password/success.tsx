import { Success } from "@/components/common";
import { AuthPagesLayout } from "@/layouts";
import Link from "next/link";

const ResetPasswordSuccessPage = () => {
	return (
		<AuthPagesLayout
			title="Success"
			content="You have successfully Reset Password!"
			withHeader={false}
			hasSuccess
		>
			<Success description="Password Reset Successful">
				<Link
					href="/signin"
					className="mt-6 block w-full rounded-md bg-abeg-primary p-3 text-center text-sm font-semibold text-white md:rounded-lg md:text-base"
				>
					Sign in to continue
				</Link>
			</Success>
		</AuthPagesLayout>
	);
};

export default ResetPasswordSuccessPage;
ResetPasswordSuccessPage.protect = true;
