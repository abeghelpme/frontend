import type { WithPageLayout } from "@/interfaces/with-page-layout";
import BaseLayout from "@/layouts/base-layout";
import Link from "next/link";

const Home: WithPageLayout = () => {
  return (
    <BaseLayout>
      <Link href="/test"> Go to test </Link>
      <h1>WELCOME TO ABEG HELP!!</h1>
    </BaseLayout>
  );
};

export default Home;
