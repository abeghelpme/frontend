import type { User } from "@/interfaces";
import { useSession } from "@/store";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { Loader } from "./common";

const Auth = ({ children }: { children: ReactNode }) => {
	const { user, loading } = useSession((state) => state);

	const router = useRouter();

	if (loading || !router.pathname)
		return <Loader message="Validating auth status..." />;

	//  inaccessible routes when user is authenticated
	const noAuthRoutes = [
		"/signin",
		"/signup",
		"/signup/verification",
		"/verify-email",
		"/verify-email/success",
		// "/reset-password",
		"/forgot-password",
	];

	const isInaccessible = noAuthRoutes.includes(router.pathname);

	const redirect = (route: string) => {
		setTimeout(() => {
			void router.push(route);
		}, 1000);
	};

	if (!isInaccessible && !user) {
		void router.push("/signin");
		return <Loader message="You are not signed in" />;
	}

	if (user && (user as User).twoFA?.active) {
		if (
			!(user as User).twoFA?.isVerified &&
			router.pathname !== "/2fa/authenticate"
		) {
			redirect("/2fa/authenticate");
			return <Loader message="You need to verify your account" />;
		}

		if (
			router.pathname.includes("/2fa") &&
			(user as User).twoFA?.isVerified === true
		) {
			redirect("/");
			return <Loader message="2FA is already active or verified!" />;
		}
	}

	if (isInaccessible && user) {
		const { redirect } = router.query;
		if (typeof redirect === "undefined" || redirect === "true") {
			void router.push("/");
			return <Loader message="You are already signed in" />;
		}
	}

	return children;
};

export default Auth;
