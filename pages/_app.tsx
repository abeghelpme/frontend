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
