import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import type { ComponentType, ReactNode } from "react";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
interface ComponentWithPageLayout extends AppProps {
  Component: AppProps["Component"] & {
    PageLayout?: ComponentType<{ children: ReactNode }>;
  };
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProgressBar
          height="3px"
          color="green"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
