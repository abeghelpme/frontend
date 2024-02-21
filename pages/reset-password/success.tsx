import { Success } from "@/components/common";
import { AuthLayout } from "@/layouts";
import Link from "next/link";

const ResetPasswordSuccessPage = () => {
	return (
		<AuthLayout
			title="Success"
			content="You have successfully Reset Password!"
			withHeader={false}
			hasSuccess
		>
			<Success textContent="Password Reset Successful">
				<Link
					href="/signin"
					className="bg-abeg-primary mt-6 block w-full rounded-md p-3 text-center text-sm font-semibold text-white md:rounded-lg md:text-base"
				>
					Sign in to continue
				</Link>
			</Success>
		</AuthLayout>
	);
};

export default ResetPasswordSuccessPage;
