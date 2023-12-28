import LoadingComp from "@/components/Shared/Loading";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "@/store/useSession";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Manrope } from "next/font/google";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import type { ReactNode } from "react";
import { useEffect } from "react";

const manrope = Manrope({ subsets: ["latin"] });

interface ComponentWithPageLayout extends AppProps {
  Component: AppProps["Component"] & {
    protect?: boolean;
  };
}

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  const { getSession } = useSession((state) => state);

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
        }
      `}</style>
      <NextNProgress color="#324823" />
      {Component.protect === true ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
      <Toaster />
    </>
  );
}

const Auth = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useSession((state) => state);
  const router = useRouter();
  if (loading) return <LoadingComp message="Loading..." />;

  if (user === null) {
    void router.push("/signin");
    return (
      <LoadingComp message="You are not signed in. Redirecting to Login" />
    );
  }
  return children;
};
