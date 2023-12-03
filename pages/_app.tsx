import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import "../styles/nprogress.css";
import Router from "next/router";
import nProgress from "nprogress";

const queryClient = new QueryClient();

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeError", () => nProgress.done());
Router.events.on("routeChangeComplete", () => nProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
