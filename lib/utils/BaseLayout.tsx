import BaseLayout from "@/layouts/base-layout";
import type { ReactElement } from "react";

export default function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
}
