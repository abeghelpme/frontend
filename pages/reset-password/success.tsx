import { Success } from "@/components/Shared";
import { AuthLayout } from "@/layouts";
import Link from "next/link";

const ResetPasswordSuccessPage = () => {
	return (
		<AuthLayout withHeader={false} hasSuccess contentClass="" formType="other">
			<Success textContent="Password Reset Successful">
				<Link
					href="/signin"
					className="mt-6 block w-full rounded-md bg-formBtn p-3 text-center text-sm font-semibold text-white md:rounded-lg md:text-base"
				>
					Sign in to continue
				</Link>
			</Success>
		</AuthLayout>
	);
};

export default ResetPasswordSuccessPage;
