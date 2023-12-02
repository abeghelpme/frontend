import BaseLayout from "@/layouts/base-layout";
import type { WithPageLayout } from "@/interfaces/with-page-layout";

const Home: WithPageLayout = () => {
  return (
    <div>
      <h1>WELCOME TO ABEG HELP!!</h1>
    </div>
  );
};

Home.PageLayout = BaseLayout;

export default Home;
