import type { WithPageLayout } from "@/interfaces/with-page-layout";
import BaseLayout from "@/layouts/base-layout";

const Home: WithPageLayout = () => {
  return (
    <BaseLayout>
      <h1>WELCOME TO ABEG HELP!!</h1>
    </BaseLayout>
  );
};

export default Home;
