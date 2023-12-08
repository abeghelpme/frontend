import ProgressBar from "@/components/primitives/ProgressBar/progress-bar";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import type { ComponentType, ReactNode } from "react";
import React, { useState, useEffect } from "react";
interface ComponentWithPageLayout extends AppProps {
  Component: AppProps["Component"] & {
    PageLayout?: ComponentType<{ children: ReactNode }>;
  };
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 10 : 100,
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);
  const isLoaded = loadingProgress === 100;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {isLoaded ? (
          <>
            {Component.PageLayout ? (
              <Component.PageLayout>
                <Component {...pageProps} />
              </Component.PageLayout>
            ) : (
              <Component {...pageProps} />
            )}
            <ReactQueryDevtools initialIsOpen={false} />
          </>
        ) : (
          <ProgressBar
            value={loadingProgress}
            className="progress-unfilled:h-1"
          />
        )}
      </QueryClientProvider>
    </>
  );
}
