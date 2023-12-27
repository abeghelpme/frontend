import { Toaster } from "@/components/ui/toaster";
import { useSession } from "@/store/useSession";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Manrope } from "next/font/google";
import NextNProgress from "nextjs-progressbar";
import type { ReactNode } from "react";
import { useEffect } from "react";
import Login from "./signin";

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
    <main className={`${manrope.className}`}>
      <NextNProgress color="#324823" />
      {Component.protect === true ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
      <Toaster />
    </main>
  );
}

const Auth = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useSession((state) => state);

  if (loading) return <div>Loading...</div>;
  if (user === null) return <Login />; // If not authenticated, redirect log in
  return children;
};
