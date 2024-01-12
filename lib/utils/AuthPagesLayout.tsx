import type { ReactElement } from "react";

export const layoutForAuthPages = function getLayout(page: ReactElement) {
  return (
    <main className="h-full bg-contours bg-cover bg-no-repeat">{page}</main>
  );
};
