import { Auth } from "@/components/Protect";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Manrope } from "next/font/google";
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
