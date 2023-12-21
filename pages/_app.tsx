import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import type { ComponentType, ReactNode } from "react";

interface ComponentWithPageLayout extends AppProps {
  Component: AppProps["Component"] & {
    PageLayout?: ComponentType<{ children: ReactNode }>;
  };
}

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <>
      <NextNProgress color="#324823" />
      <>
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
            <Toaster />
          </Component.PageLayout>
        ) : (
          <>
            {" "}
            <Component {...pageProps} />
            <Toaster />
          </>
        )}
      </>
    </>
  );
}
