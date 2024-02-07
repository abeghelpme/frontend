import type { User } from "@/interfaces";
import { useSession } from "@/store";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import Loader from "./shared/Loader";

export const Auth = ({ children }: { children: ReactNode }) => {
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
	];

	const isInaccessible = noAuthRoutes.includes(router.pathname);

	const redirect = (route: string) => {
		setTimeout(() => {
			void router.push(route);
		}, 1000);
	};

	if (isInaccessible && user) {
		redirect("/");
		return <Loader message="You are already signed in" />;
	}

	if (!isInaccessible && !user) {
		redirect("/signin");
		return <Loader message="You are not signed in" />;
	}

	if (user && (user as User).twoFA?.active) {
		if (
			!(user as User).twoFA?.isVerified &&
			router.pathname !== "/signin/authenticate"
		) {
			redirect("/signin/authenticate");
			return <Loader message="You need to verify your account" />;
		}

		if (
			router.pathname.includes("/2fa") ||
			(router.pathname.includes("/signin") && (user as User).twoFA?.isVerified)
		) {
			redirect("/");
			return <Loader message="2FA is already active!" />;
		}
	}

	return children;
};
