import type { NextPage } from "next";
import type { ReactNode } from "react";

export type WithPageLayout<Q = object> = NextPage<Q> & {
  PageLayout?: React.ComponentType<{ children: ReactNode }>;
};
