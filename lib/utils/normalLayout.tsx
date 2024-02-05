import type { ReactElement } from "react";

export const signupLayout = function getLayout(page: ReactElement) {
  return <main className="min-h-full">{page}</main>;
};
