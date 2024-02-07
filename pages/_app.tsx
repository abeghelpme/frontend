import { Loader } from "@/components/index";
import { Toaster } from "@/components/ui/toaster";
import type { User } from "@/interfaces";
import { useSession } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Manrope } from "next/font/google";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import type { ReactElement, ReactNode } from "react";
import { useEffect } from "react";

const manrope = Manrope({ subsets: ["latin"] });
interface ComponentWithPageLayout extends AppProps {
	Component: AppProps["Component"] & {
		protect?: boolean;
		getLayout?: (page: ReactElement) => ReactNode;
	};
}

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
	const { getSession } = useSession((state) => state);
	const getLayout = Component.getLayout || ((page) => page);
	useEffect(() => {
		void (async () => {
			await getSession(true);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<style jsx global>{`
        html {
          font-family: ${manrope.style.fontFamily};
          color: #484848;
        }
      `}</style>
			<NextNProgress color="#324823" />
			{Component.protect === true ? (
				<Auth>{getLayout(<Component {...pageProps} />)}</Auth>
			) : (
				getLayout(<Component {...pageProps} />)
			)}
			<Toaster />
		</>
	);
}

const Auth = ({ children }: { children: ReactNode }) => {
	const { user, loading } = useSession((state) => state);
	const castedUser = user as User;
	const router = useRouter();
	if (loading) return <Loader message="Validating authorization status..." />;
	// Users who are signed in shouldn't be able to access these routes
	const forbiddenFromAuthUsers = [
		"/signin",
		"/signup",
		"/signin/authenticate",
		"/signup/verification",
		"/verify-email",
		"/verify-email/success",
	];
	switch (true) {
		// If user is not signed in, and they try to go to any page we protect, redirect to login
		case castedUser === null &&
			!forbiddenFromAuthUsers.includes(router.pathname):
			console.log("check 1");
			void router.push("/signin");
			return <Loader message="You are not signed in. Redirecting to Login" />;
		// If user is signed in but yet to verify email, redirect to verify email
		case castedUser && !castedUser.isEmailVerified:
			console.log("check 2");
			void router.push("/verify-email");
			return (
				<Loader message="Email not verified. Proceed to verify your email" />
			);
		// If user is signed in but yet to verify 2fa, redirect to verify 2fa
		case castedUser && !castedUser.twoFA.isVerified:
			console.log("check 4");
			setTimeout(() => {
				void router.push("/signin/authenticate");
			}, 1000);
			return <Loader message="2FA not verified. Proceed to verify your 2FA" />;
		// If user is signed in and verified, redirect to home
		case castedUser && forbiddenFromAuthUsers.includes(router.pathname):
			console.log("check 5");
			setTimeout(() => {
				void router.push("/");
			}, 1000);
			return <Loader message={`You are already signed in. Redirecting back`} />;
		default:
			break;
	}
	return children;
};
