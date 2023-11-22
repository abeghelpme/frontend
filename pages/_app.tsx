import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { ComponentType, ReactNode } from "react";

interface ComponentWithPageLayout extends AppProps {
  Component: AppProps["Component"] & {
    PageLayout?: ComponentType<{ children: ReactNode }>;
  };
}

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <>
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
